
import { makeStyles } from '@material-ui/core/styles';

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
    }
}))

export const patAvatar = {
    name : "Pat",
    color: "#2196f3"
}

export const stuAvatar = {
    name : "Stu",
    color: "#42a5f5"  
}

export const serAvatar = {
    name : "Ser",
    color: "#64b5f6"  
}

export const imgAvatar = {
    name : "Img",
    color: "#90caf9"  
}

export default useStyles;