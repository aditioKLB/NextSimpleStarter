import React from 'react';
import Link from 'next/link';
import withApollo from '../libraries/apollo';
import redirect from '../libraries/redirect';
import checkLoggedIn from '../libraries/checkLoggedIn';
import SigninBox from '../components/SigninBox';

const SigninPage = () => (
	<>
		{/* SigninBox handles all login logic. */}
		<SigninBox />
		<hr />
		New? <Link href="/create-account">Create account</Link>
	</>
);

SigninPage.getInitialProps = async context => {
	const { loggedInUser } = await checkLoggedIn(context.apolloClient);

	if (loggedInUser.user) {
		// Already signed in? No need to continue.
		// Throw them back to the main page
		redirect(context, '/');
	}

	return {};
};

export default withApollo(SigninPage);
