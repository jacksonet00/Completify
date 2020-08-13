import React from 'react';
import styled from 'styled-components';
import Toggle from './Toggle';

const Container = styled.div`
	background-color: #e2e2e2;
	box-shadow: 12px 12px 24px 0 rgba(0, 0, 0, 0.2),
		-12px -12px 24px 0 rgba(255, 255, 255, 0.5);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 2em;
	padding: 1em;
	min-width: 25em;
	margin: 2em;
`;

const Container2 = styled.div`
	display: grid;
	grid-template: 1fr / 1fr 1fr;
	align-items: center;
	padding: 1em;
`;

const ToggleLabel = styled.div`
	padding-top: 0.5em;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const SelectLabel = styled.label`
	padding-right: 0.5em;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Select = styled.select`
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Title = styled.h3`
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const SettingsPane = (props) => {
	return (
		<Container>
			<Title>Settings</Title>
			<Container2>
				<ToggleLabel>Auto Sort</ToggleLabel>
				<Toggle
					toggled={props.sortToggled}
					onToggle={props.onToggleSort}
				/>
			</Container2>
			<Container2>
				<SelectLabel htmlFor="sort-direction-select">
					Add from:{' '}
				</SelectLabel>
				<Select
					id="sort-direction-select"
					onChange={(e) => props.onSortDirection(e.target.value)}
				>
					<option value="top">Top</option>
					<option value="bottom">Bottom</option>
				</Select>
			</Container2>
		</Container>
	);
};

export default SettingsPane;
