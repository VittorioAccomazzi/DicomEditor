
import React, {useState} from "react";
import { InputAdornment, TextField } from "@material-ui/core";
import DicomTagValue from "../../../dicom/DicomTagValue";
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import Tooltip from '@material-ui/core/Tooltip';

interface TagValueProps {
    tag : DicomTagValue
}
export default function TagValue({tag}:TagValueProps) {
    const [error, setError]=useState<boolean>(false)

    const onValueChange = (value:string)=>{
        let isValid = tag.setValue(value.trim())
        setError(!isValid)
    }
    const otherValues = tag.otherValues.join(',')
    return (
        <TextField
          id="standard-helperText"
          label={tag.name}
          defaultValue={tag.value ? tag.value: " "}
          variant="outlined"
          style={{width:'100%'}}
          onChange={(e)=>onValueChange(e.target.value)}
          error = {error}
          InputProps={{
            endAdornment: otherValues.length ? (
              <InputAdornment position="end">
                <Tooltip title={`other values : ${otherValues}`}>
                    <CommentOutlinedIcon />
                </Tooltip>
              </InputAdornment>
            ) : <></>,
          }}

        />
    )
}