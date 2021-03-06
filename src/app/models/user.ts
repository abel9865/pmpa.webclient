import { Role } from "./role";

export interface User {
    userId:string;
    firstName: string;
    lastName: string;
    email: string;
    clientId: string;
    token: string;
    image?: string;
}

export interface UserFormValues {

    email: string;
    password: string;


    firstName?: string;
    lastName?: string;  
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    phoneNumber?:string;
    isAdmin?: boolean;
    active?: boolean;
    imageId?: string
    imagePath?: string
    //sysTimeZone?: string
    //sysTimeOffset?: string
    clientSideChangeBy?: string
    clientId?: string
    userId?:string,
    roles?:Role[]
    // error?:string
    //error?:string |null

}