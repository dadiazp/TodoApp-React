import React from "react";
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
    return (
        <div className={classes.box}>
            <input ref={ref} className={`${classes.input} ${props.isValid === false ? classes.invalid : ''}`} placeholder={props.placeholder}></input>
        </div>

    );
});

export default Input;