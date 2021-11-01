
import React, {useState,useEffect} from "react";
import { TextField } from "@material-ui/core";
import DicomTagValue from "../../../dicom/DicomTagValue";


interface TagValueProps {
    tag : DicomTagValue
}
export default function TagValue({tag}:TagValueProps) {
    const [error, setError]=useState<boolean>(false)

    const onValueChange = (value:string)=>{
        let isValid = tag.setValue(value.trim())
        setError(!isValid)
    }
    
    return (
        <TextField
          id="standard-helperText"
          label={tag.name}
          defaultValue={tag.value ? tag.value: " "}
          variant="outlined"
          style={{width:'100%'}}
          onChange={(e)=>onValueChange(e.target.value)}
          error = {error}
        />
    )
}