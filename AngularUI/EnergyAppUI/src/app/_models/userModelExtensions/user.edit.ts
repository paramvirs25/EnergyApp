import { Roles } from "../roles";
import { UserTypes } from "../userTypes";
import { UserLogin } from "../user.login";
import { UserDetail } from "../user.details";

export class UserEdit
{
    user: UserLogin;
    userDetail: UserDetail;
    roles: Roles[];
    userTypes: UserTypes[];
}

