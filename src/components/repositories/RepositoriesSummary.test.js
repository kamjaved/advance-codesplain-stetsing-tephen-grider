import { screen, render } from '@testing-library/react';
import RepositoriesSummary from './RepositoriesSummary';

describe('RepositoriesSummary', () => {
	it('display the primary language of repository', () => {
		const repository = {
			language: 'Javascript',
			stargazers_count: 5,
			forks: 21,
			open_issues: 12,
		};
		render(<RepositoriesSummary repository={repository} />);

		for (let key in repository) {
			const value = repository[key];
			const element = screen.getByText(new RegExp(value));

			expect(element).toBeInTheDocument();
		}
	});
});
