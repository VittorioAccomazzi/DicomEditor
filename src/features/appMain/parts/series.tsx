import React from 'react'
import { SeriesInfo } from '../../../dicom/DicomEditor';
import TagList from './tagList'
import VList from '../../../components/vList';
import useStyle from '../../../AppStyle';
import Image from './image'


interface SeriesProp {
    series : SeriesInfo
}

export default function Series({series}:SeriesProp) {
    const classes = useStyle()
    return (
        <TagList tags={series.tags} subItemText='Number of Images:' subItemNum={series.images.reduce((s,i)=>s+i.files.length,0)} avatarColor={`${classes.avatarSeries}`} avatarText='Ser'>
            <VList left={8} right={8} >
            {
                series.images.map((image,i) => <Image image={image} key={i} />)
            }
            </VList>
        </TagList>
    )
}

