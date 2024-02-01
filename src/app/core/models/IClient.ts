export interface IClient {
    id: number;
    name: string;
    mobileNumber: string;
    email?: string;
    status: string;
    statusName: string;
}
export interface INewUser {
    name: string;
    username: string;
    password: string
    mobileNumber: string;
    email?: string;
}
export interface IBankDetails {
    bankName: string;
    ifscCode: string;
    branchName: string;
    accountHolderName: string;
    accountNumber: string;
    pan: string;
    accountType: number;
  }
export interface INewClinet{
    personalDeatils:INewUser,
    bankDeatils:IBankDetails,
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
    StatusName: string;
}

export interface IForgetPassword {
    email?: string;
    password: string;
} 