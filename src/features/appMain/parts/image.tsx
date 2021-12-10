import React from 'react'
import Typography from "@material-ui/core/Typography";
import { ImageInfo } from '../../../dicom/DicomEditor';
import useStyle from '../../../AppStyle';
import TagList from './tagList'


interface ImageProp {
    image : ImageInfo
}

export default function Series({image}:ImageProp) {
    const classes = useStyle()
    return (
        <TagList tags={image.tags} subItemText='Number of Files:' subItemNum={image.files.length} avatarColor={`${classes.avatarImage}`} avatarText='Img'>
            <Typography color='primary' className={`${classes.smallText} ${classes.leftMargin}`} style={{textAlign:'left'}} >
                {image.files.map((f,i)=>`${i>0 ? ', ': ''}${f.name}`)} 
            </Typography>
        </TagList>
    )
}