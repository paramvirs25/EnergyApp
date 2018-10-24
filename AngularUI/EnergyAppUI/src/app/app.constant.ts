export class AppConstants {
    //public static adminLoginComponentPath = 'admin';
    public static get adminLoginComponentPath(): string { return "admin"; }
    public static get clientLoginComponentPath(): string { return "login"; }
    public static get homeComponentPath(): string { return "home"; }
    public static get dashboardComponentPath(): string { return "dashboard"; }
    public static get userListComponentPath(): string { return "userlist"; }
    public static get userDetailComponentPath(): string { return "userdetail/:id"; }

}
