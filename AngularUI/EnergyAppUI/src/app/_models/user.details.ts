import { UserDetailBase } from './user.details.base';

export class UserDetail extends UserDetailBase {
    isDeleted: boolean;
    createdDate: string;
    createdBy: number;
    modifiedDate: string;
    modifiedBy: number;
}
