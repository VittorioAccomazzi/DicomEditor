import DicomDataset from "./DicomDataset";
import { DicomTagDefinition } from "./DicomTags";
import DicomTagValue from "./DicomTagValue";


export default class DicomTagList {

    private list : DicomTagValue[]

    constructor( dcm: DicomDataset, tags : DicomTagDefinition[] )  {
        this.list = []
        tags.forEach( tag =>{
            let val = dcm.get(tag.tag)
            if( val && val.Value && val.Value.length > 0 ) this.list.push( new DicomTagValue(tag, val.vr, val.Value[0].toString()))
        })
    }

    public get valueList() : DicomTagValue [] {
        return this.list
    }

    public isEqual( other : DicomTagList ) : boolean {
        const thisList = this.list.filter(v=>v.isCompare)
        const otherList= other.list.filter(v=>v.isCompare)
        let iseq = otherList.length === thisList.length
        if( iseq ){
            let res =  thisList.map((val)=> otherList.find((oVal)=>oVal.isSame(val)))
            iseq = !res.some((v)=> !v)
        }
        return iseq 
    }

    public Modify( dcm: DicomDataset ){
        for( const valueTag of this.valueList ) {
            if( valueTag.isModified && dcm.has(valueTag.dcmTag) ) {
                dcm.set(valueTag.dcmTag, valueTag.value)
            }
        }
    }

    public Merge(other:DicomTagList) : void {
        other.list.forEach(val=>{
            let el = this.list.find(v=>v.dcmTag===val.dcmTag)
            if( el ){
                if( el.value !== val.value) {
                    el.addOtherValue(val.value) // track that there is a another value for this tag.
                }
            } else {
                // not present and so we need to insert it
                this.list.push(val)
            }
        })
    }

}