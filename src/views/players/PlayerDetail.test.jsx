import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PlayerDetail from './PlayerDetail';

it('should render out a player detail component', async () => { 
    const { container } = render(
                            <MemoryRouter>
                                <PlayerDetail match={{ params: { id: '3'} }}/>
                            </MemoryRouter>)
    screen.getByText('Loading Player...')              
    const label = await screen.findByText('Position:', {exact: false})
    
    expect(label).toBeInTheDocument();
    expect(container).toMatchSnapshot();

    
})