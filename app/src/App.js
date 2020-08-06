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

const Title = styled.h1`
	color: black;
	padding-bottom: 1em;
	font-family: -apple-system-headline, -apple-system, BlinkMacSystemFont,
		'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
		'Helvetica Neue', sans-serif;
`;

const TextBox = styled.input`
	border: 0;
	border-radius: 2em;
	width: 20em;
	padding: 1em;
	box-shadow: inset 2px 12px 16px 0 rgba(0, 0, 0, 0.25),
		inset -8px -8px 12px 0 rgba(255, 255, 255, 0.25);
	margin-right: 0.5em;
	text-align: center;
	font-family: -apple-system-subheadline, -apple-system, BlinkMacSystemFont,
		'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
		'Helvetica Neue', sans-serif;

	&:focus {
		outline: 0;
	}
`;

const AddButton = styled.button`
	border: 0;
	border-radius: 2em;
	width: 5em;
	padding: 1em;
	box-shadow: 12px 12px 24px 0 rgba(0, 0, 0, 0.2),
		-12px -12px 24px 0 rgba(255, 255, 255, 0.5);
	margin-left: 0.5em;
	font-family: -apple-system-subheadline, -apple-system, BlinkMacSystemFont,
		'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
		'Helvetica Neue', sans-serif;

	&:focus {
		outline: 0;
		box-shadow: inset 12px 12px 24px 0 rgba(0, 0, 0, 0.2),
			inset -12px -12px 24px 0 rgba(255, 255, 255, 0.5);
	}
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
		if (taskInput !== '') {
			const d = new Date();
			setTasks([
				...tasks,
				{
					name: taskInput,
					completed: false,
					id: uuidv4(),
					time: d.getTime(),
				},
			]);
			setTaskInput('');
		}
	};

	const handleCompleteTask = (id) => {
		let newTasks = [...tasks];
		newTasks.forEach((t) => {
			if (t.id === id) {
				t.completed = !t.completed;
			}
		});
		// TODO: Animate sorting.
		// TODO: Sort subsections by date.
		newTasks.sort((a, b) => {
			return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
		});
		setTasks(newTasks);
	};

	const handleDeleteTask = (id) => {
		const newTasks = tasks.filter((t) => t.id !== id);
		setTasks(newTasks);
	};

	return (
		<Container>
			<Title>Completify</Title>
			<form onSubmit={(e) => handleAddTask(e)}>
				<TextBox
					type="text"
					value={taskInput}
					onChange={(e) => setTaskInput(e.target.value)}
				/>
				<AddButton type="submit">Add</AddButton>
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
