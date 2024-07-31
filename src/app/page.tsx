'use client'

import { useState } from 'react';

type Task = {
  id: number;
  text: string;
  completed: boolean;
  timestamp: Date;
};


export default function Home() {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [taskText, setTaskText] = useState<string>('');
  const [filter, setFilter] = useState<string>('All');
  const [edit, setEdit] = useState<boolean>(false);
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);

  const addTask = () => {
    if (taskText.trim() === '') return;

    const newTask: Task = {
      id: Date.now(),
      text: taskText,
      completed: false,
      timestamp: new Date(),
    };
    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  const toggleCompleted = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (item: Task) => {
    setEdit(true);
    setCurrentTaskId(item.id);
    setTaskText(item.text);
};

const updateTask = () => {
    if (currentTaskId === null) return;

    setTasks(tasks.map(task => 
        task.id === currentTaskId
            ? { ...task, text: taskText }
            : task
    ));
    setEdit(false);
    setCurrentTaskId(null);
    setTaskText('');
};

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return task.completed;
    if (filter === 'Pending') return !task.completed;
    return true;
  });

  return (
    <div className={'container'}>
      <h1 className={'title'}>TODO LIST</h1>
      <div className={'addTaskContainer'}>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a new task"
          className={'input'}
        />
        <button onClick={edit ? updateTask : addTask} className={'addButton'}>{edit ? 'Save' : 'Add Task'}</button>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={'filterSelect'}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      <ul className={'taskList'}>
        {filteredTasks.map(task => (
          <li key={task.id} className={`${'taskItem'} ${task.completed ? 'completed' : ''}`}>
            <div className={'taskInfo'}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task.id)}
                className={'checkbox'}
              />
              <span className={'taskText'}>{task.text}</span>
              <span className={'timestamp'}>{task.timestamp.toLocaleTimeString()} {task.timestamp.toLocaleDateString()}</span>
            </div>
            <div className={'taskActions'}>
              <button onClick={() => removeTask(task.id)} className={'deleteButton'}>🗑️</button>
              <button onClick={() => editTask(task)} className={'editButton'}>✏️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
