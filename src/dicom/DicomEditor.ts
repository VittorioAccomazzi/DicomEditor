import { FileWithPath } from "file-selector";
import DicomTagList from "./DicomTagList";
import PatientTags from "./DicomTags";

const dcmjs = require("dcmjs");
const { DicomMessage } = dcmjs.data;


export interface Progress {
    done : number,
    total: number
}
export interface DicomTagGroup {
    tagList : DicomTagList,
    files : FileWithPath []
}
export interface DicomFilesInfo {
    files  : FileWithPath[],
    patients : DicomTagGroup []
}
export type ProgressCallback = ( p : Progress ) => void
export type DownloadCallback = ( image : ArrayBuffer, p : Progress ) => Promise<void>

export default class DicomEditor {

    /**
     * Extract "known" DICOM tag from a set of files
     * @param files list of files selected by the user (dropped in the borowser)
     * @param progress  progress callback
     * @returns informationn of "known" Dicom tags, definition, vr and value.
     */
    static async Extact ( files : FileWithPath [], progress : ProgressCallback ) : Promise<DicomFilesInfo> {
        let patients : DicomTagGroup [] = []
        let dcmFiles : FileWithPath [] = [] 

        // filter out DICOMDIR -- they are valid DICOM files and they will be reported
        files = files.filter((f)=>!f.name.endsWith('DICOMDIR'))
        
        for( let f=0; f<files.length; f++ ){
            let data = await this.readFile(files[f])
            if( this.sanityCheck(data)){
                const dcm = DicomMessage.readFile(data);
                const pat = new DicomTagList(dcm.dict, PatientTags)
                this.add(patients, pat, files[f])
                dcmFiles.push(files[f])
            }
            progress({ done:f+1, total:files.length})
        }

        return {patients,files:dcmFiles}
    }

    /**
     * Modifies the file based on the input tag set
     * @param info tags definition, which will include the modification which needs to be done.
     * @param progress callback which will report the image generated and also he progress
     */
    static async Modify( info : DicomFilesInfo, progress : DownloadCallback ) : Promise<void> {
        for(let f = 0; f<info.files.length; f++){
            const file = info.files[f]
            const tags = info.patients.find((p)=>p.files.find(i=>i===file))
            const data = await this.readFile(file)
            const dcmD = DicomMessage.readFile(data);
            tags!.tagList.Modify(dcmD.dict)
            const outB = dcmD.write() as ArrayBuffer
            await progress(outB, {total:info.files.length, done:f+1})
        }
    } 

    private static add( groups : DicomTagGroup [], list : DicomTagList, file : FileWithPath  ){
        let group = groups.find((v)=>v.tagList.isEqual(list))
        if( group ){
            group.files.push(file)
        } else {
            groups.push({
                tagList : list,
                files : [file]
            })
        }
    }

    private static async  readFile ( file : FileWithPath ) : Promise<ArrayBuffer> {
        return new Promise((res)=>{
            let reader = new FileReader()
            reader.onloadend = ()=> res(reader.result as ArrayBuffer)
            reader.readAsArrayBuffer(file)
        })
    }

    // Sanity check the file is a valid DICOM file
    private static sanityCheck(data:ArrayBuffer) : boolean {
        const view = new Uint8Array(data)
        let isValid =  view.length > 131
        if( isValid ){
            isValid = view[128] === 0x44 && // D
                      view[129] === 0x49 && // I
                      view[130] === 0x43 && // C
                      view[131] === 0x4d    // M
        }
        return isValid
    }

}