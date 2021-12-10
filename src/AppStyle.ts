
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    paper: {
        width:'100%'
    },
    boldtext: {
        fontWeight:'bolder', 
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    smallText:{
        fontSize: 'small'
    },
    noPadding:{
        padding:'0px'
    },
    rightMargin:{
        marginRight:theme.spacing(2),
    },
    leftMargin:{
        marginLeft:theme.spacing(2),
    },
    topBottomMarging :{
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    topBottomPadding :{
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
    },
    fullPage :  {    
        position: 'absolute',
        top : '0px',
        left:'0px',  
        width:'100%',
        height:'100%',
        borderWidth:'2px',
        borderStyle: 'solid',
        borderColor: theme.palette.primary.light,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    avatarPatient : {
        backgroundColor:blue[500]
    },
    avatarStudy : {
        backgroundColor:blue[400]
    },
    avatarSeries : {
        backgroundColor:blue[300]
    },
    avatarImage : {
        backgroundColor:blue[200]
    }
}))

export default useStyles;