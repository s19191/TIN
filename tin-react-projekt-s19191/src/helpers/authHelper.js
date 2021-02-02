export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
};

export function isAuthenticated() {
    const user = getCurrentUser();
    if (user) {
        return true;
    };
    return false;
};

export function isCreatorOrAdmin(creatorId) {
    const user = getCurrentUser();
    if (user.Role === "Admin" || user.userId === creatorId) {
        return true;
    };
    return false;
};