export interface IUserCreate {
    name: string;
    username: string;
    password: string
    mobileNumber: string;
    email?: string;
}

export interface IUserFullDetails {
    id: number;
    name: string;
    username: string;
    mobileNumber: string;
    status: number;
    statusName: string;
    email?: string | null;
    bankName?: string | null;
    ifscCode?: string | null;
    branchName?: string | null;
    accountNumber?: string | null;
    accountHolderName?: string | null;
    accountType?: number | null;
}
