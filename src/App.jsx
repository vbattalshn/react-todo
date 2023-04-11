import { useEffect ,useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

function App() {
  const [animationParent] = useAutoAnimate()
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState('');

  useEffect(() => {
    getTodos();
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      switchTheme("dark")
    }
  }, []);


  useEffect(() => {
    var html = document.querySelector("html");
    if(theme == "light"){
      html.classList.remove("dark")
    }else{
      html.classList.add("dark")
    }

    localStorage.setItem("theme", theme);
  }, [theme])
  
  useEffect(() => {
    saveTodos();
  }, [todos]);    

  function addTodo() {
    if(todo !== ''){
      setTodos([...todos, todo]);
      setTodo(''); 
    }
  }
  
  function deleteTodo(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }
  
  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  function getTodos() {
    if(localStorage.getItem("todos")){
      setTodos([...JSON.parse(localStorage.getItem("todos"))]);
    }
  }

  function switchTheme(mode) {
    setTheme(mode);
  }

  return (
    <div className="max-w-screen-md flex flex-col p-4 mx-auto my-0 gap-4">
      <div className="flex gap-2 z-10">
        <input value={todo} onChange={e => setTodo(e.target.value)} id="todo" name="todo" type="text" className="shadow-inner px-4 py-2 font-medium text-slate-700 dark:text-slate-200 text-base bg-gray-50 dark:bg-gray-800 flex-1 rounded-lg flex border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500/50 focus:outline-none transition-all" placeholder='Todo' />
        <button onClick={addTodo} type="submit" className=" rounded-md bg-indigo-500 px-4 py-2 text-base font-semibold text-slate-200 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 active:scale-95 active:ring active:ring-indigo-500/50 transition-all ">Save</button>
      </div>
      <ul ref={animationParent} className="border border-slate-300 dark:border-gray-600 bg-slate-50 dark:bg-slate-800 rounded-lg overflow-hidden">
        {todos.length > 0 ? (
          todos.map((todoItem, index) => (
            <li key={index} className='py-2 px-4 flex justify-between items-center border-b border-slate-300 dark:border-gray-600 last:border-none'>
              <div className="font-medium text-slate-800 dark:text-slate-100 overflow-hidden">
                {todoItem}
              </div>
              <button onClick={() => deleteTodo(index)} className="w-6 h-6 rounded-lg transition-all text-slate-600 dark:text-slate-400 font-medium hover:text-red-500 focus:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>  
              </button>
            </li>
          ))
        ) : (
          <li className="text-center py-2 px-4 font-medium text-slate-800 dark:text-slate-100 ">No todos to display.</li>
        )}
      </ul>
      <button onClick={() => switchTheme(theme == 'light' ? "dark" : "light" )} className="w-12 h-12 flex p-3 border text-slate-800 dark:text-slate-100 border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 rounded-full right-3 bottom-3 fixed">
        {
          theme == 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-full h-full" viewBox="0 0 16 16">
              <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-full h-full" viewBox="0 0 16 16">
              <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
            </svg>
          )
        }
      </button>
    </div>
  )
}

export default App
