export interface DicomTagDefinition {
    name : string
    tag : string
    enumeratedValues? : string []
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
