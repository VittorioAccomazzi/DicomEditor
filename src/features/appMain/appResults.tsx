
import React,  { useCallback, useState }  from 'react'
import { DicomFilesInfo, Progress } from '../../dicom/DicomEditor';
import { Container } from '@material-ui/core';
import AppHeader from './appHeader';
import PatientList from './parts/patientList';
import DicomEditor from '../../dicom/DicomEditor'
import wait from '../../common/utils'

const safeDownloadDelay=300
type AppResultParam = DicomFilesInfo

export default function AppResults (dcmInfo:AppResultParam) {
    const [downloading, setDownloading]=useState<boolean>(false)
    const [progress, setProgress]=useState<Progress>({done:0, total:0})

    const onDownload = useCallback((replaceUID:boolean)=>{
        setDownloading(true)
        const cleanUp=(url:string) => setTimeout(()=>URL.revokeObjectURL(url),1000)
        DicomEditor.Modify(dcmInfo, async (image:ArrayBuffer, progress : Progress )=>{
            var blob = new Blob([image], {type: 'application/octet-stream'});
            const bURL = URL.createObjectURL(blob)
            let link = document.createElement('a') 
            link.setAttribute('download', `IMG${progress.done}.dcm`)
            link.setAttribute('href', bURL)
            link.click() 
            cleanUp(bURL)
            setProgress(progress)
            if( progress.done === progress.total){
                // completed
                setDownloading(false)
            }
            // 🖐 unfortunately the delay below is stricly necessary otherwise Chrome will be
            // overwelmed and will not save all the images being downloaded.
            await wait(safeDownloadDelay)
        })

    },[setProgress,dcmInfo])

    return (
        <Container maxWidth='xl'>
            {
                downloading ?
                <>
                    <div>{`downloading ${progress.done}/${progress.total}`}</div>
                </>:
                <>
                    <AppHeader numDicomFiles={dcmInfo.files.length} onDownload={onDownload} />
                    <PatientList patients={dcmInfo.patients}/>
                </>
            }

        </Container>
    )

}