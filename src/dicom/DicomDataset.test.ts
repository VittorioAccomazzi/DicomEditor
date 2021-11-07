import  { PathCT0 } from "../common/testUtils";
import * as fs from 'fs'
import DicomDataset from "./DicomDataset";

test('shall allow to read, write and save the dataset', async ()=>{

    const patientNameTag = '00100010'
    const patientIDTag   = '00100020' 
    const mediaStorageTag= '00020003' 
    const imgBuffer = fs.readFileSync(PathCT0).buffer
    const dcmDataset= new DicomDataset(imgBuffer)

    const patientName = dcmDataset.get(patientNameTag)
    const patietID    = dcmDataset.get(patientIDTag)
    const mediaStorage= dcmDataset.get(mediaStorageTag)

    expect(patientName?.Value[0]).toBe('C3N-00832')
    expect(patietID?.Value[0]).toBe('C3N-00832')
    expect(mediaStorage?.Value[0]).toBe('1.3.6.1.4.1.14519.5.2.1.3320.3273.285467243593842446855173655458')

    const newName = 'new-name'

    dcmDataset.set(patientNameTag,newName)

    const outBuffer = dcmDataset.write()

    const newDataset= new DicomDataset(outBuffer)

    const newPatientName = newDataset.get(patientNameTag)
    const newPatientID   = newDataset.get(patientIDTag)

    expect(newPatientName?.Value[0]).toBe(newName)
    expect(newPatientID?.Value[0]).toBe('C3N-00832')

})

test('shall throw when setting new element',async()=>{
    const imgBuffer = fs.readFileSync(PathCT0).buffer
    const dcmDataset= new DicomDataset(imgBuffer)
    const newTag='00200020'
    expect(()=>{
        dcmDataset.set(newTag,'boom!')
    }).toThrow()
})