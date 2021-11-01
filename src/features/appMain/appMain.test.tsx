
import React from 'react';
import { cleanup, render } from '@testing-library/react'
import * as reactDropzone from "react-dropzone"
import AppMain from './appMain'

beforeEach(() => {
  // setup a DOM element as a render target
});

afterEach(()=>{
  cleanup()
  jest.clearAllMocks()
})

test('render the main app',()=>{
    const {container} =  render(<AppMain/>)
    expect(container.innerHTML).toMatchSnapshot()
})

test('check correct message displayed',async ()=>{
    render(<AppMain/>)

    const activeDiv = document.querySelector('[test-id=drop-active-div]')!
    const inactivDiv= document.querySelector('[test-id=drop-inactive-div]')!

    expect(activeDiv.className).toContain('noDisplay') 
    expect(inactivDiv.className).toContain('drop')
})

test('check on drag the correct message is displayed',async()=>{

  const orguse = reactDropzone.useDropzone
  jest.spyOn(reactDropzone,'useDropzone').mockImplementation(()=>({ ...orguse(), isDragActive : true}))

  render(<AppMain/>)

  const activeDiv = document.querySelector('[test-id=drop-active-div]')!
  const inactivDiv= document.querySelector('[test-id=drop-inactive-div]')!

  expect(activeDiv.className).toContain('drop') 
  expect(inactivDiv.className).toContain('noDisplay')
})
