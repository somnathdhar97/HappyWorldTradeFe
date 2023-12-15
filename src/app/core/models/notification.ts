export interface INotification {
    id?: number;
    name: string;
    message: string;
    type: number;
    status?: number;
    validFrom: string;
    validTo: string;
}
export interface INotificationStatus {
    id?: number;
    status: number;
}