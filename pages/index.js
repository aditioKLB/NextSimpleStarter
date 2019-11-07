import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import Typography from '@material-ui/core/Typography';
import withApollo from '../libraries/apollo';
import checkLoggedIn from '../libraries/checkLoggedIn';
import redirect from '../libraries/redirect';
import Fork from '../components/Fork';
import Todo from '../components/Todo';

const Index = ({ stars, user }) => (
	<>
		<Typography variant="h3">{user.name}</Typography>
		<Fork stars={stars} />
		<Todo />
	</>
);

Index.defaultProps = {
	stars: 0
};

Index.propTypes = {
	stars: PropTypes.number,
	user: PropTypes.object.isRequired
};

Index.getInitialProps = async context => {
	const res = await fetch(
		'https://api.github.com/repos/ooade/NextSimpleStarter'
	);
	const json = await res.json();
	const { loggedInUser } = await checkLoggedIn(context.apolloClient);

	if (!loggedInUser.user) {
		// Already signed in? No need to continue.
		// Throw them back to the main page
		redirect(context, '/signin');
	}
	return { stars: json.stargazers_count, ...loggedInUser };
};

export default withApollo(Index);
