import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

it('should create a home component', () => {
    const { container } = render(
                            <MemoryRouter>
                                <Home />
                            </MemoryRouter>)
    const label = screen.getByText('Welcome to Kickball League', {exact: false})
    
    expect(label).toBeInTheDocument();
    expect(container).toMatchSnapshot();
})