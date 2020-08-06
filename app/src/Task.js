import React from 'react';
import styled from 'styled-components';

// TODO: Media queries for mobile.
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
	min-width: 25em;
	margin: 2em;
`;

const HStack = styled.div`
	display: flex;
	align-items: center;
`;

const Title = styled.label`
	color: black;
	padding-left: 1em;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const TaskCheckbox = styled.input`
	color: black;
	margin-left: 1em;
`;

const DeleteButton = styled.button`
	margin-right: 1em;
`;

const Task = (props) => {
	return (
		<Container>
			<HStack>
				<TaskCheckbox
					type="checkbox"
					id={`checkbox-${props.task.id}`}
					checked={props.task.completed}
					onChange={() => props.onComplete(props.task.id)}
				/>
				<Title htmlFor={`checkbox-${props.task.id}`}>
					{props.task.name}
				</Title>
			</HStack>
			<DeleteButton onClick={() => props.onDelete(props.task.id)}>
				x
			</DeleteButton>
		</Container>
	);
};

export default Task;
