import { screen, render, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import HomeRoute from './HomeRoute';
import { createServer } from '../test/server';

createServer([
	{
		path: '/api/repositories',
		res: (req, res, ctx) => {
			const language = req.url.searchParams.get('q').split('language:')[1];

			return {
				items: [
					{ id: 1, full_name: `${language}_one` },
					{ id: 2, full_name: `${language}_two` },
				],
			};
		},
	},
]);

describe('HOME ROUTE', () => {
	// jest.mock('../hooks/useRepositories.js', () => {
	// 	return () => {
	// 		return {
	// 			items: [
	// 				{ id: 1, full_name: 'facebook/react' },
	// 				{ id: 2, full_name: 'algorithm/javascript' },
	// 			],
	// 		};
	// 	};
	// });

	it('will render 6 Heading at default', () => {
		render(
			<MemoryRouter>
				<HomeRoute />
			</MemoryRouter>
		);

		const headings = within(
			screen.getByTestId('container-repo')
		).getAllByRole('heading');

		expect(headings).toHaveLength(6);
	});

	it('render 2 links for each language', async () => {
		const languages = [
			'javascript',
			'typescript',
			'rust',
			'go',
			'java',
			'python',
		];
		render(
			<MemoryRouter>
				<HomeRoute />
			</MemoryRouter>
		);

		for (let lang of languages) {
			const links = await screen.findAllByRole('link', {
				name: new RegExp(`${lang}_`),
			});
			expect(links).toHaveLength(2);
			expect(links[0]).toHaveTextContent(`${lang}_one`);
			expect(links[1]).toHaveTextContent(`${lang}_two`);
		}
	});
});
