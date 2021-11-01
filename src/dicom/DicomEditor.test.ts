import { FileWithPath } from "file-selector";
import DicomEditor, { Progress } from "./DicomEditor";
import * as fs from 'fs'

const dcmjs = require("dcmjs");
const { DicomMetaDictionary, DicomDict, DicomMessage } = dcmjs.data;

const dataFolder = 'src/dicom/testData/'

const CT0 : FileWithPath = {
    lastModified: 0,
    name: dataFolder+"CT0.dcm",
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

const CT1 : FileWithPath = { ...CT0, name: dataFolder+"CT1.dcm" }

const MR : FileWithPath  = { ...CT0,  name: dataFolder+"MR.dcm" }

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

        expect(dcmInfo.files.length).toBe(3)
        expect(dcmInfo.patients).toBeDefined()
        expect(dcmInfo.patients.length).toBe(2)
        expect(dcmInfo.patients[0].files).toEqual([CT0,CT1])
        expect(dcmInfo.patients[1].files).toEqual([MR])
        expect(callbackInvoked).toBe(3)

        const patientTg = '00100010'
        const modalityTg= '00080060'
        const ctPatname = dcmInfo.patients[0].tagList.valueList.find(tag=>tag.dcmTag===patientTg)
        const mrPatname = dcmInfo.patients[1].tagList.valueList.find(tag=>tag.dcmTag===patientTg)

        expect(ctPatname).toBeDefined()
        expect(mrPatname).toBeDefined()

        const ctNewName = 'CT NEW'
        const mrNewName = 'MR NEW'

        ctPatname!.setValue(ctNewName)
        mrPatname!.setValue(mrNewName)
        let nModImages = 0

        const callback = (image : ArrayBuffer, {done,total} : Progress)=>{
            expect(done).toBeLessThanOrEqual(total)
            expect(total).toBe(3)
            const dcmDic = DicomMessage.readFile(image);
            const modality = dcmDic.dict[modalityTg].Value[0]
            const patname  = dcmDic.dict[patientTg].Value[0]
            expect(['CT','MR'].includes(modality)).toBeTruthy()
            if(modality==='CT') expect(patname).toBe(ctNewName)
            if(modality==='MR') expect(patname).toBe(mrNewName)
            nModImages++
        }

        await DicomEditor.Modify(dcmInfo, callback)

        expect(nModImages).toBe(3)


    },10000);
})
