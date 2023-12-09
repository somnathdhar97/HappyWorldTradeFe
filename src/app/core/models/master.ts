export interface ITenure {
    id: number,
    name: string
}

export interface IScheme {
    Id: number,
    name: string
}

export interface IUser {
    id: number,
    name: string,
    mobileNumber: string,
    status: number,
    email: string
}

export interface IPaymentMethod {
    id: number,
    name: string
}

export interface IInvestment {
    UserId: number,
    SchemeId: number,
    TenureId: number,
    Amount: number,
    RatePer: number,
    InvesmentDate: Date,
    PaymentMethod: number,
    DocumnetNumber: string,
}

export interface IReturn {
    InvestmentId: number,
    Amount: number,
    PaymentMethod: number,
    DocumnetNumber: string,
    Remarks: string,
}