import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TeamList from './TeamList';

it('should render out a team list component', async () => { 
    const { container } = render(
                            <MemoryRouter>
                                <TeamList />
                            </MemoryRouter>)
    await screen.findByText(/Loading.../i)
    const label = await screen.findByText('Teams:', {exact: false})
    expect(label).toBeInTheDocument();
    expect(container).toMatchSnapshot();
})