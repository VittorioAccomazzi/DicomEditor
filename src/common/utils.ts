import { PatientInfo, SeriesInfo, StudyInfo } from "../dicom/DicomEditor"

export default async function wait(ms:number) : Promise<void> {
    return new Promise((res)=>{ setTimeout(res,ms)  })
}

export interface DicomHierarchy {
    patient : PatientInfo,
    study    : StudyInfo,
    series : SeriesInfo
}
export function *foreachSeries(patients: PatientInfo []):Generator<DicomHierarchy> {
    for( const patient of patients){
        for( const study of patient.studies ){
            for( const series of study.series ){
                yield {patient,study,series}
            }
        }
    }
}

export function numberOfFiles( patients : PatientInfo []) : number {
    let num =0;
    for( const {series} of foreachSeries(patients)) {
        num += series.files.length
    }
    return num
}