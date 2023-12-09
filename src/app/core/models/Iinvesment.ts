export interface IStatusWiseInvesment {
    allInvesments: number;
    activeInvesments: number;
    returnedInvesments: number;
    retrunPendingInvesments: number;
}
export interface IInvestments {
    id: number;
    clientName: string;
    schemeName: string;
    tenureNameWithValue: string;
    amount: number;
    ratePer: number;
    invesmentDate: string;
    statusId: number;
}

export interface IInsertInvestment {
    userId: number;
    schemeId: number;
    tenureId: number;
    amount: number;
    ratePer: number;
    paymentMethodId: number;
    paymentMethodDoc: string;
    investmentDate: Date;
}

export interface IInvestmentReturn {
    InvestmentId: number,
    Amount: number,
    PaymentMethod: number,
    DocumnetNumber: string,
    Remarks: string,
}