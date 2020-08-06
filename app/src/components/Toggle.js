import React, { useState } from 'react';
import '../styles/toggle.css';

const Toggle = (props) => {
	const [toggled, setToggled] = useState(true);

	const handleToggle = () => {
		props.onToggle(!toggled);
		setToggled(!toggled);
	};

	return (
		<div className="toggle-container">
			<label className="toggle-control">
				<input
					type="checkbox"
					id="toggle"
					checked={toggled}
					onChange={() => handleToggle()}
				/>
				<span className="control"></span>
			</label>
		</div>
	);
};

export default Toggle;
