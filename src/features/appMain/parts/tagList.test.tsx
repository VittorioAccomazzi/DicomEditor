import { cleanup, render } from '@testing-library/react'
import React from 'react'
import { DicomTagDefinition } from '../../../dicom/DicomTags'
import DicomTagValue from '../../../dicom/DicomTagValue'
import DicomTagList from  '../../../dicom/DicomTagList'
import TagList from './tagList'

jest.mock('../../../dicom/DicomTagList',()=>{
    return jest.fn().mockImplementation((list)=>{
        return {
            valueList : list
        }
    });
});

const tagDef1 : DicomTagDefinition = {
    name : "tag 1 name",
    tag : "00010010" 
}
const tagDef2 : DicomTagDefinition = {
    name : "tag 2 name",
    tag : "00010020" 
}


beforeEach(() => {
    // setup a DOM element as a render target
  });
  
  afterEach(()=>{
    cleanup()
    jest.clearAllMocks()
  })
  
test('it shall display all names and values',()=>{
    const tagValue1 = 'Value Tag 1'
    const tagValue2 = 'Value Tag 2'
    const tv1 = new DicomTagValue(tagDef1, 'CS', tagValue1)
    const tv2 = new DicomTagValue(tagDef2, 'CS', tagValue2)
    const lst = new DicomTagList([tv1,tv2] as any, null as any) // using the mock implemenattiom above
    const wrapper = render(<TagList tags={lst} subItemText={`sub text`} subItemNum={1}><></></TagList>)
    const textBoxes = wrapper.getAllByRole('textbox') as HTMLInputElement[]
    expect(textBoxes.length).toBe(2)
    expect(textBoxes[0].value).toBe(tagValue1)
    expect(textBoxes[1].value).toBe(tagValue2)
    expect(wrapper.getByText('sub text')).toBeInTheDocument()
})
