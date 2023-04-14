import routesConfig from '~/config/routes'

// Layout
import { HeaderOnly } from '~/components/Layouts'

// Page
import Home from '~/pages/Home'
import Following from '~/pages/Following'
import Profile from '~/pages/Profile'
import Upload from '~/pages/Upload'
import Search from '~/components/Layouts/components/Search'

export const publicRoutes = [
    {
        path: routesConfig.home,
        component: Home,
    },
    {
        path: routesConfig.following,
        component: Following,
    },
    {
        path: routesConfig.profile,
        component: Profile,
    },
    {
        path: routesConfig.upload,
        component: Upload,
        layout: HeaderOnly,
    },
    {
        path: routesConfig.search,
        component: Search,
    },
]

export const privateRoutes = []
