import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TeamDetail from './TeamDetail';

it('should render out a team detail component', async () => { 
    const { container } = render(
                            <MemoryRouter>
                                <TeamDetail match={{ params: { id: '1'} }}/>
                            </MemoryRouter>)            
    const label = await screen.findByText('Players:', {exact: false})
    
    expect(label).toBeInTheDocument();
    expect(container).toMatchSnapshot();
    
})