import React from 'react';
import '../styles/toggle.css';

const Toggle = (props) => {
	return (
		<div className="toggle-container">
			<label className="toggle-control">
				<input
					type="checkbox"
					id="toggle"
					checked={props.toggled}
					onChange={props.onToggle}
				/>
				<span className="control"></span>
			</label>
		</div>
	);
};

export default Toggle;
