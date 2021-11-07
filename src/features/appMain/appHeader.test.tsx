
import React from 'react';
import { cleanup, render } from '@testing-library/react'
import AppHeader from './appHeader'

beforeEach(() => {
  // setup a DOM element as a render target
});

afterEach(()=>{
  cleanup()
  jest.clearAllMocks()
})

test('rendering',()=>{
    const onDownload = ()=> { throw new Error('Function not implemented.');}

    const {container} =  render(<AppHeader numDicomFiles={50} onDownload={onDownload}/>)
    expect(container.innerHTML).toMatchSnapshot()
})