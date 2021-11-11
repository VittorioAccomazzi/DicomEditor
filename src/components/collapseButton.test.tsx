import { cleanup, render } from '@testing-library/react'
import React from 'react'
import CollapseButton from './collapseButton'

beforeEach(() => {
    // setup a DOM element as a render target
  });
  
  afterEach(()=>{
    cleanup()
    jest.clearAllMocks()
  })

test('shall default on close',()=>{
    const onExpand = ()=>{}
    const wrapper=render(<CollapseButton onExpand={onExpand}/>)
    const el = wrapper.getByRole('button') as HTMLButtonElement
    expect(el).toBeInTheDocument()
    expect(wrapper).toMatchSnapshot()
})

test('shall invoke callback',()=>{
    const onExpand = jest.fn()
    const wrapper=render(<CollapseButton onExpand={onExpand}/>)
    const el = wrapper.getByRole('button') as HTMLButtonElement
    el.click()
    expect(onExpand).toBeCalled()
    expect(onExpand).toBeCalledWith(true)
})