export interface User {
    firstName: string;
    lastName: string;
    email: string;
    cientId: string;
    token: string;
    image?: string;
}

export interface UserFormValues {

    email: string;
    password: string;


    firtName?: string;
    lastName?: string;  
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    isAdmin?: boolean;
    active?: boolean;
    profileImage?: string
    profilePath?: string
    sysTimeZone?: string
    sysTimeOffset?: string
    adminUserId?: string
    clientId?: string

}