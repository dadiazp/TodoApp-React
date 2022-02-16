import React from "react";
import Filter from "../Filter/Filter";


const FilterItems = [
    {
        id: Math.floor(Math.random()*1000),
        name: 'All'
    }, 
    {
        id: Math.floor(Math.random()*1000),
        name: 'Active'
    }, 
    {
        id: Math.floor(Math.random()*1000),
        name: 'Completed'
    }
];

const Header = (props) => {
    const onFilterChangeHandler = (filter) => {
        props.onFilterTaskList(filter);
    }

    return (
        <div style={{textAlign:'center'}}>
            <h1>{props.title}</h1>
            <Filter onFilter={onFilterChangeHandler} items={FilterItems}/>
        </div>
    );
}

export default Header;