import { screen, render } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { Route, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import AddPlayer from './AddPlayer';
import PlayerList from './PlayerList';
import { createMemoryHistory } from 'history';

const fakeTeam = {
    id: 15, 
    created_at: null, 
    name: 'Jail Blazers', 
    city: 'Portland', 
    state: 'OR',
    players: []
}
// {id: 5, created_at: '2021-12-09T19:00:33.359686+00:00', name: 'Fake Plyaer', position: 'Outfielder', team_id: 15}
const worker = setupServer(
    rest.get('https://bmugikqtddktbuecxyqi.supabase.co/rest/v1/teams', (req, res, ctx) => {
        return res(
            ctx.json([fakeTeam])
        )
    }),
    rest.post('https://bmugikqtddktbuecxyqi.supabase.co/rest/v1/players', (req, res, ctx) => {
        return res(
            ctx.json([fakeTeam])
        )
    })
);

beforeAll(() => {
    worker.listen()
});
afterAll(() => {
    worker.close()
});

it('should add a player using the input fields and redirect to player list', async () => { 
    const history = createMemoryHistory();
    history.push('/players/new')
    render(
            <Router history={history}>
                <Route path='/players/new'>
                    <AddPlayer />
                </Route>
                <Route path='/players' component={PlayerList} />
            </Router>)
    const nameInput = screen.getByLabelText(/Name/i);
    const positionInput = screen.getByLabelText(/Position/i);
    const selectInput = await screen.findByRole({name: 'select-team'})
    const button = screen.getByRole('button');

    userEvent.type(nameInput, 'Fake Player')
    userEvent.type(positionInput, 'Outfielder')
    userEvent.change(selectInput, { target: { value: 2 }})
    userEvent.click(button);

    await screen.findByText(/Loading Players/i)
    await screen.findByText('Fake Player')
    
})