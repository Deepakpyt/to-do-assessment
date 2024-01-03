import { useState, useEffect, createContext } from 'react';
import { CreateTask } from './Components/CreateTask';
import { ListTasks } from './Components/ListTasks';
import { Toaster } from 'react-hot-toast';
import { ToggelTheme } from './Components/ToggelTheme';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const TaskContext = createContext();
export const ThemeContext = createContext();

const light = "rgb(241 245 249)";
const dark = "rgb(30 41 59)";
function App() {
  const [theme, setTheme] = useState(false);
  const [tasks, setTasks] = useState([]);
  console.log("tasks", tasks);

  const toggelTheme = () => {
    setTheme(prevMode => !prevMode);
  }
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);
  useEffect(() => {
    document.body.style.backgroundColor = theme ? dark : light;
  }, [theme]); // run the effect when the theme changes  

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <ThemeContext.Provider value={{ theme, toggelTheme }}>
        <ToggelTheme />
        <TaskContext.Provider value={{ tasks, setTasks }} >
          <div className="flex flex-col items-center p-3 pt-20 gap-16">
            <CreateTask />
            <ListTasks />
          </div>
        </TaskContext.Provider>
      </ThemeContext.Provider>
    </ DndProvider>

  );
}

export default App;
