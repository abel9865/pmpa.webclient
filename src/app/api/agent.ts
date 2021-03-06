import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';

import { ClientProject } from '../models/clientProject';
import { User, UserFormValues } from '../models/user';
import { Role } from '../models/role';
import { store } from '../stores/store';
import { Photo } from '../models/photo';
import { PasswordRequestObj } from '../models/passwordRequestObj';
import { ReportItem } from '../models/reportItem';
import { UserAcctRecoveryDetail } from '../models/userAcctRecoveryDetail';
import { DashboardItem } from '../models/dashboardItem';
import { WorkFlowItem, WorkFlowItems } from '../models/workFlowItem';


const sleep = (delay: number) => {
    return new Promise((resolve =>
        setTimeout(resolve, delay)
    ))
}

axios.defaults.baseURL = 'http://localhost:5000';

axios.interceptors.request.use(config=>{
    const token = store.commonStore.token;
    if(token) config.headers!.Authorization=`Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {

   // await sleep(1000);
    return response;

}, (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {


        case 400:
            if (typeof data === 'string') {
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('not-found')
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key]);
                      
                    }
                }
                throw modalStateErrors.flat();
            }

            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            history.push('/not-found');
            // toast.error('not found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const ClientProjects = {
    list: () => requests.get<ClientProject[]>('/ClientProject/GetAllClientProjects'),
    details: (id: string) => requests.get<ClientProject>(`/ClientProject/GetClientProjectByProjectId/${id}`),
    getClientProjectsByClientId: (id: string) => requests.get<ClientProject[]>(`/ClientProject/GetClientProjectsByClientId/${id}`),
    create: (clientProject: ClientProject) => axios.post<void>('/ClientProject', clientProject),
    update: (clientProject: ClientProject) => axios.put<void>(`/ClientProject/${clientProject.projectId}`, clientProject),
    delete: (id: string) => axios.delete<void>(`/ClientProject/${id}`)

}

const Account={
    list:()=> requests.get<UserFormValues[]>('/account/getallusers'),
    getRegisteredUser:(id:string)=>requests.get<UserFormValues>(`/account/getregistereduser/${id}`),
    current:()=> requests.get<User>('/account'),
    login:(user:UserFormValues)=>requests.post<User>('/account/login', user),
    SendPasswordEmail:(obj:PasswordRequestObj)=>requests.post<void>('/account/SendPasswordEmail', obj),
    ResetPassword:(obj:UserAcctRecoveryDetail)=>requests.post<void>('/account/ChangePassword', obj),
    addUser:(user:UserFormValues)=>requests.post<User>('/account/adduser', user),

    updateUser: (user: UserFormValues) => axios.put<void>(`/account/edituser/${user.userId}`, user),
    deleteUser: (id: string) => axios.delete<void>(`/account/${id}`),
}


const RoleApi={
    list:()=> requests.get<Role[]>('/role/getallroles'),
    details:(id:string)=>requests.get<Role>(`/role/getrolesbyroleid/${id}`),
getRolesByProjectId: (id:string)=>requests.get<Role[]>(`/role/getrolesbyprojectid/${id}`),
getRolesByClientId: (id:string)=>requests.get<Role[]>(`/role/getrolesbyclientid/${id}`),
    create:(role:Role)=>requests.post<Role>('/role', role),

    update: (role: Role) => axios.put<void>(`/role/${role.roleId}`, role),
    delete: (id: string) => axios.delete<void>(`/role/${id}`),
}

const Profiles={
    uploadPhoto:(file:Blob)=>{
        let formData = new FormData;
        formData.append('File', file);
        return axios.post<Photo>('photos', formData, {
            headers:{'Content-type':'multipart/form-data'}
        })
    }
}

const ReportApi={
  
getReportToken: ()=>requests.get<string>('/report/getreporttoken'),
getReportItems: ()=>requests.get<ReportItem[]>('/report/getreportitems'),
deleteReport: (id:string)=>requests.post<void>(`/report/deleteReport/${id}`, id) 

}


const DashboardApi={
  
    getDashboardToken: ()=>requests.get<string>('/dashboard/getDashboardToken'),
    getDashboardItems: ()=>requests.get<DashboardItem[]>('/dashboard/getDashboardItems'),
    deleteDashboard: (id:string)=>requests.post<void>(`/dashboard/deleteDashboard/${id}`, id) 
       
    }

    const WorkFlowApi={
        getWorkFlows:(id:string)=>requests.get<WorkFlowItem[]>(`/workflow/getWorkFlows/${id}`),
        deleteWorkFlow: (id:string)=>requests.post<void>(`/workflow/deleteWorkFlow/${id}`, id) 
    }

    const DataSourceApi={
        getDataSources:()=>requests.get<DashboardItem[]>(`/DataSource/getDataSourceItems`),
        deleteDataSource: (id:string)=>requests.post<void>(`/DataSource/deleteDataSource/${id}`, id) 
    }

const agent = {
    ClientProjects,
    Account,
    RoleApi,
    Profiles,
    ReportApi,
    DashboardApi,
    WorkFlowApi,
    DataSourceApi
}

export default agent;