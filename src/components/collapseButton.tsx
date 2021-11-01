import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      }
}));

interface CollapseButtonProps {
    onExpand : (isOpen:boolean)=>void,
    className?: string
    size? : 'large' | 'small' | 'medium'
}
export default function  CollapseButton ({onExpand,className,size}:CollapseButtonProps) {
    const [checked, setChecked] = React.useState(false);
    const classes = useStyles()
    const handleExpandClick = () => {
        onExpand(!checked)
        setChecked(!checked);
      };
    return (
        <IconButton
            className={clsx(classes.expand+' '+className, {
                [classes.expandOpen]: checked,
            })}
            onClick={handleExpandClick}
            aria-expanded={checked}
            aria-label="show more"
        >
          <ExpandMoreIcon color='primary' fontSize={size}/>
        </IconButton>
    )
}



