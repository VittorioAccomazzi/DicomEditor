const dcmjs = require("dcmjs");
const { DicomMessage } = dcmjs.data;

/**
 * Simple class to encapsulate the DICOM library
 */

export interface DicomEl {
    Value : object[],
    vr : string
}

export default class DicomDataset {

    private  dataset : any

    constructor( inBuffer : ArrayBuffer ){
        this.dataset = DicomMessage.readFile(inBuffer);
    }

    public get(tag:string) : DicomEl | undefined {
        const dict = this.getDict(tag)
        return dict[tag]
    }

    public set(tag:string,value:string) {
        const dict = this.getDict(tag)
        const el = dict[tag]
        if( el ){
            el.Value[0]=value
        } else {
            throw new Error('Not supported')
        }
    }

    public has(tag:string) : boolean {
        return this.getDict(tag)[tag] != null
    }

    public write() {
        return this.dataset.write() as ArrayBuffer
    }

    private getDict(tag:string) : any {
        const dict = tag.startsWith('0002') ? this.dataset.meta : this.dataset.dict
        return dict
    }

}