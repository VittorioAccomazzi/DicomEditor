import wait from './utils'

test('wait', async()=>{
    const now = ()=>(new Date()).getTime()

    const waitTime = 500
    const start = now()
    await wait(waitTime)
    const end=now()

    expect((end-start)-waitTime).toBeLessThanOrEqual(50) // error of 10%
})
    