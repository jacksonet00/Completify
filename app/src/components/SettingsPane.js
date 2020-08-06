import React from 'react';
import styled from 'styled-components';
import Toggle from './Toggle';

const Container = styled.div`
	background-color: lightgrey;
	box-shadow: 12px 12px 24px 0 rgba(0, 0, 0, 0.2),
		-12px -12px 24px 0 rgba(255, 255, 255, 0.5);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 18em;
	height: 20em;
	border-radius: 2em;
	z-index: 100;
`;

const Container2 = styled.div`
	display: grid;
	grid-template: 1fr / 1fr 1fr;
	align-items: center;
	padding: 1em;
`;

const ToggleLabel = styled.div`
	padding-top: 0.5em;
`;

const SelectLabel = styled.label`
	padding-right: 0.5em;
`;

const SettingsPane = (props) => {
	return (
		<Container>
			<h3>Settings</h3>
			<Container2>
				<ToggleLabel>Auto Sort</ToggleLabel>
				<Toggle onToggle={(status) => props.onToggle(status)} />
			</Container2>
			<Container2>
				<SelectLabel htmlFor="sort-direction-select">
					Add from:{' '}
				</SelectLabel>
				<select
					id="sort-direction-select"
					onChange={(e) => props.onSortDirection(e.target.value)}
				>
					<option value="top">Top</option>
					<option value="bottom">Bottom</option>
				</select>
			</Container2>
		</Container>
	);
};

export default SettingsPane;
