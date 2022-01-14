interface IUser {
    id: string;
    username: string;
}

// Datos
const activeUsers: IUser[] = [];

// Repositorio para mutar datos
const getCurrentUser = (id: string) => activeUsers.find(u => u.id === id);

const userJoin = (newUser: IUser): void => {
    activeUsers.push(newUser);
};

const userLeaves = (id: string): IUser => activeUsers.splice(activeUsers.findIndex(u => u.id === id), 1)[0];


const getOnlineUsers = (): IUser[] => activeUsers;

export const userMethods = {
    getCurrentUser,
    userJoin,
    userLeaves,
    getOnlineUsers
};