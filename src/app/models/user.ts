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
    profileImage?: string
    profilePath?: string
    sysTimeZone?: string
    sysTimeOffset?: string
    clientSideChangeBy?: string
    clientId?: string
    userId?:string
    // error?:string
    //error?:string |null

}