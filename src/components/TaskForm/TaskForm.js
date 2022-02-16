import { useRef, useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import classes from "./TaskForm.module.css";

const TaskForm = (props) => {
    const [isValid, setIsValid] = useState(null); 

    const taskInputRef = useRef();

    const onSubmitHandler = (event) =>{
        event.preventDefault();
        if(taskInputRef.current.value.length > 0){
            setIsValid(true);
            props.onSubmit(taskInputRef.current.value);
            taskInputRef.current.value = '';
        }else{
            setIsValid(false);
        }
    }

    return(
        <div className={classes['task-form-box']}>
            <form onSubmit={onSubmitHandler}>
                <div  className={classes['task-form']}>
                <Input ref={taskInputRef} onSubmit={onSubmitHandler}  isValid={isValid} placeholder="Add a task"></Input>
                <Button title='Send'></Button>
                </div>
            </form>
            {isValid === false && <div className={classes.error}>Add a valid task</div>}
        </div>
    );
}

export default TaskForm;