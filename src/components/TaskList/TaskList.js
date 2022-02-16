import React from "react";
import TaskItem from "./TaskItem";
import classes from './TaskList.module.css';

const TaskList = (props) => {
    return(
        <ul className={classes['task-list']}>
            {props.tasks.map(item => <TaskItem item={item} key={item.id} onChangeStatus={props.onChangeStatus} onRemoveTask={props.onRemoveTask.bind(null, item.id)}></TaskItem>)}
        </ul>
    );
}

export default TaskList;