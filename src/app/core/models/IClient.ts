export interface IClient {
    id: number;
    name: string;
    mobileNumber: string;
    email?: string;
    status:string
} 
export interface IStatusWiseClient{
    newUser: number;
    subscriber: number;
    incative: number;
    allUser: number;
}
