import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";

import { User, UserFormValues } from "../models/user";
import { store } from "./store";
import { v4 as uuid } from 'uuid';


export default class UserStore {
    user: User | null = null;

    registeredUserRegistry = new Map<string, UserFormValues>();
    selectedUser: UserFormValues | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;


    constructor() {
        makeAutoObservable(this)

    }

    // Authentication functions

    get isLoggedIn() {

        //!! cast object into boolean
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);

            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);

            history.push('/clientProjects')
            store.modalStore.closeModal();

        } catch (error) {
            throw error;

        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getUser = async () => {
        try {

            const user = await agent.Account.current();
            runInAction(() => this.user = user);

        } catch (error) {
            console.log(error);
        }
    }

    // User Management functions

    addUser = async (creds: UserFormValues) => {
  
        this.loading = true;
        // clientProject.projectId = uuid();
        try {


            let newUser = {
                ...creds,
                userId: uuid()
            }
  
            const user = await agent.Account.addUser(newUser);
           
            //update object with userId coming back from server
            creds.userId = user.userId;
            runInAction(() => {
                this.registeredUserRegistry.set(user.userId, creds);

                this.selectedUser = creds;
                this.editMode = false;
                this.loading = false;
               
                history.push('/security')
            })

            // store.commonStore.setToken(user.token);
            // runInAction(()=> this.user = user);


            //store.modalStore.closeModal();

        } catch (error) {
            console.log(error);
            throw error;

        }
    }


    updateUser = async (creds: UserFormValues) => {
        
        this.loading = true;
        try {
            await agent.Account.updateUser(creds);
            runInAction(() => {

                this.registeredUserRegistry.set(creds.userId!, creds);

                this.selectedUser = creds;
                this.editMode = false;
                this.loading = false;
                history.push('/security')
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteUser = async (id: string) => {
        this.loading = true;
        try {
            await agent.Account.deleteUser(id);
            runInAction(() => {
                // this.clientProjects = [...this.clientProjects.filter(x=>x.projectId!==id)];
                this.registeredUserRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {

            runInAction(() => {
                this.loading = false;
            })
        }
    }

    getRegisteredUsers = async () => {
        this.loadingInitial = true;
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

    private setUser = (user: UserFormValues) => {
        if (user.password === undefined || user.password === null) { user.password = '' }

        if (user.profileImage === undefined || user.profileImage === null) { user.profileImage = '' }

        if (user.profilePath === undefined || user.profilePath === null) { user.profilePath = '' }
        //clientProject.createdDate = new Date(clientProject.createdDate!);
        //clientProject.createdDate.split('T')[0];
        this.registeredUserRegistry.set(user.userId!, user);
    }

    getRegisteredUser = async (id: string) => {
        let registeredUser = this.getRegisteredUserFromCache(id);
        if (registeredUser) {
            this.selectedUser = registeredUser;

            console.log(registeredUser);

            return registeredUser;
        }
        else {
            this.loadingInitial = true;
            try {
                registeredUser = await agent.Account.getRegisteredUser(id);
                this.setUser(registeredUser);
                runInAction(() => {
                    this.selectedUser = registeredUser;
                })

                this.setLoadingInitial(false);

                console.log(registeredUser);

                return registeredUser;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    getRegisteredUserFromCache = (id: string) => {
        return this.registeredUserRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

}