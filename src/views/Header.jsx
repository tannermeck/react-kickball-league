import { NavLink } from 'react-router-dom'

function Header(){
    return (
        <>
            <NavLink to='/'>Home</NavLink>{' '}
            <NavLink to='/teams'>Teams</NavLink>{' '}
            
        </>
    )
}
export default Header;