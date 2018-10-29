import { Roles } from "../roles";
import { UserTypes } from "../userTypes";
import { UserLogin } from "../user.login";
import { UserDetails } from "../user.details";

export class UserEdit
{
    user: UserLogin;
    userdetail: UserDetails;
    roles: Roles[];
    userTypes: UserTypes[];
}

