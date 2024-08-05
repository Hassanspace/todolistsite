import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  useEffect(() => {
    let todosstring = localStorage.getItem("todos")
    if (todosstring) {
      let todos = JSON.parse(todosstring)
      settodos(todos)
    }
  }, [])

  const savetols = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleadd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    savetols()
  }

  const handleedit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newtodos = todos.filter(item => item.id !== id)
    settodos(newtodos)
    savetols()
  }

  const handledelete = (e, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        let newtodos = todos.filter(item => item.id !== id)
        settodos(newtodos)
        Swal.fire({
          title: "Deleted!",
          text: "Your todo has been deleted.",
          icon: "success"
        })
        savetols()
      }
    })
  }

  const handlecheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => item.id === id)
    let newtodos = [...todos]
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    settodos(newtodos)
    savetols()
  }

  const handlechange = (e) => {
    settodo(e.target.value)
  }

 
  return (
    <>
      <Navbar />
      <div className="container mx-auto w-3/4">
        <div className="TODO-LIST bg-violet-100 p-4 rounded-2xl my-3 flex flex-col gap-5">
          <div className="addtodo flex justify-center items-center gap-6">
            <h1 className='text-xl font-bold'>Add todo</h1>
            <input  onChange={handlechange} value={todo} className='p-2 rounded-lg' type="text" placeholder='Enter the Task to add...' />
            <button disabled={todo.length<=3} onClick={handleadd} className='px-3 py-1.5 rounded-lg bg-slate-700 text-white'>ADD</button>
          </div>
          <h1 className='text-center'>Your Todos</h1>
          <div className="todos flex-col">
            {todos.length === 0 && <div className='text-center'><h1>No Todos To Display!!</h1></div>}
            {todos.map(item => {
              return (
                <div key={item.id} className="todo flex justify-between items-center m-1 max-w-[80%] mx-auto">
                  <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.isCompleted} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                  <div className="buttons gap-2 flex">
                    <button onClick={(e) => { handleedit(e, item.id) }} className='px-3 py-1.5 rounded-lg bg-slate-700 text-white'><FaEdit /></button>
                    <button onClick={(e) => { handledelete(e, item.id) }} className='px-3 py-1.5 rounded-lg bg-slate-700 text-white'><MdDeleteForever /></button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
