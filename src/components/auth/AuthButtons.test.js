import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AuthButtons from './AuthButtons';
import { createServer } from '../../test/server';
import { SWRConfig } from 'swr';

describe('AuthButtons When User is Not Authenticated', () => {
	// MOCK USER IS NOT AUTHENTICATED
	createServer([
		{
			path: '/api/user',
			res: (req, res, ctx) => {
				return {
					user: null,
				};
			},
		},
	]);

	it('should show sigin & signup when user is not authenticated', async () => {
		render(
			<MemoryRouter>
				<AuthButtons />
			</MemoryRouter>
		);
		const signInLink = await screen.findByRole('link', {
			name: /sign in/i,
		});
		const signUpLink = await screen.findByRole('link', {
			name: /sign up/i,
		});

		expect(signInLink).toBeInTheDocument();
		expect(signUpLink).toBeInTheDocument();
	});

	it('should not show signout. when user is not authenticated', () => {
		render(
			<MemoryRouter>
				<AuthButtons />
			</MemoryRouter>
		);
		const signOutLink = screen.queryByRole('link', {
			name: /sign out/i,
		});

		expect(signOutLink).not.toBeInTheDocument();
	});
});

describe('AuthButtons When User is Authenticated', () => {
	// MOCK USER IS AUTHENTICATED
	createServer([
		{
			path: '/api/user',
			res: (req, res, ctx) => {
				return {
					user: { id: 1, email: 'test@test.com' },
				};
			},
		},
	]);

	it('should not show sign in and signup link when user is authenticated', () => {
		render(
			<SWRConfig value={{ provider: () => new Map() }}>
				<MemoryRouter>
					<AuthButtons />
				</MemoryRouter>
			</SWRConfig>
		);
		const signInLink = screen.queryByRole('link', {
			name: /sign in/i,
		});
		const signUpLink = screen.queryByRole('link', {
			name: /sign up/i,
		});

		expect(signInLink).not.toBeInTheDocument();
		expect(signUpLink).not.toBeInTheDocument();
	});

	it('should show signout link when user is authenticated', async () => {
		render(
			//  clearing the cache
			<SWRConfig value={{ provider: () => new Map() }}>
				<MemoryRouter>
					<AuthButtons />
				</MemoryRouter>
			</SWRConfig>
		);
		const signOutLink = await screen.findByRole('link', {
			name: /sign out/i,
		});

		expect(signOutLink).toBeInTheDocument();
	});
});
