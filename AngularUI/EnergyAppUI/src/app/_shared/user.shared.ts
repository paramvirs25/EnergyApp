import { UserAuthenticated } from '../_models';

export class UserShared {
  private static readonly CURRENT_USER = 'currentUser';

  isUserLoggedIn(): Boolean {
    return this.getLoggedInUser() != null;
  }

  getLoggedInUser(): UserAuthenticated {
    let currentUser = localStorage.getItem(UserShared.CURRENT_USER);
    if (currentUser) {
      return JSON.parse(currentUser);
    }

    return null;
  }

  setLoggedInUser(user: UserAuthenticated) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem(UserShared.CURRENT_USER, JSON.stringify(user));
  }

  removeLoggedInUser() {
    // remove user from local storage to log user out
    localStorage.removeItem(UserShared.CURRENT_USER);
  }
}
