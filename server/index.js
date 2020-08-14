const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./queries');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
	res.status(200).json({ info: 'Completify API' });
});
app.get('/tasks', db.getTasks);
app.get('/tasks/:id', db.getTaskById);
app.post('/tasks', db.createTask);
app.put('/tasks/:id', db.updateTask);
app.delete('/tasks/:id', db.deleteTask);

// Start server
app.listen(process.env.PORT || 3002, () => {
	console.log(`Server listening on ${process.env.PORT || 3002}`);
});
