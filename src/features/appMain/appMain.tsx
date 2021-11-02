import React, {useState, useCallback} from 'react'
import { useDropzone } from "react-dropzone"
import { FileWithPath } from "file-selector";
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Typography from '@material-ui/core/Typography';
import DicomEditor, { DicomFilesInfo, Progress } from '../../dicom/DicomEditor';
import LinearProgressWithLabel from '../../components/linearProgressWithLabel';
import AppResults from './appResults';
import { numberOfFiles } from '../../common/utils';

const useStyles = makeStyles((theme) => ({
    root: {
            width:'100%',
            height:'100%',
            padding:'4px'
        },
        drop :{
            width:'100%',
            height:'100%',
            borderWidth:'2px',
            borderStyle: 'dotted',
            borderColor: theme.palette.primary.light,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            "&:hover": {
                borderColor: theme.palette.primary.dark
              },
            "& .AddIcn" :{
                fontSize:80,
                color: theme.palette.primary.light
            },
            "&:hover .AddIcn" :{
                fontSize:80,
                color: theme.palette.primary.dark
            },
            "& .text" :{
            textAlign:'center',
            color:theme.palette.primary.light 
            },
            "&:hover .text" :{
                textAlign:'center',
                color:theme.palette.primary.dark 
            }
        },
        noDisplay : {
            display:'none'
        }
    }))


    export default function AppMain(){
        const classes = useStyles();
        const [progress, setProgress] = useState<Progress>({done:0,total:0})
        const [dicomFilesInfo, setDicomFilesInfo] = useState<DicomFilesInfo|null>(null)
        const [error, setError] = useState<string|null>(null)

        const onDrop = useCallback(async (files: FileWithPath[]) =>  {
            setDicomFilesInfo(null)
            const progress  = (p:Progress)=>setProgress(p)
            const info = await DicomEditor.Extact(files, progress)
            if( numberOfFiles(info.patients)>0 ) {
                setDicomFilesInfo(info)
            } else {
                setError(`The ${files.length} selected are not valid DICOM files`)
            }
            setProgress({done:0,total:0})
        }, [setError, setProgress]) 

        const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

        return (
            <div className={classes.root}>
                    <div {...getRootProps()} className={classes.root} test-id='drop-div'>
                            <div className={ isDragActive ? classes.drop : classes.noDisplay} test-id='drop-active-div'>
                                <ArrowDownwardIcon className="AddIcn"/>
                                <Typography className="text">Drop the file here.</Typography>
                            </div> 
                            {
                                dicomFilesInfo !== null ?
                                <>
                                    <AppResults {...dicomFilesInfo} />
                                </> :
                                progress.total > 0 ?
                                <>
                                    <div className={classes.drop}>
                                        <Typography color='primary' variant='h2' className="text"> Loading ... </Typography>
                                        <LinearProgressWithLabel value={100*progress.done/progress.total} />
                                    </div>
                                </> :
                                <div className={isDragActive ? classes.noDisplay : classes.drop} test-id='drop-inactive-div'>
                                    <input {...getInputProps()} />
                                    <AddIcon className="AddIcn"/>
                                    {
                                        error !== null ?
                                        <>
                                            <Typography className="text">🖐 {error}</Typography>
                                        </> :
                                        <></>
                                    }   
                                    <>
                                        <Typography className="text">Drag and Drop here your DICOM file.</Typography>
                                        <Typography className="text">or click here to select the file.</Typography>
                                    </>
                                </div> 
                            }
                    </div>
            </div>
        )
    }
