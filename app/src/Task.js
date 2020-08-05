import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	background-color: #e2e2e2;
	box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
		-8px -8px 12px 0 rgba(255, 255, 255, 0.25);
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-radius: 2em;
	padding: 1em;
	width: 25em;
	margin: 2em;
`;

const HStack = styled.div`
	display: flex;
	align-items: center;
`;

const Title = styled.h3`
	color: black;
	padding-left: 1em;
`;

const TaskInput = styled.input`
	color: black;
`;

const Task = (props) => {
	return (
		<Container>
			<HStack>
				<TaskInput
					type="checkbox"
					checked={props.task.completed}
					onChange={() => props.onComplete(props.task.id)}
				/>
				<Title>{props.task.name}</Title>
			</HStack>
			<button onClick={() => props.onDelete(props.task.id)}>x</button>
		</Container>
	);
};

export default Task;
