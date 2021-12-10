import React from 'react'
import { SeriesInfo } from '../../../dicom/DicomEditor';
import TagList from './tagList'
import VList from '../../../components/vList';
import {serAvatar} from '../../../AppStyle';
import Image from './image'


interface SeriesProp {
    series : SeriesInfo
}

export default function Series({series}:SeriesProp) {
    return (
        <TagList tags={series.tags} subItemText='Number of Images:' subItemNum={series.images.reduce((s,i)=>s+i.files.length,0)} avatarColor={`${serAvatar.color}`} avatarText={serAvatar.name}>
            <VList left={8} right={8} >
            {
                series.images.map((image,i) => <Image image={image} key={i} />)
            }
            </VList>
        </TagList>
    )
}

