import { screen, render, act, waitFor } from '@testing-library/react';
import RepositoriesListItem from './RepositoriesListItem';
import { MemoryRouter } from 'react-router';

// NOTE: this will mock and make to skip actual FileIcon component try this when findby metod is not working

// jest.mock('../tree/FileIcon.js', () => {
// 	return () => {
// 		return 'File Icon Component';
// 	};
// });

describe('RepositoriesListItem', () => {
	const repository = {
		full_name: 'facebook',
		language: 'Javascript',
		description: 'a react framework',
		owner: {
			login: 'facebook',
		},
		name: 'react',
		html_url: 'https://github.com/facebook',
	};

	it('show the link to github homepage for this repositiry', async () => {
		render(
			<MemoryRouter>
				<RepositoriesListItem repository={repository} />
			</MemoryRouter>
		);
		// screen.debug();
		await screen.findByRole('img', { name: 'Javascript' });
		const link = screen.getByRole('link', { name: /github repositiry/i });
		expect(link).toHaveAttribute('href', repository.html_url);
	});

	it('shows a file Icon with the apprpiate icon', async () => {
		render(
			<MemoryRouter>
				<RepositoriesListItem repository={repository} />
			</MemoryRouter>
		);

		const icon = await screen.findByRole('img', { name: 'Javascript' });
		expect(icon).toHaveClass('js-icon');
	});

	it('shows a link to the code editor page', async () => {
		render(
			<MemoryRouter>
				<RepositoriesListItem repository={repository} />
			</MemoryRouter>
		);

		const link = await screen.findByRole('link', {
			name: new RegExp(repository.owner.login),
		});
		expect(link).toHaveAttribute(
			'href',
			`/repositories/${repository.full_name}`
		);
	});
});
