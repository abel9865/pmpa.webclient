export interface UserAcctRecoveryDetail{
    id?: string,
    userId?:string;
    recoveryToken:string;
    status?: string ;
    requestCreateDate?:string;
    requestCompleteDate?: string;
    oldPassword?: string;
    newPassword: string ;
}