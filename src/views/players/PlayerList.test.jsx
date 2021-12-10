import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import PlayerList from './PlayerList';

const fakePlayer1 = {
    id: 1, 
    created_at: '2021-12-10T17:05:14.55043+00:00', 
    name: 'Amber', 
    position: 'organizer', 
    team_id: 17
}

const worker = setupServer(
    rest.get('https://bmugikqtddktbuecxyqi.supabase.co/rest/v1/players', (req, res, ctx) => {
        return res(
            ctx.json([fakePlayer1])
        )
    })
);

beforeAll(() => {
    worker.listen()
});
afterAll(() => {
    worker.close()
});

it('should render out a playerlist component', async () => { 
    const { container } = render(
                            <MemoryRouter>
                                <PlayerList />
                            </MemoryRouter>)
    const label = await screen.findByText('Players:', {exact: false})
    const player = await screen.findByText('Amber')
    expect(player).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(container).toMatchSnapshot();
});