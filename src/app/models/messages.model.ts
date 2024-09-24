export interface Message {
    id: number,
    message: string,
    userId: number,
    roomId: number,
    createdAt?: string
    updatedAt?: string
    deletedAt?: string
}

export interface CreateMessage {
    message: string,
    roomId: number
}


