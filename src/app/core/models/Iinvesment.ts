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
    status: string;
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
    SchemeValue: number;
    TenureValue: number;
    Remarks: string
}

export interface IInvestmentReturn {
    investmentId: number,
    paymentMethodId: number,
    paymentMethodDoc: string,
    remarks: string,
    returnDate: string,
}

export interface IUpcomingReturn {

}

export interface IPendingReturn {

}

export interface IRecenetInvestments {

}