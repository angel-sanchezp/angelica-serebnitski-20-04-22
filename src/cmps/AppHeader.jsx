import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


export function AppHeader() {
   const history =useHistory()


    return (
        <header className="app-header" >
                <div className='logo' onClick={() => history.push('/')}>
                    <img src="./img/logo.png" alt="logo" />
                </div>

            <nav className="main-nav">
                <NavLink activeClassName="my-active" exact to="/">Home</NavLink>
                <NavLink to="/Favorites">Favorites</NavLink>
            </nav>
        </header>
    )
}