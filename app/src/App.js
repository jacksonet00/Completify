import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Task from './Task';

const App = () => {
	const [tasks, setTasks] = useState(
		JSON.parse(localStorage.getItem('tasks')) || []
	);
	const [taskInput, setTaskInput] = useState('');

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	const handleAddTask = (e) => {
		e.preventDefault();
		setTasks([
			...tasks,
			{ name: taskInput, completed: false, id: uuidv4() },
		]);
		setTaskInput('');
	};

	const handleCompleteTask = (id) => {
		let newTasks = [...tasks];
		newTasks.forEach((t) => {
			if (t.id === id) {
				t.completed = !t.completed;
			}
		});
		setTasks(newTasks);
	};

	const handleDeleteTask = (id) => {
		const newTasks = tasks.filter((t) => t.id !== id);
		setTasks(newTasks);
	};

	return (
		<div>
			<form onSubmit={(e) => handleAddTask(e)}>
				<input
					type="text"
					value={taskInput}
					onChange={(e) => setTaskInput(e.target.value)}
				/>
				<button type="submit">Add</button>
			</form>
			<ul>
				{tasks.map((t) => {
					return (
						<Task
							key={t.id}
							task={t}
							onComplete={(id) => handleCompleteTask(id)}
							onDelete={(id) => handleDeleteTask(id)}
						/>
					);
				})}
			</ul>
		</div>
	);
};

export default App;
