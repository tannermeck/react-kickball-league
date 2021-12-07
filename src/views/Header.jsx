import { NavLink } from 'react-router-dom'
import './header.css'

function Header(){
    return (
        <div className='headerContainer'>
            <NavLink className='header' to='/'>Home</NavLink>{' '}
            <NavLink className='header' to='/teams'>Teams</NavLink>{' '}
            <NavLink className='header' to='/players'>Players</NavLink>
        </div>
    )
}
export default Header;