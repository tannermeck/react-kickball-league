import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import TeamDetail from './TeamDetail';

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
            ctx.json(fakeTeam1)
        )
    })
);
beforeAll(() => {
    worker.listen()
});
afterAll(() => {
    worker.close()
});

it('should render out a team detail component', async () => { 
    const { container } = render(
                            <MemoryRouter>
                                <TeamDetail match={{ params: { id: '1'} }}/>
                            </MemoryRouter>)            
    const teamName = await screen.findByText('My Team');
    const label = await screen.findByText('Players:', {exact: false})
    expect(teamName).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(container).toMatchSnapshot();
    
})