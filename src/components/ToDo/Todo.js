import { useEffect, useReducer, useState } from "react";
import Header from "../Header/Header";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";
import Button from "../UI/Button";
import classes from "./Todo.module.css";

const ACTIVE_STATUS = 'Active';
const COMPLETED_STATUS = 'Completed';

const taskReducer = (state, action) => {
    if(action.type === 'INIT'){
        return JSON.parse(action.tasks)
    }
    if(action.type === 'ADD'){
        const newTask = {
            id: Math.floor(Math.random()*1000),
            name: action.task,
            status: ACTIVE_STATUS
        }
        const updatedTaskList = [...state, newTask];
        localStorage.setItem('tasks', JSON.stringify(updatedTaskList));
        return updatedTaskList;
    }
    if(action.type === 'UPDATE_STATE'){
        const existingTaskIndex = state.findIndex(task => task.id === +action.id);
        const existingTask = state[existingTaskIndex];
        const updatedTask = {
            ...existingTask,
            status: action.checked ? COMPLETED_STATUS : ACTIVE_STATUS
        };
        let updatedTasksList = [...state];

        updatedTasksList[existingTaskIndex] = updatedTask;
        localStorage.setItem('tasks', JSON.stringify(updatedTasksList));
        return updatedTasksList;
    }
    if(action.type === 'REMOVE'){
        const updatedTaskList = state.filter(task => task.id !== action.id);
        localStorage.setItem('tasks', JSON.stringify(updatedTaskList));
        return updatedTaskList;
    }
    if(action.type === 'DELETE_ALL'){
        const updatedTaskList = [];
        localStorage.setItem('tasks', JSON.stringify(updatedTaskList));
        return updatedTaskList;
    }

    return [];
}

const Todo = () => {
    const [taskState, dispatchTaskAction] = useReducer(taskReducer, [])
    const [filterState, setFilterState] = useState('All');

    useEffect(() => {
        const registeredTaskList = localStorage.getItem('tasks') ? localStorage.getItem('tasks') : '[]';
        if(JSON.parse(registeredTaskList).length > 0){
            dispatchTaskAction({type: 'INIT', tasks: registeredTaskList})
        }
    }, []);

    const onSubmitHandler = (task) => {
        dispatchTaskAction({type: 'ADD', task: task})
    }

    const onFilterTaskListHandler = (filter) => {
        setFilterState(filter);
    };

    const onChangeStatusHandler = (event) => {
        dispatchTaskAction({type: 'UPDATE_STATE', id: event.target.id, checked: event.target.checked})    
    }

    const onRemoveTaskHandler = (id) => {
        dispatchTaskAction({type: 'REMOVE', id: id})
    }

    const onDeleteAllHandler = () =>{
        dispatchTaskAction({type: 'DELETE_ALL'})
    }

    const filteredTasks = taskState.filter(task => {
        if(filterState !== 'All'){
            return task.status === filterState
        }
        return taskState;
    });

    return (
        <div className={classes.todo}>
            <Header onFilterTaskList={onFilterTaskListHandler} title = '#ToDo'></Header>
            <TaskForm onSubmit={onSubmitHandler}></TaskForm>
            <div className={{'marginTop': '20px'}}>
                <TaskList tasks={filteredTasks} onChangeStatus={onChangeStatusHandler} onRemoveTask={onRemoveTaskHandler}></TaskList>
            </div>
            {filteredTasks.length > 0 && <Button title={'Delete all'} isDeleteButton={true} onDeleteAll={onDeleteAllHandler}></Button>}
        </div>
    );
}

export default Todo;