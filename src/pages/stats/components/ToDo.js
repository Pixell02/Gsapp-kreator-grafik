import React, { useEffect, useState } from "react";
import { useCollection } from "../../../hooks/useCollection";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "./ToDo.css";

export default function ToDo() {


  const [task, setTask] = useState("");
  const { user } = useAuthContext();


  const deleteTask = (id) => {
    const ref = doc(db, "todo", id);
    deleteDoc(ref)
  }

  const updateTask = (id, lvl) => {
    const ref = doc(db, "todo", id)
    updateDoc(ref, {
      prioryty: lvl
    })
  }

  const handleAddTask = () => {
    const ref = collection(db, "todo");
    addDoc(ref, {
      task: `${task}(${user.email})`,
    });
    setTask("");
  };

  const { documents: todo } = useCollection("todo");
  return (
    <div>
      <input type="text" className="w-25" value={task} onChange={(e) => setTask(e.target.value)} />
      <button className="btn" onClick={() => handleAddTask()}>
        dodaj
      </button>
      <ul>
        {todo &&
          todo.map((task, i) => (
            <li className={task.prioryty && task.prioryty === 1 ? "red-task" : task.prioryty === 2 ? "yellow-task" : task.prioryty === 3 ? "blue-task" : task.prioryty === 4 ? "green-task" : null}>
              {`${i + 1}.`} {task.task}
              <button className="btn" onClick={() => updateTask(task.id, 1)}>priorytet</button>
              <button className="btn" onClick={() => updateTask(task.id, 2)}>ważne</button>
              <button className="btn" onClick={() => updateTask(task.id, 3)}>na przyszłość</button>
              <button className="btn" onClick={() => updateTask(task.id, 4)}>zrobione</button>
              <button className="btn" onClick={() => deleteTask(task.id)}>usuń</button>
            </li>
          ))}
      </ul>
      <div className="legendary-container">
        <div className="item">
          <div className="red-color color"></div>
          <div className="name-legend">priorytet</div>
        </div>
        <div className="item">
          <div className="yellow-color color"></div>
          <div className="name-legend">ważne</div>
        </div>
        <div className="item">
          <div className="blue-color color"></div>
          <div className="name-legend">na przyszłość</div>
        </div>
        <div className="item">
          <div className="green-color color"></div>
          <div className="name-legend">zrobione</div>
        </div>
      </div>
    </div>
  );
}
