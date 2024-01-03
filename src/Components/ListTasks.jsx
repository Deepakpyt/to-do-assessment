import React, { useContext, useEffect, useState } from 'react'
import { Section } from './Section';
import { TaskContext } from '../App';

export const ListTasks = () => {

  const {tasks} = useContext(TaskContext);

    const [todos, setTodos] = useState([]);
    const [inProgress, setInprogrss] = useState([]);
    const [closed, setClosed] = useState([]);

    useEffect(() => {
        const ftodos = tasks.filter(task => task.status === 'todo');
        const finProgress = tasks.filter(task => task.status === 'in progress');
        const fclosed = tasks.filter(task => task.status === 'closed');

        setTodos(ftodos);
        setInprogrss(finProgress);
        setClosed(fclosed);

    },[tasks]);

    const status = ["todo", "in progress", "closed"];


  return (
    <div className='flex flex-wrap gap-16'>
        {/* <h2>List Items</h2> */}
        {status.map((status, index) => {
            return <Section key={index} status={status} todos={todos} inProgress={inProgress} closed={closed} />
        })}
    </div>
  )
}
