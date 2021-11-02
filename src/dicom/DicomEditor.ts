import { FileWithPath } from "file-selector";
import { foreachSeries, numberOfFiles } from "../common/utils";
import DicomTagList from "./DicomTagList";
import PatientTags, { SeriesTags, StudyTags } from "./DicomTags";

const dcmjs = require("dcmjs");
const { DicomMessage } = dcmjs.data;

export interface Progress {
    done : number,
    total: number
}
export interface SeriesInfo {
    tags : DicomTagList,
    files: FileWithPath []
}
export interface StudyInfo {
    tags : DicomTagList,
    series : SeriesInfo[]
}
export interface PatientInfo {
    tags : DicomTagList,
    studies : StudyInfo []
}
export interface DicomFilesInfo {
    patients : PatientInfo[]
}
export type ProgressCallback = ( progress : Progress ) => void
export type DownloadCallback = ( image : ArrayBuffer, progress : Progress ) => Promise<void>

export default class DicomEditor {

    /**
     * Extract "known" DICOM tag from a set of files
     * @param files list of files selected by the user (dropped in the borowser)
     * @param progress  progress callback
     * @returns informationn of "known" Dicom tags, definition, vr and value.
     */
    static async Extact ( files : FileWithPath [], progress : ProgressCallback ) : Promise<DicomFilesInfo> {
        let patients : PatientInfo [] = []

        // filter out DICOMDIR -- they are valid DICOM files and they will be reported
        files = files.filter((f)=>!f.name.endsWith('DICOMDIR'))
        
        for( let f=0; f<files.length; f++ ){
            let data = await this.readFile(files[f])
            if( this.sanityCheck(data)){
                const dcm = DicomMessage.readFile(data);
                const pat = new DicomTagList(dcm.dict, PatientTags)
                const stu = new DicomTagList(dcm.dict, StudyTags)
                const ser = new DicomTagList(dcm.dict, SeriesTags)
                this.add(patients, pat, stu, ser, files[f])
            }
            progress({ done:f+1, total:files.length})
        }

        return {patients}
    }

    /**
     * Modifies the file based on the input tag set
     * @param info tags definition, which will include the modification which needs to be done.
     * @param progress callback which will report the image generated and also he progress
     */
    static async Modify( info : DicomFilesInfo, progress : DownloadCallback ) : Promise<void> {
        const total = numberOfFiles(info.patients)
        let count=0
        for( const {patient, study, series } of foreachSeries(info.patients)){
            for( const file of series.files) {
                const data = await this.readFile(file)
                const dcmD = DicomMessage.readFile(data);
                patient.tags.Modify(dcmD.dict)
                study.tags.Modify(dcmD.dict)
                series.tags.Modify(dcmD.dict)
                const outB = dcmD.write() as ArrayBuffer
                await progress(outB, {total, done:++count})
            }
        }
    } 

    private static add( patients : PatientInfo[], pat : DicomTagList, stu : DicomTagList, ser : DicomTagList,  file : FileWithPath  ){
        let patient = patients.find(p=>p.tags.isEqual(pat))
        if( !patient ){
            patient = { tags : pat, studies : [] }
            patients.push(patient)
        }
        let study = patient.studies.find(s=>s.tags.isEqual(stu))
        if(!study){
            study= {tags : stu, series: []}
            patient.studies.push(study)
        }
        let series=study.series.find(s=>s.tags.isEqual(ser))
        if(!series){
            series = {tags:ser, files:[]}
            study.series.push(series)
        }
        series.files.push(file)
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