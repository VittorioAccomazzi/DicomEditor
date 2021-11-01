import DicomTagList from  './DicomTagList'
import { DicomTagDefinition } from './DicomTags';


const tagDefinition : DicomTagDefinition [] = [
    {
        name : "test1",
        tag :  "00010000"
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
        Value : ["value test1"]
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

test('Shall deteermine if two lists are the same', () => {

    const list1 = new DicomTagList(dataset1, tagDefinition)
    const list2 = new DicomTagList(dataset2, tagDefinition)
    const list3 = new DicomTagList(dataset3, tagDefinition)

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
    const list = new DicomTagList(dataset1, tagDefinition)
    const expected = [
        {name:'test1',value: 'value test1'},
        {name:'test2',value: 'value test2'}   
    ]
    let received = list.valueList.map((v)=>({name:v.name, value:v.value}))
    expect(received).toEqual(expected) 

  })
  