import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";

import { User, UserFormValues } from "../models/user";
import { store } from "./store";
import { v4 as uuid } from 'uuid';
import { PasswordRequestObj } from "../models/passwordRequestObj";


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

            //set localStorage values for token, clientId, and userId
            store.commonStore.setToken(user.token);
            window.localStorage.setItem('cid', user.clientId);
            window.localStorage.setItem('pid', user.userId);


            const rptToken = await agent.ReportApi.getReportToken();
            //set localStorage for rptToken
            window.localStorage.setItem('tk1', rptToken);
            store.commonStore.setReportToken(rptToken);

            runInAction(() => this.user = user);

            history.push('/clientProjects')
            store.modalStore.closeModal();





        } catch (error) {
            throw error;

        }
    }

    logout = () => {
        this.clearLocalStorage()
        this.user = null;
        history.push('/');
    }

    sendPasswordResetEmail = async (values: any) => {
        try {
            console.log(values);
            var passwordRequestObj: PasswordRequestObj = { email: values.email, url: window.location.href };
            var opResult = await agent.Account.ResetPassword(passwordRequestObj);
            //store.modalStore.closeModal();
        } catch (error) {

        }
    }


    clearLocalStorage = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        window.localStorage.removeItem('cid');
        window.localStorage.removeItem('pjid');
        window.localStorage.removeItem('pid');
        window.localStorage.removeItem('tk1');

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

            console.log(creds);

            const user = await agent.Account.addUser(newUser);

            //update object with userId coming back from server
            creds.userId = user.userId;
            runInAction(() => {
                this.registeredUserRegistry.set(user.userId, creds);

                this.selectedUser = creds;
                this.editMode = false;
                this.loading = false;

                history.push('/security', { from: 'user' })
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

            console.log(history.location);


            await agent.Account.updateUser(creds);
            runInAction(() => {

                this.registeredUserRegistry.set(creds.userId!, creds);

                this.selectedUser = creds;
                this.editMode = false;
                this.loading = false;
                history.push('/security', { from: 'user' })
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
                history.push('/security', { from: 'user' })
                store.modalStore.closeModal();

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

            console.log(Array.from(this.registeredUserRegistry.values()))


        } catch (error) {
            console.log(error);

            this.setLoadingInitial(false);

        }
    }

    private setUser = (user: UserFormValues) => {
        if (user.password === undefined || user.password === null) { user.password = '' }

        if (user.imageId === undefined || user.imageId === null) { user.imageId = '' }

        if (user.imagePath === undefined || user.imagePath === null) { user.imagePath = '' }
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

        // console.log('id to search ; ' + id);
        // console.log(Array.from(this.registeredUserRegistry.values()));
        return this.registeredUserRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

}