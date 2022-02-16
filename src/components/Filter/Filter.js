import React, { useState } from "react";
import classes from "./Filter.module.css";

const Filter = (props) => {
    const [activeFilterState, setActiveFilterState] = useState('All');

    const onClickFilterHandler = (event) => {
        setActiveFilterState(event.target.id)
        props.onFilter(event.target.id)
    }

    return (
        <div className={classes.filter}>
            {props.items.map(item => 
                <div id={item.name} className={`${classes.item}  ${item.name === activeFilterState ? classes.active : ''}`} key={item.id} onClick={onClickFilterHandler}>
                    {item.name}
                </div>)}
        </div>
    )
}

export default Filter;