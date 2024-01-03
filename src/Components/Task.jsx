import React, { useCallback, useContext } from 'react'
import toast from 'react-hot-toast'
import { TaskContext, ThemeContext } from '../App'
import { useDrag } from 'react-dnd'


export const Task = ({ task }) => {
    const {theme} = useContext(ThemeContext);
    const {tasks, setTasks} = useContext(TaskContext);

    let bgColor = theme ? 'bg-red-300':'';
    let textColor = theme ? 'text-amber-50' : '';

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: {id: task.id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))

    const handleRemove = useCallback((id) => {
        console.log(id);

        const  fTask = tasks.filter((task) => task.id !== id);

        localStorage.setItem("tasks", JSON.stringify(fTask));

        setTasks(fTask)
        
        toast("Task is deleted.", {icon: "🗑️"})
    }, [tasks, setTasks]);

    // console.log(tasks);
    return (
        <div className={`${bgColor} ${textColor} relative p-4 mt-8 shadow-md rounded-md cursor-grab ${isDragging ? "opacity-25" : ""}`} ref={drag}>
            <p>{task.name}</p>
            <button className={`absolute bottom-1 right-1 text-red-400`} onClick={() => handleRemove(task.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            </button>
        </div>
    )
}
