
export interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    mobileNUmber: string;
    role: UserRoles[];
    isRider: boolean;
    myCars: Array<ICar>;
}

export enum UserRoles {
    "ROLE_ADMIN", "ROLE_USER", "ROLE_DRIVER"
}

export interface ICar {
    company: string;
    model: string;
    year: string;
    capacity: number | string;
}
