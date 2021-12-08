import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Header from './Header';

it('should render the header', () => {

    const { container } = render(
                            <MemoryRouter>
                                <Header />
                            </MemoryRouter>)
    expect(container).toMatchSnapshot();
})