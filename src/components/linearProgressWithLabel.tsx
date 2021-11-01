import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import { withStyles } from '@material-ui/core';

const ThickLinearProgress = withStyles({
  root: {
    height: 12,
    borderRadius: 20
  },
  bar: {
    borderRadius: 20,
  },
})(LinearProgress);

export default function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{  display: 'flex', width: '80%', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <ThickLinearProgress variant="determinate" {...props}/>
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography className="text">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}