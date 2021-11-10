import React from "react";
import gitVersion from '../../tools/gitInfo.json'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    version: {
        position: 'fixed', 
        left: '2px', 
        bottom: '0px',
        fontSize : '12px',
        color : theme.palette.primary.main,
        transform: 'rotate(-90deg)',
        transformOrigin: '0 0'
    },
    ribbon :{
        position: 'fixed', 
        right: '0px', 
        top: '0px'
    }
}))


type gitInfoProps = { label : string, baseURL? : string, forkme : Boolean }

const  AppVersion = ({label, baseURL, forkme}:gitInfoProps) => {
        const classes = useStyles();
        const handleClick = () => {
            if( baseURL && gitVersion.long !== "" )  window.location.href = baseURL+'/tree/'+gitVersion.long;
        }
        return ( 
            <>
            {forkme && baseURL && (
                <div className={classes.ribbon}> 
                    <a href={baseURL}>
                        <img width="100" height="100" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_red_aa0000.png?resize=100%2C100" alt="Fork me on GitHub"/>
                    </a>
                </div>
            ) }
            <div className={classes.version} onClick={handleClick}>
                <p>{label + gitVersion.version}</p>
            </div>
            </>
        )
}

export default AppVersion;