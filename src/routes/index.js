// Layout
import { HeaderOnly } from '~/components/Layouts'

// Page
import Home from '~/components/pages/Home'
import Following from '~/components/pages/Following'
import Profile from '~/components/pages/Profile'
import Upload from '~/components/pages/Upload'

export const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/following',
        component: Following,
    },
    {
        path: '/profile',
        component: Profile,
    },
    {
        path: '/upload',
        component: Upload,
        layout: HeaderOnly,
    },
]

export const privateRoutes = []
