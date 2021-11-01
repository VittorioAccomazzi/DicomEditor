
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    paper: {
        width:'100%'
    },
    avatar: {
        backgroundColor: blue[500],
        width: theme.spacing(4),
        height: theme.spacing(4),
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
    }
}))

export default useStyles;