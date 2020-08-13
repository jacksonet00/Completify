import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Task from './components/Task';
import SettingsPane from './components/SettingsPane';
import {
	AppContainer,
	AppName,
	TaskInput,
	AddTaskButton,
	TitleGrid,
} from './components/styledComponents';
import './styles/root.css';

const App = () => {
	//== State ==\\

	const [tasks, setTasks] = useState(
		JSON.parse(localStorage.getItem('tasks')) || []
	);
	const [taskInput, setTaskInput] = useState('');
	const [autoSort, setAutoSort] = useState(true);
	const [addFrom, setAddFrom] = useState('bottom');
	const [showSettings, setShowSettings] = useState(false);

	//== Effect ==\\

	useEffect(() => {
		document.getElementById('add-btn').addEventListener('focus', (e) => {
			window.setTimeout(() => e.target.blur(), 250);
		});
	}, []);

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	//== Event Handlers ==\\

	const handleAddTask = (e) => {
		e.preventDefault();

		const getIndex = (taskList) => {
			taskList.forEach((task, index) => {
				if (task.completed) return index;
			});
			return taskList.length;
		};

		if (taskInput === '') return;
		const newTask = {
			name: taskInput,
			completed: false,
			id: uuidv4(),
		};
		if (addFrom === 'top') {
			setTasks([newTask, ...tasks]);
		}
		if (addFrom === 'bottom') {
			let newTasks = [...tasks];
			newTasks.splice(getIndex(newTasks), 0, newTask);
			setTasks(newTasks);
		}
		setTaskInput('');
	};

	const handleCompleteTask = (id) => {
		let newTasks = [...tasks];
		newTasks.forEach((task) => {
			if (task.id === id) {
				task.completed = !task.completed;
			}
		});
		setTasks(newTasks);
		sortTasks();
	};

	const sortTasks = () => {
		let newTasks = [...tasks];
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

	//== Render ==\\

	const renderSettings = () => {
		if (showSettings) {
			return (
				<SettingsPane
					onToggle={() => setAutoSort(!autoSort)}
					onSortDirection={(s) =>
						setAddFrom(s === 'top' ? 'top' : 'bottom')
					}
				/>
			);
		}
		return <></>;
	};

	return (
		<AppContainer>
			<TitleGrid>
				<AppName
					style={{ gridColumnStart: '2', gridColumnEnd: '2' }}
				>
					Completify
				</AppName>
				<div
					style={{
						gridColumnStart: '4',
						gridColumnEnd: '4',
						display: 'grid',
						gridTemplate: '1fr 2fr / 1fr',
					}}
				>
					<button
						onClick={() => setShowSettings(!showSettings)}
						style={{
							gridRowStart: '1',
							gridRowEnd: '1',
						}}
					>
						s
					</button>
				</div>
			</TitleGrid>
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
			{renderSettings()}

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
													setTasks(
														tasks.filter(
															(
																t
															) =>
																t.id !==
																id
														)
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
		</AppContainer>
	);
};

export default App;
