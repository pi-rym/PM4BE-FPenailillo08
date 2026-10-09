

export interface ICreateUser{
    name: string,
    email: string,
    password: string,
    address: string,
    phone: number,
    country: string,
    city: string,
}

export interface IUpdateUser extends Partial<ICreateUser>{}