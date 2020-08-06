import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Task from './components/Task';
import {
	AppContainer,
	AppName,
	TaskInput,
	AddTaskButton,
} from './components/styledComponents';
import './styles/root.css';

const App = () => {
	//== State ==\\

	const [tasks, setTasks] = useState(
		JSON.parse(localStorage.getItem('tasks')) || []
	);
	const [taskInput, setTaskInput] = useState('');
	const [autoSort, setAutoSort] = useState(true);
	const [addFromTop, setAddFromTop] = useState(true);

	//== Effect ==\\

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	useEffect(() => {
		document.getElementById('add-btn').addEventListener('focus', (e) => {
			window.setTimeout(() => e.target.blur(), 250);
		});
	}, []);

	//== Event Handlers ==\\

	const handleAddTask = (e) => {
		e.preventDefault();

		if (taskInput !== '') {
			const d = new Date();
			const newTasks = [...tasks];
			newTasks.splice(getFirstCompletedIndex(newTasks), 0, {
				name: taskInput,
				completed: false,
				id: uuidv4(),
				time: d.getTime(),
			});

			addFromTop
				? setTasks([
						{
							name: taskInput,
							completed: false,
							id: uuidv4(),
							time: d.getTime(),
						},
						...tasks,
				  ])
				: setTasks(newTasks);

			setTaskInput('');
		}
	};

	const handleCompleteTask = (id) => {
		const newTasks = [...tasks];
		newTasks.forEach((t) => {
			if (t.id === id) {
				t.completed = !t.completed;
			}
		});
		// TODO: Animate sorting.
		// TODO: Sort subsections by date.
		if (autoSort) {
			newTasks.sort((a, b) => {
				return a.completed === b.completed
					? 0
					: a.completed
					? 1
					: -1;
			});
		}
		setTasks(newTasks);
	};

	const handleDeleteTask = (id) => {
		const newTasks = tasks.filter((t) => t.id !== id);
		setTasks(newTasks);
	};

	const toggleAutoSort = () => {
		setAutoSort(!autoSort);
		const newTasks = [...tasks];
		if (!autoSort) {
			newTasks.sort((a, b) => {
				return a.completed === b.completed
					? 0
					: a.completed
					? 1
					: -1;
			});
		}
		setTasks(newTasks);
	};

	//== Drag & Drop ==\\

	const reorder = (taskList, startIndex, endIndex) => {
		const result = Array.from(taskList);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	const onDragEnd = (result) => {
		// Dropped outside of list.
		if (!result.destination) return;
		const newTasks = reorder(
			tasks,
			result.source.index,
			result.destination.index
		);
		setTasks(newTasks);
	};

	const getItemStyle = (isDragging, draggableStyle) => ({
		userSelect: 'none',
		padding: '0.001em',
		...draggableStyle,
	});

	const getListStyle = (isDraggingOver) => ({
		padding: '0.001em',
	});

	//== Computed Values ==\\

	const getFirstCompletedIndex = (taskList) => {
		taskList.forEach((t, index) => {
			if (t.completed) {
				return index;
			}
		});
		return -1;
	};

	//== Render ==\\

	return (
		<AppContainer>
			<AppName>Completify</AppName>
			<form onSubmit={(e) => handleAddTask(e)}>
				<TaskInput
					type="text"
					value={taskInput}
					onChange={(e) => setTaskInput(e.target.value)}
				/>
				<AddTaskButton type="submit" id="add-btn">
					Add
				</AddTaskButton>
			</form>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppable">
					{(provided, snapshot) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							style={getListStyle(snapshot.isDraggingOver)}
						>
							{tasks.map((t, index) => (
								<Draggable
									key={t.id}
									draggableId={t.id}
									index={index}
								>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											style={getItemStyle(
												snapshot.isDragging,
												provided
													.draggableProps
													.style
											)}
										>
											<Task
												key={t.id}
												task={t}
												onComplete={(id) =>
													handleCompleteTask(
														id
													)
												}
												onDelete={(id) =>
													handleDeleteTask(
														id
													)
												}
											/>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			<div>
				<input
					type="checkbox"
					name="auto-sort"
					id="auto-sort"
					checked={autoSort}
					onChange={() => toggleAutoSort()}
				/>
				<label htmlFor="auto-sort">Auto Sort</label>
				<select
					onChange={(e) =>
						setAddFromTop(
							e.target.value === 'top' ? true : false
						)
					}
				>
					<option value="top">Top</option>
					<option value="bottom">Bottom</option>
				</select>
			</div>
		</AppContainer>
	);
};

export default App;
