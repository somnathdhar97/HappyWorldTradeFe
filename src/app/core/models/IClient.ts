export interface IClient {
    id: number;
    name: string;
    mobileNumber: string;
    email?: string;
    status: string
}
export interface INewUser {
    name: string;
    username: string;
    password: string
    mobileNumber: string;
    email?: string;
}
export interface IStatusWiseClient {
    newUser: number;
    subscriber: number;
    incative: number;
    allUser: number;
}

export interface IChangeStatus {
    id: number;
    status: number;
}

export interface IAdmins {
    id: number;
    name: string;
    mobileNumber: string;
    email?: string;
    status: string;
    StatusName: string
} 