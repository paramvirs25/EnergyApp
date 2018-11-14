import { Roles } from "../roles";
import { UserTypes } from "../userTypes";
import { UserLogin } from "../user.login";
import { UserDetailBaseAdmin } from "../user.details.base.admin";

export class UserEdit
{
    user: UserLogin;
    userDetailsBaseAdmin: UserDetailBaseAdmin;
    roles: Roles[];
    userTypes: UserTypes[];
}

