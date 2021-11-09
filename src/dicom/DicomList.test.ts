import { cleanup } from '@testing-library/react';
import DicomDataset from './DicomDataset'
import DicomTagList from  './DicomTagList'
import { DicomTagDefinition } from './DicomTags';

jest.mock('./dicomDataset',()=>{
    return jest.fn().mockImplementation((dataset)=>{
        return {
            get: jest.fn().mockImplementation((tag)=>{
                return dataset[tag]
            }),
            set : ()=> {throw Error('set not implemented')},
            write:()=>{throw Error('writte not implemented')}
        }
    });
});


beforeEach(() => {
    // setup a DOM element as a render target
  });
  
  afterEach(()=>{
    cleanup()
    jest.clearAllMocks()
  })
  
  

const tagDefinition : DicomTagDefinition [] = [
    {
        name : "test1",
        tag :  "00010000",
        compare: true
    },
    {
        name : "test2",
        tag :  "00020000"
    },
    {
        name : "test3",
        tag :  "00030000"
    },
]

const dataset1 = {
    '00010000' : {
        vr : 'CS',
        Value : ["value test1"]
    },
    '00020000' :
    {
        vr : 'CS',
        Value : ["value test2"]
    },
    '00050000' : 
    {
        vr : 'CS',
        Value : ["value test5"]
    }
}

const dataset2 = {
    '00010000' : {
        vr : 'CS',
        Value : ["value test1"]
    },
    '00020000' :
    {
        vr : 'CS',
        Value : ["value test2"]
    },
    '00080000' : 
    {
        vr : 'CS',
        Value : ["value test8"]
    }
}

const dataset3 = {
    '00010000' : {
        vr : 'CS',
        Value : ["value test different"]
    },
    '00020000' :
    {
        vr : 'CS',
        Value : ["value test2 different"]
    },
    '00090000' : 
    {
        vr : 'CS',
        Value : ["value test9"]
    }
}

const dataset4 = {
    '00010000' : {
        vr : 'CS',
        Value : ["value test1"]
    },
    '00020000' :
    {
        vr : 'CS',
        Value : ["value test3"]
    },
    '00030000' : 
    {
        vr : 'CS',
        Value : ["value test8"]
    }
}

test('Shall deteermine if two lists are the same', () => {

    const dcm1 = new DicomDataset(dataset1 as any)
    const dcm2 = new DicomDataset(dataset2 as any)
    const dcm3 = new DicomDataset(dataset3 as any)

    const list1 = new DicomTagList(dcm1, tagDefinition)
    const list2 = new DicomTagList(dcm2, tagDefinition)
    const list3 = new DicomTagList(dcm3, tagDefinition)

    const same12 = list1.isEqual(list2)
    const same21 = list2.isEqual(list1)  

    expect(same12).toBe(same21)
    expect(same12).toBe(true)

    const same13 = list1.isEqual(list3)
    expect(same13).toBe(false)

    const same32 = list3.isEqual(list2)
    expect(same32).toBe(false)

  });

  test('it shall return the correct values', ()=>{
    const dcm1 = new DicomDataset(dataset1 as any)
    const list = new DicomTagList(dcm1, tagDefinition)
    const expected = [
        {name:'test1',value: 'value test1'},
        {name:'test2',value: 'value test2'}   
    ]
    let received = list.valueList.map((v)=>({name:v.name, value:v.value}))
    expect(received).toEqual(expected) 

  })
  
  test('shall merge properly',()=>{
    const dcm1 = new DicomDataset(dataset1 as any)
    const dcm2 = new DicomDataset(dataset4 as any)

    const list1 = new DicomTagList(dcm1, tagDefinition)
    const list2 = new DicomTagList(dcm2, tagDefinition)  

    expect(list1.valueList.length).toBe(2)
    expect(list2.valueList.length).toBe(3)

    list1.Merge(list2)
    expect(list1.valueList.length).toBe(3)

    expect(list1.valueList.find(v=>v.dcmTag===tagDefinition[0].tag)).toBeDefined()
    expect(list1.valueList.find(v=>v.dcmTag===tagDefinition[0].tag)?.otherValues).toStrictEqual([])
    expect(list1.valueList.find(v=>v.dcmTag===tagDefinition[1].tag)).toBeDefined()
    expect(list1.valueList.find(v=>v.dcmTag===tagDefinition[1].tag)?.otherValues).toStrictEqual(dataset4['00020000'].Value)
    expect(list1.valueList.find(v=>v.dcmTag===tagDefinition[2].tag)).toBeDefined()
    expect(list1.valueList.find(v=>v.dcmTag===tagDefinition[2].tag)?.otherValues).toStrictEqual([])
    expect(list1.valueList.find(v=>v.dcmTag===tagDefinition[2].tag)?.value).toBe(dataset4['00030000'].Value[0])

  })