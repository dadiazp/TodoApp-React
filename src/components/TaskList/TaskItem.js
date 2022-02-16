import trashIcon from '../../assets/trash.png';
import classes from './TaskItem.module.css';

const COMPLETED_STATUS = 'Completed';

const TaskItem = (props) => {
    let checkedItem = {}

    if(props.item.status === COMPLETED_STATUS){
        checkedItem = {
            checked: 'checked'
        };
    }else{
        checkedItem = {
            checked: ''
        };       
    }

    const onChangeHandler = (event) =>{
        props.onChangeStatus(event);
    }

    const onClickHandler = (id) =>{
        props.onRemoveTask(id);
    }

    return(
        <li>
           <div className={classes['list-container']}>
                <div className={classes['item-container']}>
                    <input type="checkbox" {...checkedItem} id={props.item.id} onChange={onChangeHandler}></input>
                    {checkedItem.checked === 'checked' && 
                        <>
                            <del>{props.item.name}</del>
                        </>
                    }
                    {checkedItem.checked !== 'checked' && 
                        <>
                            <span>{props.item.name}</span>
                        </>
                    }
               </div>
               <div className={classes['icon-container']}>
                 <img src={trashIcon} alt='Delete' className={classes.icon} onClick={onClickHandler}></img>
               </div>
           </div>
        </li>
    );
}

export default TaskItem;