export type UserType = {
    fullName: string,
    email: string,
    password: string
}

export type PasswordType = {
    userId: string,
    password: string,
    criteria: {
        passwordLength: number,
        includeUppercase: boolean,
        includeLowercase: boolean,
        includeNumbers: boolean,
        includeSymbols: boolean,
    },
    createdAt: Date
}