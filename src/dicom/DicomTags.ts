export interface DicomTagDefinition {
    name : string
    tag : string
    enumeratedValues? : string []
    hide? : boolean
}

const PatientTags : DicomTagDefinition[] = [
    {
        name : "Patient Name",
        tag : "00100010"
    },
    {
        name : "Patient ID",
        tag : "00100020"
    },
    {
        name : "Other Patient IDs",
        tag : "00101000"
    },
    {
        name : "Type of Patient ID",
        tag : "00100022"
    },
    {
        name : "Other Patient Names",
        tag : "00101001"
    },
    {
        name : "Patient's Birth Name",
        tag : "00101005"
    },
    {
        name : "Patient Mother's Birth Name",
        tag : "00101060"
    },
    {
        name : "Patient Age",
        tag : "00101010"
    },
    {
        name : "Patient's Occupation",
        tag : "00102180"
    },
    {
        name : "Confidentiality Constraint on Patient Data Description",
        tag : "00103001"
    },
    {
        name : "Patient's Birth Date",
        tag : "00100030"
    },
    {
        name : "Patient's Time",
        tag : "00100032"
    },
    {
        name : "Patient's Sex",
        tag : "00100040",
        enumeratedValues : ["M","F","O"]
    },
    {
        name : "Quality Control Subject",
        tag : "00100200",
        enumeratedValues : ["YES","NO"]
    },
    {
        name : "Patient's Size",
        tag : "00101020"
    },
    {
        name : "Patient's Weight",
        tag : "00101030"
    },
    {
        name : "Patient's Address",
        tag : "00101040"
    },
    {
        name : "Patient's Comments",
        tag : "00104000"
    },
    {
        name : "Patient's Responsabile Person",
        tag : "00102297"
    },
    {
        name : "Patient's Responsabile Person Role",
        tag : "00102298",
        enumeratedValues : ["OWNER","PARENT","CHILD","SPOUSE","SIBLING","RELATIVE","GUARDIAN","CUSTODIAN","AGENT"]
    },
    {
        name : "Patient's Responsible Organization",
        tag : "00102299"
    },
    {
        name : "Patient Species Description",
        tag : "00102201"
    },
    {
        name : "Patient Breed Description",
        tag : "00102292"
    }
]

export default PatientTags

export const StudyTags : DicomTagDefinition[] = [
    {
        name : "Study Date",
        tag : "00080020"
    },
    {
        name : "Study Time",
        tag : "00080030"
    },
    {
        name : "Accession Number",
        tag : "00080050"
    },
    {
        name : "Referring Physician Name",
        tag : "00080090"
    },
    {
        name : "Consulting Physician Name",
        tag : "0008009C"
    },
    {
        name : "Study Description",
        tag : "00081030"
    },
    {
        name : "Physicians Of Record",
        tag : "00081048"
    },
    {
        name : "Name Of Physicians Reading Study",
        tag : "00081060"
    },
    {
        name : "StudyID",
        tag : "00200010"
    },
    {
        name : "Requesting Service",
        tag : "00321033"
    },
    {
        name : "Admitting Diagnoses Description",
        tag : "00081080"
    },
    {
        name : "Study Instance UID",
        tag : "0020000D",
        hide : true
    }
]

export const SeriesTags : DicomTagDefinition[] = [
    {
        name : "Series Date",
        tag : "00080021"
    },
    {
        name : "Series Time",
        tag : "00080031"
    },
    {
        name : "Modality",
        tag : "00080060"
    },
    {
        name : "Series Description",
        tag : "0008103E"
    },
    {
        name : "Performing Physician's Name",
        tag : "00081050"
    },
    {
        name : "Operators' Name",
        tag : "00081070"
    },
    {
        name : "Anatomical Orientation Type",
        tag : "00102210",
        enumeratedValues : ["BIPED","QUADRUPED"]
    },
    {
        name : "Body Part Examined",
        tag : "00180015"
    },
    {
        name : "Protocol Name",
        tag : "00181030"
    },
    {
        name : "Patient Position",
        tag : "00185100"
    },
    {
        name : "Series Number",
        tag : "00200011"
    },
    {
        name : "Laterality",
        tag : "00200060"
    },
    {
        name : "Smallest Pixel Value in Series",
        tag : "00280108"
    },
    {
        name : "Largest Pixel Value in Series",
        tag : "00280109"
    },
    {
        name : "Performed Procedure Step Start Date",
        tag : "00400244"
    },
    {
        name : "Performed Procedure Step Start Time",
        tag : "00400245"
    },
    {
        name : "Performed Procedure Step End Date",
        tag : "00400250"
    },
    {
        name : "Performed Procedure Step End Time",
        tag : "00400251"
    },
    {
        name : "Performed Procedure Step ID",
        tag : "00400253"
    },
    {
        name : "Performed Procedure Step Description",
        tag : "00400254"
    },
    {
        name : "Comments on the Performed Procedure Step",
        tag : "00400280"
    },
    {
        name : "Series Instance UID",
        tag : "0020000E",
        hide: true
    }
]
