
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
    const {container} =  render(<AppHeader numDicomFiles={50}/>)
    expect(container.innerHTML).toMatchSnapshot()
})