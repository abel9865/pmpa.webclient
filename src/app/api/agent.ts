import axios, { AxiosResponse } from 'axios';

import { ClientProject } from '../models/clientProject';


const sleep = (delay: number)=>{
    return new Promise((resolve=>
        setTimeout(resolve, delay)
        ))
}

axios.defaults.baseURL='http://localhost:5000';

axios.interceptors.response.use(async response=>{
   try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T>(response: AxiosResponse<T>)=> response.data;

const requests={
    get:<T>(url:string)=>axios.get<T>(url).then(responseBody),
    post:<T>(url:string, body:{})=>axios.post<T>(url, body).then(responseBody),
    put:<T>(url:string, body:{})=>axios.put<T>(url, body).then(responseBody),
    del:<T>(url:string)=>axios.delete<T>(url).then(responseBody),
}

const ClientProjects = {
    list:()=> requests.get<ClientProject[]>('/ClientProject/GetAllClientProjects'),
    details:(id:string)=>requests.get<ClientProject>(`/ClientProject/GetClientProjectByProjectId/${id}`),
    create:(clientProject:ClientProject)=> axios.post<void>('/ClientProject', clientProject),
    update: (clientProject:ClientProject)=> axios.put<void>(`/ClientProject/${clientProject.projectId}`, clientProject),
    delete:(id:string)=>axios.delete<void>(`/ClientProject/${id}`)

}

const agent={
    ClientProjects
}

export default agent;