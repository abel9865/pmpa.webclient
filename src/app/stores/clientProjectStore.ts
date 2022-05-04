import { format } from "date-fns";
import {  makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { ClientProject } from "../models/clientProject";

export default class ClientProjectStore {

    //clientProjects: ClientProject[] = [];
    clientProjectRegistry = new Map<string, ClientProject>();
    selectedClientProject: ClientProject | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
collapsed=false;


    constructor() {

        makeAutoObservable(this)
    }

searchClientProjects=(searchValue:string)=>{
    const searchResult =  Array.from(this.clientProjectRegistry.values()).filter(x=>x.projectTitle.toLowerCase().includes(searchValue.toLowerCase()))
return searchResult;
}

    get clientProjectsByTitle() {
        return Array.from(this.clientProjectRegistry.values()).sort((a, b) =>
            //Date.parse(a.projectTitle[0]) - Date.parse(b.projectTitle[0])
            a.projectTitle.localeCompare(b.projectTitle)
        );
    }

    // get groupedClientProjectsByDate(){
    //     return Object.entries(
    //         this.clientProjectsByTitle.reduce((clientProjects, clientProject)=>{
    //             const date = format(clientProject.createdDate!, 'dd MMM yyyy');
    //             clientProjects[date] = clientProjects[date]? [...clientProjects[date], clientProject]:[clientProject];
    //             return clientProjects;
    //         }, {} as {[Key:string]:ClientProject[]})
    //     )
    // }

    loadClientProjects = async () => {
         this.loadingInitial=true;
        try {
            const clientProjects = await agent.ClientProjects.list();

            clientProjects.forEach(clientProject => {
               this.setClientProject(clientProject);
            })
            this.setLoadingInitial(false);


        } catch (error) {
            console.log(error);

            this.setLoadingInitial(false);

        }
    }

    loadClientProject = async(id:string)=>{
        let clientProject = this.getClientProject(id);
        if(clientProject){
            this.selectedClientProject = clientProject
            return clientProject;
        }
        else{
            this.loadingInitial = true;
            try {
               clientProject = await agent.ClientProjects.details(id) ;
               this.setClientProject(clientProject);
               runInAction(()=>{
                this.selectedClientProject = clientProject;
               })
              
               this.setLoadingInitial(false);
               return clientProject;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getClientProject=(id:string)=>{
return this.clientProjectRegistry.get(id);
    }

    private setClientProject=(clientProject:ClientProject)=>{
        clientProject.createdDate = new Date(clientProject.createdDate!);
        //clientProject.createdDate.split('T')[0];
        this.clientProjectRegistry.set(clientProject.projectId, clientProject);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

  

    createClientProject = async (clientProject: ClientProject) => {
        this.loading = true;
       // clientProject.projectId = uuid();
        try {
            await agent.ClientProjects.create(clientProject);
            runInAction(() => {
                this.clientProjectRegistry.set(clientProject.projectId, clientProject);
                // this.clientProjects.push(clientProject);
                this.selectedClientProject = clientProject;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateClientProject = async (clientProject: ClientProject) => {
        this.loading = true;
        try {
            await agent.ClientProjects.update(clientProject);
            runInAction(() => {
                //this.clientProjects = [...this.clientProjects.filter(x=>x.projectId!==clientProject.projectId), clientProject];

                this.clientProjectRegistry.set(clientProject.projectId, clientProject);

                this.selectedClientProject = clientProject;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteClientProject = async (id: string) => {
        this.loading = true;
        try {
            await agent.ClientProjects.delete(id);
            runInAction(() => {
                // this.clientProjects = [...this.clientProjects.filter(x=>x.projectId!==id)];
                this.clientProjectRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}