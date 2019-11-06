import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const BaseContext = createContext(null);

const BaseProvider = ({ children }) => {
	return <BaseContext.Provider value={null}>{children}</BaseContext.Provider>;
};

BaseProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default BaseProvider;
