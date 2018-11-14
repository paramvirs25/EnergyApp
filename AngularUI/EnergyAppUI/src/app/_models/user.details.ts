import { UserDetailBase } from './user.details.base';
import { UserDetailBaseAdmin } from './user.details.base.admin';

export class UserDetail extends UserDetailBaseAdmin {
    isDeleted: boolean;
    createdDate: string;
    createdBy: number;
    modifiedDate: string;
    modifiedBy: number;
}
