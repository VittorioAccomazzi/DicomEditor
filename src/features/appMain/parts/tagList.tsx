import React from 'react'
import Typography from "@material-ui/core/Typography";
import { Collapse, Grid, Paper } from '@material-ui/core';
import useStyle from '../../../AppStyle'
import HList from '../../../components/hList'
import CollapseButton from '../../../components/collapseButton'
import TagValue from './tagValue';
import VList from '../../../components/vList'
import DicomTagList from '../../../dicom/DicomTagList';

interface TagListProp {
    tags: DicomTagList,
    subItemText : string,
    subItemNum  : number, 
    children: React.ReactNode
}

export default function TagList({tags, subItemText, subItemNum, children}:TagListProp){
    const [collapsed, setCollapsed] = React.useState(false);
    const classes = useStyle()
    return (
        <Paper elevation={2} className={`${classes.paper} ${classes.topBottomPadding}, ${classes.topBottomMarging}`} >
            <VList left={8} right={8} top={8} bottom={0}>
                <Grid container spacing={1}>
                    { tags.valueList.filter(v=>!v.isHidden).map ((v,index) => (
                        <Grid item xs={8} sm={4} md={2} xl={2} key={index}>
                            <TagValue tag={v}/>
                        </Grid>
                    ))}
                </Grid>
                <HList align='left'>
                    <Typography color='primary' className={`${classes.smallText} ${classes.leftMargin}`}>{subItemText}</Typography>
                    <Typography color='primary' className={`${classes.boldtext} ${classes.smallText}`}>{subItemNum}</Typography>
                    <CollapseButton onExpand={(value)=>setCollapsed(value)} className={classes.noPadding}/>
                </HList>
                <Collapse in={collapsed}>
                    {children}
                </Collapse>
            </VList> 
        </Paper>
    )
}