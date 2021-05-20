import React, { useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle) {
      setTasks((oldTasks: Task[]) => [...oldTasks, {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }]);
    };
  };

  function handleMarkTaskAsDone(id: number) {
    const myTask = tasks.filter((task: Task) => task.id === id);
    const myTasksForUpdate = tasks.filter((task: Task) => task.id !== id);
    if (myTask) {
      setTasks([...myTasksForUpdate, {
        id: myTask[0].id,
        title: myTask[0].title,
        done: !myTask[0].done,
      }]);
    };
  };

  function handleRemoveTask(id: number) {
    const myTask = tasks.filter((task: Task) => task.id !== id);
    if (myTask) {
      setTasks(myTask);
    };
  };

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </>
  )
}