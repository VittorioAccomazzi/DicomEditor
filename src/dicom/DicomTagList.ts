import { DicomTagDefinition } from "./DicomTags";
import DicomTagValue from "./DicomTagValue";


export default class DicomTagList {

    private list : DicomTagValue[]

    constructor( dict : any, tags : DicomTagDefinition[] )  {
        this.list = []
        tags.forEach( tag =>{
            let val = dict[tag.tag]
            if( val && val.Value && val.Value.length > 0 ) this.list.push( new DicomTagValue(tag, val.vr, val.Value[0].toString()))
        })
    }

    public get valueList() : DicomTagValue [] {
        return this.list
    }

    public isEqual( other : DicomTagList ) : boolean {
        let iseq = other.list.length === this.list.length
        if( iseq ){
            let res =  this.list.map((val)=> other.list.find((oVal)=>oVal.isSame(val)))
            iseq = !res.some((v)=> !v)
        }
        return iseq 
    }

    public Modify( dict : any ){

        for( const valueTag of this.valueList ) {
            if( valueTag.isModified ){
                dict[valueTag.dcmTag].Value[0] = valueTag.value
            }
        }
    }

}