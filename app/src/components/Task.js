import React from 'react';
import HStack from './HStack';
import '../styles/task.css';

const Task = (props) => {
	return (
		<div className="task-container">
			<HStack>
				<input
					className="task-chkbx"
					type="checkbox"
					id={`checkbox-${props.task.id}`}
					checked={props.task.completed}
					onChange={() => props.onComplete(props.task.id)}
				/>
				<label
					className="task-name"
					htmlFor={`checkbox-${props.task.id}`}
				>
					{props.task.name}
				</label>
			</HStack>
			<button
				className="delete-btn"
				onClick={() => props.onDelete(props.task.id)}
			>
				x
			</button>
		</div>
	);
};

export default Task;
