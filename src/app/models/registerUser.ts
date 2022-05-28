import { Role } from "./role";

export interface RegisterUser {
    firtName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isAdmin: boolean;
    active: boolean;
    profileImage: string;
    profilePath: string;
    sysTimeZone: string;
    sysTimeOffset: string;
    clientSideChangeBy: string;
    userId: string | null;
    clientId: string;
    roles?:Role[]
}