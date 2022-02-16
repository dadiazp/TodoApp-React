import { Fragment } from "react";
import classes from './Button.module.css';

const Button = (props) => {
    return(
        <Fragment>
            {!props.isDeleteButton && <button className={classes['add-button']}>{props.title}</button>}
            {props.isDeleteButton && 
                <button className={classes['delete-all-button']} onClick={props.onDeleteAll}>{props.title}</button>
            }
        </Fragment>
    )
}

export default Button;