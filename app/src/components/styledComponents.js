import styled from 'styled-components';

const AppContainer = styled.div`
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

const AppName = styled.h1`
	color: black;
	padding-bottom: 1em;
	font-family: -apple-system-headline, -apple-system, BlinkMacSystemFont,
		'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
		'Helvetica Neue', sans-serif;
`;

const TaskInput = styled.input`
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

const AddTaskButton = styled.button`
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

	&:hover {
		color: #25543b;
	}

	&:focus {
		outline: 0;
		box-shadow: inset 12px 12px 24px 0 rgba(0, 0, 0, 0.2),
			inset -12px -12px 24px 0 rgba(255, 255, 255, 0.5);
	}
`;

const DeleteTaskButton = styled.button`
	margin-right: 1em;
`;

// TODO: Media queries for mobile.
const TaskContainer = styled.div`
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

const TaskName = styled.label`
	color: black;
	padding-left: 1em;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const TaskCheckbox = styled.input`
	color: black;
	margin-left: 1em;
`;

export {
	AppContainer,
	AppName,
	TaskInput,
	AddTaskButton,
	DeleteTaskButton,
	TaskContainer,
	HStack,
	TaskName,
	TaskCheckbox,
};
