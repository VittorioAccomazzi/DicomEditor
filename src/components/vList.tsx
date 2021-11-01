import { Box } from "@material-ui/core";
import React from "react";


export interface VListProps {
    children: React.ReactNode,
    top? : number,
    bottom? : number,
    left? : number,
    right? : number
}
export default function VList({left, right, top, bottom, children}:VListProps) {
    top    = top ?? 0
    bottom = bottom ?? 0
    left   = left ?? 0
    right  = right ?? 0
    return (
        <Box sx={{display: 'flex', marginLeft: `${left}px`, marginRight: `${right}px`, marginTop:`${top}px`, marginBottom: `${bottom}px`, flexDirection:'column', alignItems: 'flexend', justifyContent:'center'}}>
            {children}
        </Box>
    )
}