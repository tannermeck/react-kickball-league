import { NavLink } from 'react-router-dom'

function Header(){
    return (
        <>
            <NavLink to='/'>Home</NavLink>{' '}
            <NavLink to='/teams'>Teams</NavLink>{' '}
            <NavLink to='/players'>Players</NavLink>
        </>
    )
}
export default Header;