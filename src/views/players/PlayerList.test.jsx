import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PlayerList from './PlayerList';

it('should render out a playerlist component', async () => { 
    const { container } = render(
                            <MemoryRouter>
                                <PlayerList />
                            </MemoryRouter>)
    const label = await screen.findByText('Players:', {exact: false})
    
    expect(label).toBeInTheDocument();
    expect(container).toMatchSnapshot();

})