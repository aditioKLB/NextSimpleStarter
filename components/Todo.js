import React, { useState, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { TodoContext } from '../globals/contexts/todos';
import TodoItem from './TodoItem';

const useStyles = makeStyles(theme => ({
	todo: {
		maxWidth: 400,
		margin: 'auto',
		marginTop: 40,
		textAlign: 'center'
	},
	paper: {
		width: '100%'
	},
	form: {
		padding: theme.spacing(2)
	},
	list: {
		listStyle: 'none',
		padding: 0
	}
}));

const Todo = () => {
	const classes = useStyles();
	const [text, setText] = useState('');
	const { addTodo, removeTodo, updateTodo, todos } = useContext(TodoContext);
	const completedTodos = todos.filter(todo => todo.completed);

	const handleAddTodo = e => {
		e.preventDefault();
		const trimmedText = text.trim();

		if (trimmedText) {
			addTodo(trimmedText);
		}
		setText('');
	};

	const handleTextChange = e => {
		setText(e.target.value);
	};

	return (
		<Grid
			container
			className={classes.todo}
			justify="center"
			direction="column"
		>
			<header>
				<img src="/static/img/android-chrome-192x192.png" alt="Logo" />
			</header>
			<Paper component="main" className={classes.paper}>
				<form onSubmit={handleAddTodo} className={classes.form}>
					<TextField
						fullWidth
						value={text}
						margin="normal"
						label="What must be done?!!"
						onChange={handleTextChange}
						inputProps={{ 'aria-label': 'What must be done?' }}
					/>
					{!!todos.length && (
						<Grid container justify="space-between">
							<Grid item>Total: {todos.length}</Grid>
							<Grid item>Completed: {completedTodos.length}</Grid>
						</Grid>
					)}
				</form>
				<ul className={classes.list}>
					{todos.map(todo => (
						<TodoItem
							key={todo.text}
							todo={todo}
							remove={removeTodo}
							update={updateTodo}
						/>
					))}
				</ul>
			</Paper>
		</Grid>
	);
};

export default Todo;
