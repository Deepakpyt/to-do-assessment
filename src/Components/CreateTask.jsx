import React, { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { TaskContext, ThemeContext } from '../App';


export const CreateTask = () => {
    const {theme} = useContext(ThemeContext);
    const { setTasks } = useContext(TaskContext);

    let bgColor = theme ? "bg-slate-700" : "bg-slate-100";
    let textColor = theme ? "text-amber-50" : "" ;

    const [task, setTask] = useState({
        id: "",
        name: "",
        status: "todo" /*or in progress or in closed */
    });

    console.log(task);

    const inputRef = useRef();
    // useRef to focusing on Input field.
    useEffect(() => {
        inputRef.current.focus();
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (task.name.length < 3) return toast.error("A task should have more then 3 characters.");
        
        if (task.name.length > 50) return toast.error("A task should not have more then 50 characters.");

        setTasks((prev) => {
            if(prev === null){
                return [task];
            }
            const list = [...prev, task];
            localStorage.setItem("tasks", JSON.stringify(list));
            return list;
        });

        toast.success("Task Created.")

        setTask({
            id: "",
            name: "",
            status: "todo"
        })
    }

    // console.log(tasks)

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' className={`border-2 border-slate-400 ${bgColor} ${textColor} rounded-md mr-4 h-12 w-64 px-1`}
                value={task.name}
                onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })} 
                ref={inputRef} />
            <button className='bg-cyan-400 rounded-md px-4 h-12 text-white'>Create</button>
        </form>
    )
}
