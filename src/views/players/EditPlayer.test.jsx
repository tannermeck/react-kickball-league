import { screen, render, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { Route, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import EditPlayer from './EditPlayer.jsx';
import PlayerList from './PlayerList';
import { createMemoryHistory } from 'history';

const fakeTeam = {
    id: 101, 
    created_at: null, 
    name: 'Jail Blazers', 
    city: 'Portland', 
    state: 'OR',
}
const fakePlayer = {
    id: 100, 
    created_at: '2021-12-10T17:05:14.55043+00:00', 
    name: 'fake player', 
    position: 'outfielder', 
    team_id: 101
}

const worker = setupServer(
    rest.get('https://bmugikqtddktbuecxyqi.supabase.co/rest/v1/teams', (req, res, ctx) => {
        return res(
            ctx.json([fakeTeam])
        )
    }),
    rest.get('https://bmugikqtddktbuecxyqi.supabase.co/rest/v1/players', (req, res, ctx) => {
        return res(
            ctx.json([fakePlayer])
        )
    })
);

beforeAll(() => {
    worker.listen()
});
afterAll(() => {
    worker.close()
});

it('should edit a player and return to the player list page', async () => { 
    const history = createMemoryHistory();
    history.push('/players/edit/100')
    render(
            <Router history={history}>
                <Route path='/players/edit/:id'>
                    <EditPlayer match={{params: {id: '100' }}} />
                </Route>
                <Route path='/players' component={PlayerList} />
            </Router>)
    await waitFor(async() => {
    const nameInput = await screen.findByLabelText(/Name/i);
    const positionInput = await screen.findByLabelText(/Position/i);
    const button = screen.getByRole('button', {name: 'edit submit'});
    userEvent.type(nameInput, 'New Player Name');
    userEvent.type(positionInput, 'Outfielder');
    userEvent.click(button);
    })
    await screen.findByText(/Loading/i)
});