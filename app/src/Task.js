import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	background-color: papayawhip;
	display: flex;
	flex-direction: row;
	border-radius: 2em;
	padding: 1em;
	width: 25em;
	margin: 2em;
`;

const Title = styled.h3`
	color: palevioletred;
`;

const Task = (props) => {
	return (
		<Container>
			<Title>{props.task.name}</Title>
			<input
				type="checkbox"
				checked={props.task.completed}
				onChange={() => props.onComplete(props.task.id)}
			/>
			<button onClick={() => props.onDelete(props.task.id)}>x</button>
		</Container>
	);
};

export default Task;
