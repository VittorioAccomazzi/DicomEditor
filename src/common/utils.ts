export default async function wait(ms:number) : Promise<void> {
    return new Promise((res)=>{ setTimeout(res,ms)  })
}