export interface INotification {
    id?: number;
    name: string;
    message: string;
    type: number;
    status?: number;
    validFrom: Date;
    validTo: Date;
}
export interface INotificationStatus {
    id?: number;
    status: number;
}