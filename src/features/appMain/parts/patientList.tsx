import React from 'react'
import { DicomTagGroup } from '../../../dicom/DicomEditor';
import Typography from "@material-ui/core/Typography";
import { Avatar, Collapse, Paper } from '@material-ui/core';
import useStyle from '../../../AppStyle'
import HList from '../../../components/hList'
import Patient from './patient';
import CollapseButton from '../../../components/collapseButton'
import VList from '../../../components/vList';


interface PatientListProps  {
    patients : DicomTagGroup[]
}

export default function PatientList( {patients}:PatientListProps){
    const [checked, setChecked] = React.useState(false);
    const classes = useStyle()
    return (
        <Paper elevation={3} className={`${classes.paper} ${classes.topBottomPadding}`} >
            <HList align='left'>
                <Avatar className={`${classes.avatar} ${classes.leftMargin} ${classes.rightMargin} ${classes.smallText}`}> Pat</Avatar>
                <CollapseButton onExpand={val=>setChecked(val)} size='large' className={classes.noPadding} />
                <Typography color='primary'>Number of Patients: </Typography>
                <Typography className={classes.boldtext}>{patients.length}</Typography>
            </HList>
            <Collapse in={checked}>
                <VList left={64} right={8} >
                    {
                        patients.map((pat,i) => <Patient data={pat} key={i} />)
                    }
                </VList>
            </Collapse>
        </Paper>
      );
}