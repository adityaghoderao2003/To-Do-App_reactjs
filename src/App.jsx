import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Home from './components/Home'
function App() {

  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(false)
  const [showHome, setShowHome] = useState(false)

  useEffect(() => {
    const todoString = localStorage.getItem('todos')

    if (todoString && todoString !== "undefined") {
      setTodos(JSON.parse(todoString))
    }
  }, [])

  const saveToLS = (newTodos) => {
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id
    })

    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleDelete = (e, id) => {
    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleAdd = () => {
    const newTodos = [...todos, {
      id: uuidv4(),
      todo,
      isCompleted: false
    }]

    setTodos(newTodos)
    setTodo('')
    saveToLS(newTodos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name

    let index = todos.findIndex(item => {
      return item.id === id
    })

    let newTodos = [...todos]

    newTodos[index].isCompleted = !newTodos[index].isCompleted

    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >

<Navbar setShowHome={setShowHome} />
{showHome ? (
  <Home />
) : (
      <div className="md:container mx-3 md:mx-auto p-5 my-5 bg-white/85 rounded-lg min-h-[80vh] md:w-1/2 backdrop-blur-sm shadow-xl">

        <h1 className='text-center text-3xl font-bold'>
          iTask - Manage your Todos at one place
        </h1>
        <div className="border-2 border-purple-700 h-1 w-1/3 mx-auto my-5 rounded-lg "></div>

        <div className="addtodo my-5 flex flex-col gap-4">

          <h2 className="text-2xl font-bold">
            Add a Todo
          </h2>

          <div className="flex items-center gap-2">

            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="What do you need to do?"
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 h-10 w-full outline-none"
            />

            <button
              onClick={handleAdd}
              disabled={todo.length <= 2}
              className="bg-violet-700  disabled:bg-violet-400 hover:bg-violet-900 px-4 h-10 cursor-pointer font-bold text-white rounded-lg"
            >
              Add
            </button>

          </div>
        </div>

        <label className="flex items-center gap-2 my-4 text-lg">

          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
          />

          Show Finished Todos

        </label>

        <div className="h-[1px] bg-black opacity-70 w-[90%] mx-auto my-3"></div>

        <h2 className="text-2xl font-bold my-4">
          Your Todos
        </h2>

        <div className="todos">

          {todos.length === 0 &&
            <div className="text-gray-500">
              No Todos Added
            </div>
          }

          {todos.map((item) => {

            return (showFinished || !item.isCompleted) &&

              <div
                key={item.id}
                className="todo flex justify-between my-3"
              >

                <div className='flex gap-5 items-center'>

                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                  />

                  <div className={item.isCompleted ? "line-through text-gray-500" : ""}>
                    {item.todo}
                  </div>

                </div>

                <div className="buttons flex h-full">

                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="bg-pink-500 hover:bg-pink-700 p-2 py-1 font-bold text-sm text-white rounded-md mx-2"
                  >
                    <MdDelete />
                  </button>

                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-indigo-600 hover:bg-indigo-800 p-2 py-1 font-bold text-sm text-white rounded-md"
                  >
                    <FaEdit />
                  </button>

                </div>

              </div>

          })}

        </div>

      </div>
)}

    </div>
        
  )
  
}

export default App