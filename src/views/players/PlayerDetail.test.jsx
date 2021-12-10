import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import PlayerDetail from './PlayerDetail';

const fakePlayer1 = {
    id: 1, 
    created_at: '2021-12-10T17:05:14.55043+00:00', 
    name: 'Amber', 
    position: 'organizer', 
    team_id: 17,
    teams: {id: 17, created_at: null, name: 'Peter Pipers', city: 'Seattle', state: 'Wa'}
}
const worker = setupServer(
    rest.get('https://bmugikqtddktbuecxyqi.supabase.co/rest/v1/players', (req, res, ctx) => {
        return res(
            ctx.json(fakePlayer1)
        )
    })
);

beforeAll(() => {
    worker.listen()
});
afterAll(() => {
    worker.close()
});

it('should render out a player detail component', async () => { 
    const { container } = render(
                            <MemoryRouter>
                                <PlayerDetail match={{ params: { id: '3'} }}/>
                            </MemoryRouter>)
    screen.getByText('Loading Player...')  
    const playerName = await screen.findByText('Amber')            
    const label = await screen.findByText('Position: organizer', {exact: false})
    expect(playerName).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(container).toMatchSnapshot();

    
})