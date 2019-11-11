import React from 'react';
import PropTypes from 'prop-types';
import TodoProvider from './contexts/todos';
import BaseProvider from './contexts/base';

const Provider = ({ children }) => (
	<TodoProvider>
		<BaseProvider>{children}</BaseProvider>
	</TodoProvider>
);

Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Provider;
