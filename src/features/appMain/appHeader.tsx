import React, {useState} from 'react'
import Typography from '@material-ui/core/Typography';
import { Button, Checkbox, Paper } from '@material-ui/core';
import useStyle from '../../AppStyle'
import HList from '../../components/hList'

interface AppHeaderProps  {
    numDicomFiles : number,
    onDownload: (replaceUIDs:boolean) => void
}

export default function AppHeader( {numDicomFiles, onDownload }:AppHeaderProps){
    const [checked, setChecked ] = useState<boolean>(true)
    const classes = useStyle()
    const onCheck = ()=> setChecked((v)=>!v)
    const onClick = ()=> onDownload(checked)
    return(
        <Paper elevation={3} className={classes.paper} >
            <HList align='center'>
                <Typography color='primary'>Number of Image Files: </Typography>
                <Typography className={`${classes.boldtext} ${classes.rightMargin}`}>{numDicomFiles}</Typography>
                <Checkbox checked={checked} color="primary" className={`${classes.noPadding} ${classes.leftMargin}`} onClick={onCheck} />
                <Typography color='primary' className={classes.rightMargin}> replace current UIDs</Typography>
                <Button variant="contained" color="primary" className={`${classes.topBottomMarging} ${classes.leftMargin}`} onClick={onClick}>  Download Images </Button>
            </HList>
        </Paper>
    )
}