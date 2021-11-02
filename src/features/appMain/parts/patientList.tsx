import React from 'react'
import { Paper } from '@material-ui/core';
import useStyle from '../../../AppStyle'
import Patient from './patient';
import VList from '../../../components/vList';
import { PatientInfo } from '../../../dicom/DicomEditor';

interface PatientListProp {
    patients : PatientInfo[]
}

export default function PatientList( {patients} : PatientListProp){
    const classes = useStyle()
    return (
        <Paper elevation={3} className={`${classes.paper} ${classes.topBottomPadding}`} >
            <VList left={8} right={8} >
                {
                    patients.map((pat,i) => <Patient patient={pat} key={i} />)
                }
            </VList>
        </Paper>
      );
}