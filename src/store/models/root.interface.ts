
import { INotification } from "./notification.interface";
import { IUser } from "./user.interface";
import { IAccount } from "./account.interface";

export interface IRootPageStateType {
    area: string;
    subArea: string;
}

export interface IRootStateType {
    page: IRootPageStateType;
}
export interface IStateType {
    root: IRootStateType;
    notifications: INotificationState;
    users: IUserState;
    account: IAccount;
}


export interface IActionBase {
    type: string;
    [prop: string]: any;
}

export interface INotificationState {
    notifications: INotification[];
}

export interface IUserState {
    users: IUser[];
    admins: IUser[];
}