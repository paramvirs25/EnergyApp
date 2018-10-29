import { Roles } from "../roles";
import { UserTypes } from "../userTypes";

export class UserCreate {
    roles: Roles[];
    userTypes: UserTypes[];
}
