export interface IStatusWiseInvesment{
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
    statusId:number;
  }