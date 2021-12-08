import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PlayerList from './PlayerList';

it('should render out a playerlist component', async () => {
    const players = [{ name: 'Ben E. Jetts'}, {name: 'Betty Grey'}]
    
    const { container } = render(
                            <MemoryRouter>
                                <PlayerList players={players} />
                            </MemoryRouter>)
    const label = await screen.findByText('Players:', {exact: false})
    
    expect(label).toBeInTheDocument();
    expect(container).toMatchSnapshot();

})