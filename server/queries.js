const { pool } = require('./config');

const getTasks = (request, response) => {
	pool.query('SELECT * FROM tasks', (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const getTaskById = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query('SELECT * FROM tasks WHERE ID = $1', [id], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const createTask = (request, response) => {
	const { name, completed } = request.body;

	pool.query(
		'INSERT INTO tasks (name, completed) VALUES ($1, $2)',
		[name, completed],
		(error) => {
			if (error) {
				throw error;
			}
			response
				.status(201)
				.json({ status: 'success', message: 'Task added.' });
		}
	);
};

const updateTask = (request, response) => {
	const id = parseInt(request.params.id);
	const { name, completed } = request.body;

	pool.query(
		'UPDATE tasks SET name = $1, completed = $2 WHERE ID = $3',
		[name, completed, id],
		(error, results) => {
			if (error) {
				throw error;
			}
			response
				.status(200)
				.json({ status: 'success', message: 'Task updated.' });
		}
	);
};

const deleteTask = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query('DELETE FROM tasks WHERE ID = $1', [id], (error, results) => {
		if (error) {
			throw error;
		}
		response
			.status(200)
			.json({ status: 'success', message: 'Task deleted.' });
	});
};

module.exports = {
	getTasks,
	getTaskById,
	createTask,
	updateTask,
	deleteTask,
};
