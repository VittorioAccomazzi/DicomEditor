import { Box } from "@material-ui/core";
import React from "react";


export interface HListProps {
    align : 'left'| 'center' | 'right',
    children: React.ReactNode
}
export default function HList({align, children}:HListProps) {
    return (
        <Box sx={{  display: 'flex', width: '100%', alignItems: 'center', marginTop:'4px', marginBottom:'4px', justifyContent:`${align}` }}>
            {children}
        </Box>
    )
}