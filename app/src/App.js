import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Task from './Task';
import styled from 'styled-components';
import './root.css';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: calc(100vh - 3em);
	width: 100vw;
	background-color: lightgrey;
	text-align: center;
	padding-top: 3em;
	overflow: scroll;
`;

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
		<Container>
			<form onSubmit={(e) => handleAddTask(e)}>
				<input
					type="text"
					value={taskInput}
					onChange={(e) => setTaskInput(e.target.value)}
				/>
				<button type="submit">Add</button>
			</form>
			<div>
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
			</div>
		</Container>
	);
};

export default App;
