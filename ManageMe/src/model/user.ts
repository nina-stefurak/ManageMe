interface User {
    id: string;
    username: string;
    email: string;
}

class UserManager {
    private user: User;

    //mock zalogowanego użytkownika
    constructor() {
        this.user = {
            id: '1',
            username: 'Halouser',
            email: 'halohalo@gmail.com'
        };
    }

    getLoggedUser(): User {
        return this.user;
    }

}

export { UserManager };

