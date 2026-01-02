import settings from "./environment";

export const API_ROUTES = {
    AUTH_LOGIN: settings.api.url + "auth/login",
    AUTH_LOGOUT: settings.api.url + "auth/logout",
    REFRESH_TOKEN: settings.api.url + "auth/refresh",
    USER_PROFILE: settings.api.url + "auth/profile",
    FORGOT_PASSWORD: settings.api.url + "auth/forgot-password",
    RESET_PASSWORD: settings.api.url + "auth/reset-password",

    DASHBOARD_STATS: settings.api.url + "dashboard/stats",
    GLOBAL_SEARCH: settings.api.url + "dashboard/search",

    ORDERS_LIST: settings.api.url + "orders",
    ORDER_DETAILS: (id: string) => settings.api.url + `orders/${id}`,
    NDR_LIST: settings.api.url + "orders/ndr",
    RTO_LIST: settings.api.url + "orders/rto",

    SERVICE_REQUESTS: settings.api.url + "service/requests",
    DISPATCH_BOARD: settings.api.url + "service/dispatch",
    WARRANTY_CLAIMS: settings.api.url + "service/warranty",

    SELLERS_LIST: settings.api.url + "sellers",
    SELLER_DETAILS: (id: string) => settings.api.url + `sellers/${id}`,
    SELLER_ONBOARDING: settings.api.url + "sellers/onboard",

    SETTLEMENTS: settings.api.url + "finance/settlements",
    GST_REPORTS: settings.api.url + "finance/gst-reports",

    GRIEVANCES: settings.api.url + "support/grievances",
    TICKETS: settings.api.url + "support/tickets",

    ROLES: settings.api.url + "system/roles",
    USERS: settings.api.url + "system/users",
} as const;
