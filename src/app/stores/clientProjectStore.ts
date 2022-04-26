import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { ClientProject } from "../models/clientProject";
import { v4 as uuid } from 'uuid';

export default class ClientProjectStore {

    //clientProjects: ClientProject[] = [];
    clientProjectRegistry = new Map<string, ClientProject>();
    selectedClientProject: ClientProject | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {

        makeAutoObservable(this)
    }

get clientProjectsByTitle(){
    return Array.from(this.clientProjectRegistry.values()).sort((a, b)=>
    //Date.parse(a.projectTitle[0]) - Date.parse(b.projectTitle[0])
  a.projectTitle.localeCompare(b.projectTitle)
    );
}

    loadClientProjects = async () => {
       // this.setLoadingInitial(true);
        try {
            const clientProjects = await agent.ClientProjects.list();

            clientProjects.forEach(clientProject => {
                clientProject.createdDate = clientProject.createdDate.split('T')[0];
                this.clientProjectRegistry.set(clientProject.projectId, clientProject);
            })
            this.setLoadingInitial(false);


        } catch (error) {
            console.log(error);

            this.setLoadingInitial(false);

        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectClientProject = (id: string) => {
        this.selectedClientProject = this.clientProjectRegistry.get(id);
        //this.clientProjects.find(x => x.projectId === id);
    }

    cancelSelectedClientProject = () => {
        this.selectedClientProject = undefined;
    }

    openForm=(id?:string)=>{
        id?this.selectClientProject(id):this.cancelSelectedClientProject();
        this.editMode = true;
    }

    closeForm=()=>{
        this.editMode=false;
    }

    createClientProject = async(clientProject:ClientProject)=>{
        this.loading = true;
        clientProject.projectId = uuid();
        try {
            await agent.ClientProjects.create(clientProject);
            runInAction(()=>{
                this.clientProjectRegistry.set(clientProject.clientId, clientProject);
                // this.clientProjects.push(clientProject);
                this.selectedClientProject = clientProject;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }

    updateClientProject = async(clientProject:ClientProject)=>{
        this.loading=true;
        try {
            await agent.ClientProjects.update(clientProject);
            runInAction(()=>{
                //this.clientProjects = [...this.clientProjects.filter(x=>x.projectId!==clientProject.projectId), clientProject];
                
                this.clientProjectRegistry.set(clientProject.projectId, clientProject);
               
                this.selectedClientProject = clientProject;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }

    deleteClientProject= async(id:string)=>{
        this.loading = true;
        try {
           await agent.ClientProjects.delete(id);
           runInAction(()=>{
              // this.clientProjects = [...this.clientProjects.filter(x=>x.projectId!==id)];
              this.clientProjectRegistry.delete(id);
              if(this.selectedClientProject?.projectId===id) this.cancelSelectedClientProject();
               this.loading = false;
           })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }

}