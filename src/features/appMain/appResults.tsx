
import React,  { useCallback, useState }  from 'react'
import { DicomFilesInfo, ProcessStages, Progress } from '../../dicom/DicomEditor';
import { Container, Typography } from '@material-ui/core';
import useStyle from '../../AppStyle'
import AppHeader from './appHeader';
import PatientList from './parts/patientList';
import DicomEditor from '../../dicom/DicomEditor'
import { numberOfFiles } from '../../common/utils'
import LinearProgressWithLabel from '../../components/linearProgressWithLabel';

type AppResultParam = DicomFilesInfo
const processingLabel = "Processing ..."
const zippingLabel = "Zipping ..."

export default function AppResults (dcmInfo:AppResultParam) {
    const [label, setLabel]=useState<string>(processingLabel)
    const [downloading, setDownloading]=useState<boolean>(false)
    const [progress, setProgress]=useState<Progress>({done:0, total:0})
    const classes = useStyle()

    const onDownload = useCallback((replaceUID:boolean)=> {
        setDownloading(true)
        const cleanUp=(url:string) => setTimeout(()=>URL.revokeObjectURL(url),1000)
        DicomEditor.Modify(dcmInfo, replaceUID,  (mode :ProcessStages, progress : Progress )=>{
            setLabel( mode === 'processing' ? processingLabel : zippingLabel)
            setProgress(progress)
        }).then((zip:ArrayBuffer)=>{
            var blob = new Blob([zip], {type: 'application/octet-stream'});
            const bURL = URL.createObjectURL(blob)
            let link = document.createElement('a') 
            link.setAttribute('download', `images.zip`)
            link.setAttribute('href', bURL)
            link.click() 
            cleanUp(bURL)
            setDownloading(false)
        })

    },[setProgress,setLabel,dcmInfo])

    return (
        <Container maxWidth='xl'>
            {
                downloading ?
                <>
                    <div className={classes.fullPage}>
                        <Typography color='primary' variant='h2' className="text"> {label} </Typography>
                        <LinearProgressWithLabel value={100*progress.done/progress.total} />
                    </div>
                </>:
                <>
                    <AppHeader numDicomFiles={numberOfFiles(dcmInfo.patients)} onDownload={onDownload} />
                    <PatientList patients={dcmInfo.patients}/>
                </>
            }

        </Container>
    )

}