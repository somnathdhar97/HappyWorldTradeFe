export interface IStatusWiseInvesment {
    allInvesments: number;
    activeInvesments: number;
    returnedInvesments: number;
    retrunPendingInvesments: number;
    unApprovedInvesments: number;
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
    investmentAttachment: Uint8Array;
    paymentDetails: string;
}

export interface IInsertInvestment {
    userId: number;
    schemeId: number;
    tenureId: number;
    amount: number;
    ratePer: number;
    paymentMethodId: number;
    // paymentMethodDoc: string;
    investmentDate: string;
    SchemeValue: number;
    TenureValue: number;
    Remarks: string;
}

export interface IInvestmentReturn {
    investmentId: number;
    paymentMethodId: number;
    paymentMethodDoc: string;
    remarks: string;
    returnDate: string;
}

export interface IUpcomingReturn {
    id: number;
    clientName: string;
    schemeName: string;
    tenureNameWithValue: string;
    amount: number;
    ratePer: number;
    invesmentDate: string; // Assuming the date is represented as a string (you can adjust this based on your needs)
    statusId: number;
    status: string;
    remarks: string;
}

export interface IPendingReturn { }

export interface IRecenetInvestments { }

export interface approveInvestments {
    id: number;
    percentageRate: number;
}
