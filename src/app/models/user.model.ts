export interface User {
    id: number,
    username: string
    name?: string
    email?: string
    password?: string
    created_at?: string
    updated_at?: string
}

export interface UserLogin { 
    email: string
    password: string
}

export interface UserRegister {
    username: string
    email: string
    password: string
    passwordConfirmation: string   

}

export interface UserVerify{
    userId: number,
    code: string
}
