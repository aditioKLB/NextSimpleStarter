/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactDom from 'react-dom';
import Head from 'next/head';
import App from 'next/app';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Provider from '../globals';

export default class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		return {
			pageProps: {
				// Call page-level getInitialProps
				...(Component.getInitialProps
					? await Component.getInitialProps(ctx)
					: {})
			}
		};
	}

	componentDidMount() {
		if (process.env.NODE_ENV !== 'production') {
			// eslint-disable-next-line global-require
			const axe = require('react-axe');
			axe(React, ReactDom, 1000);
		}
	}

	render() {
		const { Component, pageProps } = this.props;

		const theme = createMuiTheme({
			palette: {
				background: {
					default: '#EEE'
				},
				primary: {
					main: '#673ab7'
				}
			}
		});

		return (
			<>
				<Head>
					<title>Todo App</title>
				</Head>
				<ThemeProvider theme={theme}>
					<CssBaseline>
						<Provider>
							<Component {...pageProps} />
						</Provider>
					</CssBaseline>
				</ThemeProvider>
			</>
		);
	}
}
