import React from 'react'
import { DicomTagGroup } from '../../../dicom/DicomEditor';
import Typography from "@material-ui/core/Typography";
import { Collapse, Grid, Paper } from '@material-ui/core';
import useStyle from '../../../AppStyle'
import HList from '../../../components/hList'
import CollapseButton from '../../../components/collapseButton'
import TagValue from './tagValue';
import VList from '../../../components/vList'


interface PatientPros {
    data : DicomTagGroup
}
export default function Patient({data}:PatientPros){
    const [collapsed, setCollapsed] = React.useState(false);
    const handleExpandClick = (value:boolean) => {
        setCollapsed(value);
      };
    const classes = useStyle()
    return (
        <Paper elevation={2} className={`${classes.paper} ${classes.topBottomPadding}, ${classes.topBottomMarging}`} >
            <VList left={8} right={8} top={8} bottom={0}>
                <Grid container spacing={1}>
                    { data.tagList.valueList.map ((v,index) => (
                        <Grid item xs={8} sm={4} md={2} xl={1} key={index}>
                            <TagValue tag={v}/>
                        </Grid>
                    ))}
                </Grid>
                <HList align='left'>
                    <Typography color='primary' className={`${classes.smallText} ${classes.leftMargin}`}>Number of Files: </Typography>
                    <Typography color='primary' className={`${classes.boldtext} ${classes.smallText}`}>{data.files.length}</Typography>
                    <CollapseButton onExpand={handleExpandClick} className={classes.noPadding}/>
                </HList>
                <Collapse in={collapsed}>
                    <Typography color='primary' className={`${classes.smallText} ${classes.leftMargin}`} style={{textAlign:'left'}} >
                        {data.files.map(f=>f.name).join(', ') }
                    </Typography>
                </Collapse>
            </VList>
        </Paper>
    )
}

