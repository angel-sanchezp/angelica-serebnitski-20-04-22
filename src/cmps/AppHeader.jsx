import { NavLink } from 'react-router-dom'

export function AppHeader() {


    return (
        <header className="app-header" >
            <div className='logo' onClick={() => this.props.history.push('/')}>
                <img src="./img/logo.png" alt="logo" />
            </div>

            <nav className="main-nav">
                <NavLink activeClassName="my-active" exact to="/">Home</NavLink>
                <NavLink to="/Favorites">Favorites</NavLink>
            </nav>
        </header>
    )
}