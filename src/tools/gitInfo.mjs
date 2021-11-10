import * as fs from 'fs';
import * as cp from 'child-process-promise';

( async () =>{

    let gitInfo = {
        version : "developer",
        long : ""
    }

    try
    {
        let short = await cp.exec('git rev-parse --short HEAD')
        let long  = await cp.exec('git rev-parse HEAD')
        let stat  = await cp.exec('git status')

        let status = stat.stdout;
        let isRel  = status.indexOf("nothing to commit, working tree clean") > 0;
        if( isRel ){
            gitInfo.version = short.stdout;
            gitInfo.long= long.stdout; 
        }
        fs.writeFileSync('src/Tools/gitInfo.json', JSON.stringify(gitInfo));
    } catch ( ex ){
        console.error( "Unable to get git info :"+ex.message)
    }

})();