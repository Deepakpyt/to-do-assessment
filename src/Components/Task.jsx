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

    const handleModify = useCallback((id) => {
        console.log(id);

        const  fTask = tasks.map((task) => {
            if (task.id === id){
                let name = prompt("Enter Modification Here:");
                if (name !== "" && name !== null) {
                    task.name = name;
                    toast("Task is Modified.", {icon: "📝"})
                  }
                return task;
            }
            return task;
        });

        localStorage.setItem("tasks", JSON.stringify(fTask));

        setTasks(fTask)
        
    }, [tasks, setTasks]);



    // console.log(tasks);
    return (
        <div className={`${bgColor} ${textColor} relative p-4 mt-8 shadow-md rounded-md cursor-grab ${isDragging ? "opacity-25" : ""}`} ref={drag}>
            <p>{task.name}</p>
            <button className={`absolute bottom-1 right-8 text-blue-700`} onClick={() => handleModify(task.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>

            </button>
            <button className={`absolute bottom-1 right-1 text-red-400`} onClick={() => handleRemove(task.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            </button>
        </div>
    )
}
