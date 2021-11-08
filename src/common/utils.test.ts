import wait, { fixDigit } from './utils'

test('wait', async()=>{
    const now = ()=>(new Date()).getTime()

    const waitTime = 500
    const start = now()
    await wait(waitTime)
    const end=now()

    expect((end-start)-waitTime).toBeLessThanOrEqual(50) // error of 10%
})
    

test('fix digit',()=>{
    const val1 = 8
    expect(fixDigit(val1,2)).toBe('08')
    const val2 = 8.1
    expect(fixDigit(val2,2)).toBe('08')
    const val3 = 88
    expect(fixDigit(val3,2)).toBe('88')
    const val4 = 882
    expect(fixDigit(val4,2)).toBe('882')

})