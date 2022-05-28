export interface Role{
    roleId:string;
    roleName:string;
    active: boolean ;
    createdBy:string;
    createdDate: string;
    lastUpdatedBy: string;
    lastUpdatedDate: string | null;
    projectId: string,
    clientId: string
}


