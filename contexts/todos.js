import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import todoActions from '../actions/todos';
import useTodoReducers from '../reducers/todos';

const DEFAULTS = {
	todos: []
};
const TodoContext = createContext(DEFAULTS);
const TodoProvider = ({ children }) => {
	const { todos, dispatch } = useTodoReducers();

	return (
		<TodoContext.Provider value={{ ...todoActions(dispatch), todos }}>
			{children}
		</TodoContext.Provider>
	);
};

TodoProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export { TodoProvider as default, TodoContext };
