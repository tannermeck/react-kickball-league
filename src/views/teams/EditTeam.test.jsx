import { screen, render, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import { Route, Router } from 'react-router-dom';
import TeamList from './TeamList.jsx';
import { createMemoryHistory } from 'history';
import EditTeam from './EditTeam.jsx';

const fakeTeam = {
    id: 150, 
    created_at: null, 
    name: 'Edit Mock Team', 
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

it('should edit a team and redirect to /teams', async () => {
    const history = createMemoryHistory();
    history.push('/teams/edit/150')
    render(
        <Router history={history}>
            <Route path ='/teams/edit/:id'>
                <EditTeam match={{params: {id: 1} }}/>
            </Route>
            <Route path='/teams' component={TeamList} />
        </Router>)
    screen.getByLabelText(/Name/i)

    await waitFor(async() => {
    const nameInput = screen.getByRole('textbox', {name: 'name input'});
    const cityInput = screen.getByRole('textbox', {name: 'city input'});
    const stateInput = screen.getByRole('textbox', {name: 'state input'});
    const button = await screen.findByRole('button', {name: 'edit team submit'});

    userEvent.type(nameInput, 'Change team name')
    userEvent.type(cityInput, 'Portland');
    userEvent.type(stateInput, 'OR');
    userEvent.click(button);
    screen.debug();
    })
    const loading = await screen.findByText('Loading Teams...')
    expect(loading).toBeInTheDocument();
    
});