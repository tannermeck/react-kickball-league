import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import TeamList from './TeamList';

const fakeTeam1 = {
    id: 1, 
    created_at: '2021-12-08T19:18:29+00:00', 
    name: 'My Team', 
    city: 'Portland', 
    state: 'Or',
    players: []
}
const worker = setupServer(
    rest.get('https://bmugikqtddktbuecxyqi.supabase.co/rest/v1/teams', (req, res, ctx) => {
        return res(
            ctx.json([fakeTeam1])
        )
    })
);

beforeAll(() => {
    worker.listen()
});
afterAll(() => {
    worker.close()
});

it('should render out a team list component', async () => { 
    const { container } = render(
                            <MemoryRouter>
                                <TeamList />
                            </MemoryRouter>)
    await screen.findByText(/Loading.../i)
    const label = await screen.findByText('Teams:', {exact: false})
    const teamName = await screen.findByText('My Team')
    expect(teamName).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(container).toMatchSnapshot();
})