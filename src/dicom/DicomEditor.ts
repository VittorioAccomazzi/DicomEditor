import { FileWithPath } from "file-selector";
import { fixDigit, foreachImage, numberOfFiles } from "../common/utils";
import DicomTagList from "./DicomTagList";
import PatientTags, { ImageTags, SeriesTags, StudyTags } from "./DicomTags";
import DicomDataset from "./DicomDataset";
import DicomUidReplacer from "./DicomUIDReplacer";
import JSZip from "jszip";

export interface Progress {
    done : number,
    total: number
}
export interface ImageInfo {
    tags: DicomTagList,
    files : FileWithPath []
}
export interface SeriesInfo {
    tags : DicomTagList,
    images: ImageInfo[]
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
export type ProcessStages    = 'processing' | 'zipping'
export type ProcessCallback  = ( type : ProcessStages, progress : Progress) => void

const studyUIDTag   = '0020000D'
const seriesUIDTag  = '0020000E'
const mediaStUIDTag = '00020003'
const instanceUIDTag= '00080018'
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
                const dcm = new DicomDataset(data)
                const pat = new DicomTagList(dcm, PatientTags)
                const stu = new DicomTagList(dcm, StudyTags)
                const ser = new DicomTagList(dcm, SeriesTags)
                const img = new DicomTagList(dcm, ImageTags)
                this.add(patients, pat, stu, ser, img, files[f])
            }
            progress({ done:f+1, total:files.length})
        }

        return {patients}
    }

    /**
     * Modifies the file based on the input tag set
     * @param info tags definition, which will include the modification which needs to be done.
     * @param replaceUID true if all the UIDs needs to be replaced
     * @param progress callback which will report the image generated and also he progress
     */
    static async Modify( info : DicomFilesInfo, replaceUID: boolean, progress : ProcessCallback ) : Promise<ArrayBuffer> {
        const zip = new JSZip()
        const repUID= new DicomUidReplacer()
        const total = numberOfFiles(info.patients)
        let count=0
        for( const {patient, study, series, image, patIndex, stuIndex, serindex } of foreachImage(info.patients)){
            let imgIndex =0
            for( const file of image.files) {
                const data = await this.readFile(file)
                const dcm  = new DicomDataset(data);
                patient.tags.Modify(dcm)
                study.tags.Modify(dcm)
                series.tags.Modify(dcm)
                image.tags.Modify(dcm)
                if( replaceUID ) DicomEditor.replaceUIDs(dcm, repUID);
                imgIndex++
                const outB = dcm.write()
                const filename = this.imageFilename(patIndex, stuIndex, serindex, imgIndex)
                zip.file(filename, outB, {binary:true,createFolders:true})
                await progress( 'processing', {total, done:++count})
            }
        }
        const zipFile = await zip.generateAsync({type:'arraybuffer'},(meta)=>{
            progress('zipping', {total:100, done : meta.percent })
        })
        return zipFile
    } 
    static imageFilename(patIndex: number, stuIndex: number, serindex: number, imgIndex: number) {
        return 'PAT'+fixDigit(patIndex,2)+'/'+
               'STU'+fixDigit(stuIndex,2)+'/'+
               'SER'+fixDigit(serindex,3)+'/'+
               'IMG'+fixDigit(imgIndex,5)+'.dcm'
    }

    private static replaceUIDs(dcm: DicomDataset, repUID: DicomUidReplacer) {
        const studyUID = dcm.get(studyUIDTag)!.Value[0].toString();
        const seriesUID = dcm.get(seriesUIDTag)!.Value[0].toString();
        const instanceUID = dcm.get(instanceUIDTag)!.Value[0].toString();
        const newUIDs = repUID.replace({ studyUID, seriesUID, instanceUID });
        dcm.set(studyUIDTag, newUIDs.studyUID);
        dcm.set(seriesUIDTag, newUIDs.seriesUID);
        dcm.set(instanceUIDTag, newUIDs.instanceUID);
        dcm.set(mediaStUIDTag, newUIDs.instanceUID )
    }

    private static add( patients : PatientInfo[], pat : DicomTagList, stu : DicomTagList, ser : DicomTagList, img: DicomTagList, file : FileWithPath  ){
        let patient = patients.find(p=>p.tags.isEqual(pat))
        if( !patient ){
            patient = { tags : pat, studies : [] }
            patients.push(patient)
        }
        patient.tags.Merge(pat)

        let study = patient.studies.find(s=>s.tags.isEqual(stu))
        if(!study){
            study= {tags : stu, series: []}
            patient.studies.push(study)
        }
        study.tags.Merge(stu)

        let series=study.series.find(s=>s.tags.isEqual(ser))
        if(!series){
            series = {tags:ser, images:[]}
            study.series.push(series)
        }
        series.tags.Merge(ser)

        let image = series.images.find(i=>i.tags.isEqual(img))
        if(!image) {
            image = {tags:img, files: []}
            series.images.push(image)
        }
        image.tags.Merge(img)
        image.files.push(file)
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