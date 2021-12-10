import React from 'react'
import VList from '../../../components/vList';
import { StudyInfo } from '../../../dicom/DicomEditor';
import Series from './series';
import useStyle from '../../../AppStyle';
import TagList from './tagList'

interface StudyProp {
    study : StudyInfo
}

export default function Study({study}:StudyProp) {
    const classes = useStyle()
    return(
        <TagList tags={study.tags} subItemText='Number of Series:' subItemNum={study.series.length} avatarColor={`${classes.avatarStudy}`}  avatarText='Stu'>
            <VList left={8} right={8} >
            {
                study.series.map((series,i) => <Series series={series} key={i} />)
            }
            </VList>
        </TagList>
    )
}