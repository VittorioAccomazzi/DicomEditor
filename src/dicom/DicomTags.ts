export interface DicomTagDefinition {
    name : string
    tag : string
    enumeratedValues? : string []
    hide? : boolean
    compare? : boolean
}

const PatientTags : DicomTagDefinition[] = [
    {
        name : "Patient Name",
        tag : "00100010",
        compare : true
    },
    {
        name : "Patient ID",
        tag : "00100020",
        compare : true
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
        hide : true,
        compare: true
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
        hide: true,
        compare:true
    },
    {
        name: "Manufacturer",
        tag: "00080070"
    },
    {
        name: "Station Name",
        tag: "00081010"       
    },
    {
        name:"Institution Name",
        tag:"00080080"
    },
    {
        name:"Institution Address",
        tag:"00080081" 
    },
    {
        name:"Manufacturer's Model Name",
        tag:"00081090" 
    },
    {
        name:"Device Serial Number",
        tag:"00181000" 
    },
    {
        name:"Device UID",
        tag:"00181002" 
    },
    {
        name:"Gantry ID",
        tag:"00181008" 
    },
    {
        name:"Manufacturer's Device Class UID",
        tag:"0018100B" 
    },
    {
        name:"Software Versions",
        tag:"00181020"
    },
    {
        name:"Spatial Resolution",
        tag:"00181050"
    },
    {
        name:"Date of Last Calibration",
        tag:"00181200"
    },
    {
        name:"Time of Last Calibration",
        tag:"00181201"
    },
    {
        name:"Pixel Padding Value",
        tag:"0028,0120"
    },
    {
        name:"Derivation Description",
        tag:"00082111"
    }
]


export const ImageTags : DicomTagDefinition [] = [
    {
        name : "Image Type",
        tag : "00080008",
        compare: true
    },
    {
        name : "Acquisition Date",
        tag : "00080022"
    },
    {
        name : "Content Date",
        tag : "00080023"
    },
    {
        name : "Acquisition DateTime",
        tag : "0008002A"
    },
    {
        name : "Acquisition Time",
        tag : "00080032"
    },
    {
        name : "Content Time",
        tag : "00080033",
    },
    {
        name : "Irradiation Event UID",
        tag : "00083010",
        compare: true
    },
    {
        name : "Acquisition Number",
        tag : "00200012",
        compare: true
    },
    {
        name : "Patient Orientation",
        tag : "00200020",
        compare: true
    },
    {
        name : "Image Laterality",
        tag : "00200062",
        compare: true
    },
    {
        name : "Images in Acquisition",
        tag : "00201002",
        compare: true
    },
    {
        name : "Image Comments",
        tag : "00204000",
        compare: true
    },
    {
        name : "Quality Control Image",
        tag : "00280300",
        compare: true
    },
    {
        name : "Burned In Annotation",
        tag : "0028,0301",
        compare: true
    },
    {
        name : "Recognizable Visual Features",
        tag : "0028,0302",
        compare: true,
        enumeratedValues: ["YES","NO"]
    },
    {
        name : "Lossy Image Compression",
        tag : "0028,2110",
        compare: true,
        enumeratedValues: ["00","01"]
    },
    {
        name : "Lossy Image Compression Ratio",
        tag : "00282112",
        compare: true
    },
    {
        name : "Lossy Image Compression Method",
        tag : "00282114",
        compare: true
    },
    {
        name : "Presentation LUT Shape",
        tag : "20500020",
        compare: true,
        enumeratedValues:["IDENTITY","INVERSE"]
    },
    {
        name : "Samples per Pixel",
        tag : "00280002",
        compare: true
    },
    {
        name : "Photometric Interpretation",
        tag : "00280004",
        compare: true,
        enumeratedValues:["MONOCHROME1","MONOCHROME2","PALETTE COLOR","RGB","HSV","ARGB","CMYK","YBR_FULL","YBR_FULL_422","YBR_PARTIAL_422","YBR_PARTIAL_420","YBR_ICT","YBR_RCT"]
    },
    {
        name : "Planar Configuration",
        tag : "00280006",
        compare: true
    },
    {
        name : "Rows",
        tag : "00280010",
        compare: true
    },
    {
        name : "Columns",
        tag : "00280011",
        compare: true
    },
    {
        name : "Pixel Aspect Ratio",
        tag : "00280034",
        compare: true
    },
    {
        name : "Bits Allocated",
        tag : "00280100",
        compare: true
    },
    {
        name : "Bits Stored",
        tag : "00280101",
        compare: true
    },
    {
        name : "High Bit",
        tag : "00280102",
        compare: true
    },
    {
        name : "Pixel Representation",
        tag : "00280103",
        compare: true
    },
    {
        name : "Smallest Image Pixel Value",
        tag : "00280106",
        compare: true
    },
    {
        name : "Largest Image Pixel Value",
        tag : "00280107",
        compare: true
    },
    {
        name : "Pixel Padding Range",
        tag : "00280121",
        compare: true
    },
    {
        name : "Red Palette Color Lookup Table Descriptor",
        tag : "00281101",
        compare: true
    },
    {
        name : "Green Palette Color Lookup Table Descriptor",
        tag : "00281102",
        compare: true
    },
    {
        name : "Blue Palette Color Lookup Table Descriptor",
        tag : "00281103",
        compare: true
    },
    {
        name : "Color Space",
        tag : "00282002",
        compare: true
    },
    {
        name : "Pixel Data Provider URL",
        tag : "00287FE0",
        compare: true
    },
    {
        name : "",
        tag : "",
        compare: true
    }

]