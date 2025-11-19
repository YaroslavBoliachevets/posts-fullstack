import React from "react";
import classes from './myInput.module.css'

function MyInput (props) {
    return (
        <input {...props} className={classes.myInput}/>
    )
}

export default MyInput;