import { DicomTagDefinition } from "./DicomTags";


interface vrConstrain {
    vr : string,
    len: number,
    isNumeric : boolean
}

// see http://dicom.nema.org/dicom/2013/output/chtml/part05/sect_6.2.html
const vrConstrains : vrConstrain [] =[
    {
        vr: "AE",
        len: 16,
        isNumeric: false
    },
    {
        vr: "AS",
        len: 4,
        isNumeric: false
    },
    {
        vr: "AT",
        len: 4,
        isNumeric: false
    },
    {
        vr: "CS",
        len: 16,
        isNumeric: false
    },
    {
        vr: "DA",
        len: 8,
        isNumeric: false
    },
    {
        vr: "DS",
        len: 16,
        isNumeric: true
    },
    {
        vr: "DT",
        len: 26,
        isNumeric: true
    },
    {
        vr: "IS",
        len: 12,
        isNumeric: true
    },
    {
        vr: "LO",
        len: 64,
        isNumeric: false
    },
    {
        vr: "LT",
        len: 10240,
        isNumeric: false
    },
    {
        vr: "OB",
        len: 100,
        isNumeric: false
    },
    {
        vr: "OD",
        len: 100,
        isNumeric: false
    },
    {
        vr: "OF",
        len: 100,
        isNumeric: false
    },
    {
        vr: "SH",
        len: 16,
        isNumeric: false
    },
    {
        vr: "ST",
        len: 1024,
        isNumeric: false
    },
    {
        vr: "TM",
        len: 14,
        isNumeric: true
    },
    {
        vr: "UI",
        len: 64,
        isNumeric: true
    }

]



export default class DicomTagValue {

    private tag : DicomTagDefinition
    private val : string
    private vr  : string
    private org : string

    constructor( tag : DicomTagDefinition, vr : string, val : string ){
        this.tag=tag
        this.val=val
        this.org=val
        this.vr=vr
    }   

    public get name() : string {
        return this.tag.name
    }

    public get value() : string {
        return this.val
    }

    public get isModified(): boolean {
        return this.org !== this.val
    }

    public get isHidden() : boolean {
        return this.tag.hide || false
    }

    public get dcmTag() : string {
        return this.tag.tag
    }

    public isSame(other:DicomTagValue) : boolean {
        return this.tag === other.tag && this.val === other.val
    }

    public setValue(value : string ): boolean {
        let doSet = true

        const cnstr = vrConstrains.find((c)=>this.vr===c.vr)

        if( cnstr ){
            doSet = value.length <= cnstr.len
            if(doSet && cnstr.isNumeric) {
                const isNumeric = [...value].map((char)=>"0123456789.+-Ee,".includes(char)).reduce((prev,curr)=>prev&&curr,true)
                doSet = isNumeric
            }
        }

        if( doSet && this.tag.enumeratedValues ){
            doSet = (this.tag.enumeratedValues.find((v)=>v===value) !== undefined)
        }
        if( doSet && this.vr === 'DA'){
            // check that the value is a date in the forrm YYYYMMDD
            let month = 0
            let day =0
            if(value.length===8){
                month = parseInt(value.substr(4,2))
                day = parseInt(value.substr(6,2))
            }
            doSet = month > 0 && month< 13 && day>0 && day <32
        }
        if( doSet ) this.val = value
        return doSet
    }

}