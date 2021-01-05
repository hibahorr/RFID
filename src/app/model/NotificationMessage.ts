export class NotificationMessage{
    message: string;
    type: NotificationType;
}
export enum NotificationType{
    success ,
    warning ,
    error,
    info
}
