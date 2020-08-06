import React from 'react';
import {
	TaskContainer,
	HStack,
	TaskName,
	TaskCheckbox,
	DeleteTaskButton,
} from './styledComponents';

const Task = (props) => {
	return (
		<TaskContainer>
			<HStack>
				<TaskCheckbox
					type="checkbox"
					id={`checkbox-${props.task.id}`}
					checked={props.task.completed}
					onChange={() => props.onComplete(props.task.id)}
				/>
				<TaskName htmlFor={`checkbox-${props.task.id}`}>
					{props.task.name}
				</TaskName>
			</HStack>
			<DeleteTaskButton onClick={() => props.onDelete(props.task.id)}>
				x
			</DeleteTaskButton>
		</TaskContainer>
	);
};

export default Task;
