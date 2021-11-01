import { DicomTagDefinition } from "./DicomTags";


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

    public get dcmTag() : string {
        return this.tag.tag
    }

    public isSame(other:DicomTagValue) : boolean {
        return this.tag === other.tag && this.val === other.val
    }

    public setValue(value : string ): boolean {
        let doSet = true

        if( this.tag.enumeratedValues ){
            doSet = (this.tag.enumeratedValues.find((v)=>v===value) !== undefined)
        }
        if( this.vr === 'DA'){
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