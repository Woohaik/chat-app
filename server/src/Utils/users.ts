const users: { id: number, username: string, room: number }[] = []


const userJoin = (id: number, username: string, room: number) => {
    users.push({ id, username, room })
}


const getCurrentUser = (id: number) => {
    return users.find(u => u.id === id)
}