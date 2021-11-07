import DicomUidReplacer, { DicomUIDs }  from "./DicomUIDReplacer";

test('shall replace ID consistently', ()=>{

    const i1 : DicomUIDs = {
        studyUID : '1.2.3.4.5',
        seriesUID: '1.8.5.4',
        instanceUID: '1.10.11.13'
    }
    const i2 : DicomUIDs = { ...i1,  instanceUID: '1.10.11.14'   }
    const i3 : DicomUIDs = { ...i1,  seriesUID: '1.8.5.12', instanceUID: '1.10.11.15'   }

    const dcmReplacer = new DicomUidReplacer()

    const r1 = dcmReplacer.replace(i1)
    const r2 = dcmReplacer.replace(i2)
    const r3 = dcmReplacer.replace(i3)

    expect(r1.studyUID).toBe(r2.studyUID)
    expect(r1.studyUID).toBe(r3.studyUID)
    expect(r1.seriesUID).toBe(r2.seriesUID)
    expect(r2.seriesUID).not.toBe(r3.seriesUID)

    expect(i1.studyUID).not.toBe(r1.studyUID)
    expect(i1.seriesUID).not.toBe(r1.seriesUID)
    expect(i1.instanceUID).not.toBe(r1.instanceUID)

})

test('shall return items less then 64 characters',()=>{
    const i1 : DicomUIDs = {
        studyUID : '1234567890.1234567890.1234567890.1234567890.1234567890.1234567890',
        seriesUID: '1234567890.1234567890.1234567890.1234567890.1234567890.1234567890.1234567890',
        instanceUID: '1.10.11.13'
    }

    const dcmReplacer = new DicomUidReplacer()
    const r1 = dcmReplacer.replace(i1)

    expect(i1.studyUID).not.toBe(r1.studyUID)
    expect(i1.seriesUID).not.toBe(r1.seriesUID)
    expect(i1.instanceUID).not.toBe(r1.instanceUID)

    expect(r1.instanceUID.length).toBeLessThanOrEqual(64)
    expect(r1.seriesUID.length).toBeLessThanOrEqual(64)
    expect(r1.studyUID.length).toBeLessThanOrEqual(64)

})