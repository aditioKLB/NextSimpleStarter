import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import Fork from '../components/Fork';
import Todo from '../components/Todo';

const Index = ({ stars }) => (
	<>
		<Fork stars={stars} />
		<Todo />
	</>
);

Index.defaultProps = {
	stars: 0
};

Index.propTypes = {
	stars: PropTypes.number
};

Index.getInitialProps = async () => {
	const res = await fetch(
		'https://api.github.com/repos/ooade/NextSimpleStarter'
	);
	const json = await res.json();
	return { stars: json.stargazers_count };
};

export default Index;
