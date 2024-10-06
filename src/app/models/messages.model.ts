export interface User {
    id: number,
    username: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    deletedAt?: string | null
}

export interface Message {
    id: number,
    message: string,
    userId: number,
    roomId: number,
    createdAt: string,
    updatedAt: string,
    deletedAt?: string | null,
    user1: User,
    user2: User
}

export interface CreateMessage {
    message: string,
    roomId: number
}