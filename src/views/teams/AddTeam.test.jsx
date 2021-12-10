import { screen, render } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import { Route, Router } from 'react-router-dom';
import AddTeam from './AddTeam.jsx';
import TeamList from './TeamList.jsx';
import { createMemoryHistory } from 'history';

const fakeTeam = {
    id: 15, 
    created_at: null, 
    name: 'New Mock Team', 
    city: 'Portland', 
    state: 'OR',
}

const worker = setupServer(
    rest.get('https://bmugikqtddktbuecxyqi.supabase.co/rest/v1/teams', (req, res, ctx) => {
        return res(
            ctx.json([fakeTeam])
        )
    }),
    rest.post('https://bmugikqtddktbuecxyqi.supabase.co/rest/v1/teams', (req, res, ctx) => {
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

it('should render a new team and redirect to /teams', async () => {
    const history = createMemoryHistory();
    history.push('/teams/new')
    render(
        <Router history={history}>
            <Route path ='/teams/new'>
                <AddTeam />
            </Route>
            <Route path='/teams' component={TeamList} />
        </Router>)
    screen.getByText('Add a Team')
    const nameInput = screen.getByRole('textbox', {name: 'name input'});
    const cityInput = screen.getByRole('textbox', {name: 'city input'});
    const stateInput = screen.getByRole('textbox', {name: 'state input'});
    const button = await screen.findByRole('button', {name: 'add team submit'});

    userEvent.type(nameInput, 'New Mock Team')
    userEvent.type(cityInput, 'Portland');
    userEvent.type(stateInput, 'OR');
    userEvent.click(button);

    const teamLabel = await screen.findByText('New Mock Team')
    expect(teamLabel).toBeInTheDocument();
});