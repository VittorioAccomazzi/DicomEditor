import { cleanup, fireEvent, render } from '@testing-library/react'
import { eventNames } from 'process'
import React from 'react'
import { DicomTagDefinition } from '../../../dicom/DicomTags'
import DicomTagValue from "../../../dicom/DicomTagValue"
import TagValue from './tagValue'

const tagDef : DicomTagDefinition = {
    name : "tag 1 name",
    tag : "00010010" 
}


beforeEach(() => {
    // setup a DOM element as a render target
  });
  
  afterEach(()=>{
    cleanup()
    jest.clearAllMocks()
  })
  
test('it shall report correct name and value',()=>{
    const tagValue = 'Value Tag 1'
    const tv = new DicomTagValue(tagDef, 'CS', tagValue)

    const wrapper = render(<TagValue tag={tv}/>)
    const textBox = wrapper.getByRole('textbox') as HTMLInputElement
    expect(textBox).toBeDefined()
    expect(textBox.value).toBe(tagValue) 
    expect(wrapper.getAllByText(tagDef.name)[0]).toBeInTheDocument()
})

test('it shall store the value set',()=>{
    const tagValue = 'Value Tag 1'
    const newValue = 'New Value'
    const tv = new DicomTagValue(tagDef, 'CS', tagValue)

    const wrapper = render(<TagValue tag={tv}/>)
    const textBox = wrapper.getByRole('textbox') as HTMLInputElement
    fireEvent.change(textBox,{target:{value:newValue}})
    expect(tv.isModified).toBeTruthy()
    expect(tv.value).toBe(newValue)
})