import React from 'react';
import Link from 'next/link';
import withApollo from '../libraries/apollo';
import redirect from '../libraries/redirect';
import checkLoggedIn from '../libraries/checkLoggedIn';
import RegisterBox from '../components/RegisterBox';

const CreateAccountPage = () => (
	<>
		{/* RegisterBox handles all register logic. */}
		<RegisterBox />
		<hr />
		Already have an account? <Link href="/signin">Sign in</Link>
	</>
);

CreateAccountPage.getInitialProps = async context => {
	const { loggedInUser } = await checkLoggedIn(context.apolloClient);

	if (loggedInUser.user) {
		// Already signed in? No need to continue.
		// Throw them back to the main page
		redirect(context, '/');
	}

	return {};
};

export default withApollo(CreateAccountPage);
