export const ROUTES = {
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register',
        FORGOT_PASSWORD: '/forgot-password',
    },
    DASHBOARD: {
        ROOT: '/dashboard',
        ORDERS: '/dashboard/orders',
        CUSTOMERS: '/dashboard/customers',
        SETTINGS: '/dashboard/settings',
    },
} as const;
