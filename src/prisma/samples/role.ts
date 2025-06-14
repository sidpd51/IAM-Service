export const roles = [
    {
        name: 'admin',
        description: 'Has full administrative access including user management, trainer onboarding, scheduling, and system configurations.',
    },
    {
        name: 'manager',
        description: 'Can manage trainers, class schedules, and memberships, but cannot modify system-level settings or other admin users.',
    },
    {
        name: 'trainer',
        description: 'Can manage their own class schedules, view member attendance, and interact with assigned users.',
    },
    {
        name: 'user',
        description: 'Regular app user with access to browse, book, and attend fitness sessions, track progress, and manage their profile and subscriptions.',
    }
];