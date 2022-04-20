import { HomePage } from './pages/HomePage.jsx'
import { Favorites } from './pages/Favorites.jsx';

// something
const routes = [
    {
        path: '/favorites',
        component: Favorites,
    },
    {
        path: '/',
        component: HomePage,
    },

]

export default routes;