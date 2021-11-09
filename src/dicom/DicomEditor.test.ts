import { FileWithPath } from "file-selector";
import DicomEditor, { ProcessStages, Progress } from "./DicomEditor";
import * as fs from 'fs'
import { foreachSeries, numberOfFiles } from "../common/utils";
import  { PathCT0, PathCT1, PathMR } from "../common/testUtils";
import JSZip from "jszip";

const dcmjs = require("dcmjs");
const {  DicomMessage } = dcmjs.data;

const CT0 : FileWithPath = {
    lastModified: 0,
    name: PathCT0,
    size: 0,
    type: 'file',
    arrayBuffer: function (): Promise<ArrayBuffer> {
        throw new Error("Function not implemented.");
    },
    slice: function (start?: number, end?: number, contentType?: string): Blob {
        throw new Error("Function not implemented.");
    },
    stream: function (): ReadableStream<any> {
        throw new Error("Function not implemented.");
    },
    text: function (): Promise<string> {
        throw new Error("Function not implemented.");
    }
}
const CT1 : FileWithPath = { ...CT0, name: PathCT1 }
const MR : FileWithPath  = { ...CT0,  name: PathMR }

type onLoadCallbackType=((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null

describe('DicomFilter', ()=>{

    beforeEach(() => {
        jest.restoreAllMocks();
      });
      
    test('shall extract properly the data', async () => {

        let callbackInvoked = 0

        const validateCallback = ( {done, total }:Progress )=>{
            expect(done).toBeLessThanOrEqual(total)
            expect(total).toBe(3)
            callbackInvoked++
        }
    
        // Mock FileReader class
        const readAsArrayBufferSpy = jest.spyOn(FileReader.prototype, 'readAsArrayBuffer')
        const onloadendSpy = jest.spyOn(FileReader.prototype,'onloadend','set')
        const resultSpy = jest.spyOn(FileReader.prototype,'result','get')

        let onLoadCb : onLoadCallbackType= null
        let imgBuffer: ArrayBuffer| null = null 

        readAsArrayBufferSpy.mockImplementation((blob:Blob)=>{
            expect(onLoadCb).toBeDefined()
            let file = blob as FileWithPath
            imgBuffer = fs.readFileSync(file.name).buffer
            let cb : ()=>void = onLoadCb as ()=>void
            cb()
        })

        resultSpy.mockImplementation(() : ArrayBuffer=>{
            expect(imgBuffer).toBeDefined()
            return imgBuffer!
        })

        onloadendSpy.mockImplementation( (cb: onLoadCallbackType) =>{
            onLoadCb = cb
        }) 

        let dcmInfo = await DicomEditor.Extact([CT0,CT1,MR], validateCallback)

        expect(numberOfFiles(dcmInfo.patients)).toBe(3)
        expect(dcmInfo.patients).toBeDefined()
        expect(dcmInfo.patients.length).toBe(2)
        expect(dcmInfo.patients[0].studies.length).toEqual(1)
        expect(dcmInfo.patients[1].studies.length).toEqual(1)  
        expect(dcmInfo.patients[0].studies[0].series[0].files).toEqual([CT0,CT1])
        expect(dcmInfo.patients[1].studies[0].series[0].files).toEqual([MR])
        expect(callbackInvoked).toBe(3)

        const patientTg = '00100010'
        const modalityTg= '00080060'
        const studyUIDTg= '0020000D'
        const ctPatname = dcmInfo.patients[0].tags.valueList.find(tag=>tag.dcmTag===patientTg)
        const mrPatname = dcmInfo.patients[1].tags.valueList.find(tag=>tag.dcmTag===patientTg)
        const ctStudyUID= dcmInfo.patients[0].studies[0].tags.valueList.find(tag=>tag.dcmTag===studyUIDTg)
        const mrStudyUID= dcmInfo.patients[1].studies[0].tags.valueList.find(tag=>tag.dcmTag===studyUIDTg)

        expect(ctPatname).toBeDefined()
        expect(mrPatname).toBeDefined()

        const ctNewName = 'CT NEW'
        const mrNewName = 'MR NEW'

        ctPatname!.setValue(ctNewName)
        mrPatname!.setValue(mrNewName)
        let nModImages = 0
        let zipDone    =0
        const callback = (mode : ProcessStages, {done,total} : Progress) =>{
            if( mode == 'processing'){
                expect(done).toBeLessThanOrEqual(total)
                expect(total).toBe(3)
                nModImages++
            }
            if( mode === 'zipping'){
                zipDone = done
            }
        }

        const zipBuffer = await DicomEditor.Modify(dcmInfo, true, callback)
        expect(zipBuffer).toBeDefined()
        expect(zipDone).toBe(100)

        let zip = new JSZip()
        zip = await zip.loadAsync( new Uint8Array(zipBuffer ))

        let nImages = 0
        for( const filename in zip.files ){
            const zipEntry = zip.file(filename)!
            if(!zipEntry) continue
            const image = await zipEntry.async('arraybuffer')
            const dcmDic = DicomMessage.readFile(image);
            const modality = dcmDic.dict[modalityTg].Value[0]
            const patname  = dcmDic.dict[patientTg].Value[0]
            const studyUID = dcmDic.dict[studyUIDTg].Value[0]
            expect(['CT','MR'].includes(modality)).toBeTruthy()
            if(modality==='CT') { 
                expect(patname).toBe(ctNewName)
                expect(studyUID).not.toBe(ctStudyUID)
            }
            if(modality==='MR') { 
                expect(patname).toBe(mrNewName)
                expect(studyUID).not.toBe(mrStudyUID)
            }

            nImages++
        }

        expect(nModImages).toBe(3)
        expect(nImages).toBe(3)

    },60*1000);
})
