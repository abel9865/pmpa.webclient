import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { RegisterUser } from "../models/registerUser";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore{
    user:User|null=null;

    registeredUserRegistry = new Map<string, UserFormValues>();
    selectedUser: UserFormValues | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;


    constructor() {
       makeAutoObservable(this)
        
    }

    get isLoggedIn(){

        //!! cast object into boolean
        return !!this.user;
    }

    login=async (creds:UserFormValues)=>{
        try {
            const user = await agent.Account.login(creds);

            store.commonStore.setToken(user.token);
            runInAction(()=> this.user = user);
           
          history.push('/clientProjects')
          store.modalStore.closeModal();
            
        } catch (error) {
            throw error;
            
        }
    }

    logout=()=>{
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getUser=async()=>{
        try {
            
            const user = await agent.Account.current();
            runInAction(()=> this.user=user);

        } catch (error) {
            console.log(error);
        }
    }

    addUser=async(creds:UserFormValues)=>{
       
            this.loading = true;
            // clientProject.projectId = uuid();
             try {
                 const user =  await agent.Account.addUser(creds);
                 creds.userId = user.userId;
                 runInAction(() => {
                     this.registeredUserRegistry.set(user.userId, creds);
                     // this.clientProjects.push(clientProject);
                     //this.selectedClientProject = clientProject;
                     this.editMode = false;
                     this.loading = false;

                     history.push('/users')
                 })



           // store.commonStore.setToken(user.token);
           // runInAction(()=> this.user = user);
           
         
          //store.modalStore.closeModal();
            
        } catch (error) {
            throw error;
            
        }
    }
    

    getAllUsers = async()=>{
        this.loadingInitial=true;
        try {
            const users = await agent.Account.list();

            users.forEach(user => {
               this.setUser(user);
            })
            this.setLoadingInitial(false);


        } catch (error) {
            console.log(error);

            this.setLoadingInitial(false);

        }
    }

    private setUser=(user:UserFormValues)=>{
        //clientProject.createdDate = new Date(clientProject.createdDate!);
        //clientProject.createdDate.split('T')[0];
        this.registeredUserRegistry.set(user.userId!, user);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

}