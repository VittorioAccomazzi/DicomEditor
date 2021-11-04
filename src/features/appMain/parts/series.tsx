import React from 'react'
import Typography from "@material-ui/core/Typography";
import { SeriesInfo } from '../../../dicom/DicomEditor';
import useStyle from '../../../AppStyle';
import TagList from './tagList'


interface SeriesProp {
    series : SeriesInfo
}

export default function Series({series}:SeriesProp) {
    const classes = useStyle()
    return (
        <TagList tags={series.tags} subItemText='Number of Files:' subItemNum={series.files.length}>
            <Typography color='primary' className={`${classes.smallText} ${classes.leftMargin}`} style={{textAlign:'left'}} >
                {series.files.map((f,i)=>`${i>0 ? ', ': ''}${f.name}`)} 
            </Typography>
        </TagList>
    )
}