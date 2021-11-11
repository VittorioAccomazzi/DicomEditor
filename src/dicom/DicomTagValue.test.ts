import { DicomTagDefinition } from "./DicomTags"
import DicomTagValue from "./DicomTagValue"

const tagDef1 : DicomTagDefinition = {
    name : "tag 1 name",
    tag : "00010010" 
}

const tagDef2 : DicomTagDefinition = {
    name : "tag 2 name",
    tag : "00010020" 
}

const tagDefVals : DicomTagDefinition = {
    name : "tag Values",
    tag : "00010020",
    enumeratedValues : ["BAD","GOOD"]
}

const tagDef3 : DicomTagDefinition = {
    name : "Tag Name",
    tag : "00010007"
}

test('it shall report correct name and value',()=>{
    const tagValue = 'Value Tag 1'
    const tv = new DicomTagValue(tagDef1, 'CS', tagValue)
    expect(tv.name).toEqual(tagDef1.name)
    expect(tv.value).toEqual(tagValue)
})

test('shall able to compare tags',()=>{
    const tagValue = 'Value Tag 1'
    const tv1 = new DicomTagValue(tagDef1, 'CS', tagValue)
    const tv2 = new DicomTagValue(tagDef1, 'CS', tagValue)
    const tv3 = new DicomTagValue(tagDef1, 'CS', 'different value')
    const tv4 = new DicomTagValue(tagDef2, 'CS', tagValue)

    expect(tv1.isSame(tv2)).toBeTruthy()
    expect(tv2.isSame(tv1)).toBeTruthy()
    expect(tv1.isSame(tv3)).toBeFalsy()
    expect(tv3.isSame(tv1)).toBeFalsy()
    expect(tv1.isSame(tv4)).toBeFalsy()
    expect(tv4.isSame(tv1)).toBeFalsy()

    expect(tv1.isHidden).toBeFalsy()
    expect(tv2.isHidden).toBeFalsy()
})

test('shall validate when setting the value', ()=>{

    const tagStr = new DicomTagValue(tagDef1,'CS','string value')
    const tagEnu = new DicomTagValue(tagDefVals, 'CS', "GOOD")
    const tagDate= new DicomTagValue(tagDef2, 'DA','20211024')

    // valid condition
    expect(tagStr.setValue('new string value')).toBeTruthy()    // string
    expect(tagEnu.setValue('BAD')).toBeTruthy()                 // enumerated values
    expect(tagDate.setValue('20200802')).toBeTruthy()           // date
 
    //invalid condition
    expect(tagEnu.setValue('NOT THERE')).toBeFalsy()           // enumerated values
    expect(tagDate.setValue('20201502')).toBeFalsy()           // date
    expect(tagDate.setValue('20200842')).toBeFalsy()           // date
    expect(tagDate.setValue('202008DD')).toBeFalsy()           // date
    expect(tagDate.setValue('20200802:1530')).toBeFalsy()      // date 
})

test('shall track modified values',()=>{
    const tagStr = new DicomTagValue(tagDef1,'CS','string value')
    const tagDate= new DicomTagValue(tagDef2, 'DA','20211024')  
    const tagEnu = new DicomTagValue(tagDefVals, 'CS', "GOOD")

    let resStr = tagStr.setValue('new value')
    expect(resStr).toBeTruthy()
    expect(tagStr.isModified).toBeTruthy()

    let resDat = tagDate.setValue('not valid')
    expect(resDat).toBeFalsy()
    expect(tagDate.isModified).toBeFalsy()

    resDat = tagDate.setValue('20101009')
    expect(resDat).toBeTruthy()
    expect(tagDate).toBeTruthy()

    let resEnu = tagEnu.setValue('not valid')
    expect(resEnu).toBeFalsy()
    expect(tagEnu.isModified).toBeFalsy()

    resEnu = tagEnu.setValue('BAD')
    expect(resEnu).toBeTruthy()
    expect(tagEnu.isModified).toBeTruthy()

})

test('Shall validate Dicom tags',()=>{
    const tagDs = new DicomTagValue(tagDef3,'DS','001')

    // invalid character
    expect(tagDs.setValue('128s')).toBeFalsy()

    // inavalid len
    expect(tagDs.setValue('918298291201820218')).toBeFalsy()

    // valid set
    expect(tagDs.setValue('128')).toBeTruthy()
})

test('test case with tage with multiple value',()=>{
    const value1 = 'string value'
    const value2 = 'value 2'
    const tagMv = new DicomTagValue(tagDef1,'CS',value1)

    tagMv.addOtherValue(value2)
    expect(tagMv.isModified).toBeFalsy()
    expect(tagMv.value).toBe(value1)
    expect(tagMv.otherValues).toStrictEqual([value2])
})