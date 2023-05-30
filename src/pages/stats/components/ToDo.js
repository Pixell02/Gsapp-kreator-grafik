import React, { useState } from 'react'
import { useCollection } from '../../../hooks/useCollection'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import { useAuthContext } from '../../../hooks/useAuthContext'

export default function ToDo() {

  const [task, setTask] = useState("")
  const { user } = useAuthContext();

  const handleAddTask = () => {
    const ref = collection(db, "todo")
    addDoc(ref, {
      task: `${task}(${user.email})`
    })
    setTask("")
 } 


  const { documents: todo } = useCollection("todo");
  return (
    <div>
      <input type="text" className='w-25' value={task} onChange={(e) => setTask(e.target.value)} />
      <button className='btn' onClick={() => handleAddTask()}>dodaj</button>
      <ul>
        {todo && todo.map((task, i) => (
          <li>{`${i+1}.`} {task.task}</li>
      ))}
      </ul>
    </div>
  )
}
