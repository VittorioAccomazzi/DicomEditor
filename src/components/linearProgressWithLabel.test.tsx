
import React from 'react';
import { cleanup, render } from '@testing-library/react'
import LinearProgressBarWithLabel from './linearProgressWithLabel'

beforeEach(() => {
  // setup a DOM element as a render target
});

afterEach(()=>{
  cleanup()
  jest.clearAllMocks()
})

test('rendering',()=>{
    const {container} =  render(<LinearProgressBarWithLabel value={50}/>)
    expect(container.innerHTML).toMatchSnapshot()
})