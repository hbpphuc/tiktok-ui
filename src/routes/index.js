import config from '~/config'

// Layout
import { HeaderOnly } from '~/layouts'

// Page
import Home from '~/pages/Home'
import Following from '~/pages/Following'
import Profile from '~/pages/Profile'
import Upload from '~/pages/Upload'
import Search from '~/layouts/components/Search'
import Live from '~/pages/Live'

export const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.following,
        component: Following,
    },
    {
        path: config.routes.profile,
        component: Profile,
        layout: HeaderOnly,
    },
    {
        path: config.routes.upload,
        component: Upload,
        layout: HeaderOnly,
    },
    {
        path: config.routes.live,
        component: Live,
    },
    {
        path: config.routes.search,
        component: Search,
    },
]

export const privateRoutes = []
