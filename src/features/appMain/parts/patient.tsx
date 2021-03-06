import React from 'react'
import VList from '../../../components/vList'
import { PatientInfo } from '../../../dicom/DicomEditor';
import Study from './study';
import {patAvatar} from '../../../AppStyle';
import TagList from './tagList'

interface PatientProp {
    patient : PatientInfo
}

export default function Patient({patient}:PatientProp){
    return (
        <TagList tags={patient.tags} subItemText='Number of Studies:' subItemNum={patient.studies.length} avatarColor={`${patAvatar.color}`}  avatarText={patAvatar.name}>
            <VList left={8} right={8} >
            {
                patient.studies.map((study,i) => <Study study={study} key={i} />)
            }
            </VList>
        </TagList>
    )
}

