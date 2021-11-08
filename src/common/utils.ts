import { PatientInfo, SeriesInfo, StudyInfo } from "../dicom/DicomEditor"

export default async function wait(ms:number) : Promise<void> {
    return new Promise((res)=>{ setTimeout(res,ms)  })
}

export interface DicomHierarchy {
    patient : PatientInfo,
    study    : StudyInfo,
    series : SeriesInfo,
    patIndex : number,
    stuIndex : number,
    serindex : number
}
export function *foreachSeries(patients: PatientInfo []):Generator<DicomHierarchy> {
    for( const patient of patients){
        const patIndex = patients.indexOf(patient)
        for( const study of patient.studies ){
            const stuIndex = patient.studies.indexOf(study)
            for( const series of study.series ){
                const serindex = study.series.indexOf(series)
                yield {patient,study,series,patIndex,stuIndex,serindex}
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

export function fixDigit(val:number, numDigit:number ) : string {
    const str  = Math.round(val).toString()
    let num =  numDigit > str.length ?  numDigit-str.length : 0
    return '0'.repeat(num)+str
}