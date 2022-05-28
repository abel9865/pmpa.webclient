import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";

import { Role } from "../models/role";
import { store } from "./store";
import { v4 as uuid } from 'uuid';


export default class RoleStore {
    role: Role | null = null;

    roleRegistry = new Map<string, Role>();
    selectedRole: Role | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;


    constructor() {
        makeAutoObservable(this)

    }


    getRoles = async (id:string) => {
        this.loadingInitial = true;
        try {
            const roles = await agent.RoleApi.getRolesByProjectId(id);

            roles.forEach(role => {
                this.setRole(role);
            })
            this.setLoadingInitial(false);

//console.log(Array.from(this.roleRegistry.values()))

return Array.from(this.roleRegistry.values());


        } catch (error) {
            console.log(error);

            this.setLoadingInitial(false);

        }
    }


    private setRole = (role: Role) => {
       
        this.roleRegistry.set(role.roleId!, role);
    }




    getRole = async (id: string) => {
        let role= this.getRoleFromCache(id);
        if (role) {
            this.selectedRole = role;

           

            return role;
        }
        else {
            this.loadingInitial = true;
            try {
                role = await agent.RoleApi.details(id);
                this.setRole(role);
                runInAction(() => {
                    this.selectedRole = role;
                })

                this.setLoadingInitial(false);

               

                return role;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    getRoleFromCache = (id: string) => {
        return this.roleRegistry.get(id);
    }



    createRole = async (roleObj: Role) => {
  
        this.loading = true;
       
        try {


            let newRole = {
                ...roleObj,
                roleId: uuid()
            }
  
            const role = await agent.RoleApi.create(newRole);
           
            //update object with userId coming back from server
            roleObj.roleId = role.roleId;
            runInAction(() => {
                this.roleRegistry.set(role.roleId, roleObj);

                this.selectedRole = roleObj;
                this.editMode = false;
                this.loading = false;
               
                history.push('/security', { from: 'role' })
            })

        } catch (error) {
            throw error;

        }
    }

    updateRole = async (roleObj: Role) => {
  
        this.loading = true;
        try {

         

            await agent.RoleApi.update(roleObj);
            runInAction(() => {

                this.roleRegistry.set(roleObj.roleId!, roleObj);

                this.selectedRole = roleObj;
                this.editMode = false;
                this.loading = false;
                history.push('/security', {from:'role'})
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }


    deleteRole = async (id: string) => {
        this.loading = true;
        try {
            await agent.RoleApi.delete(id);
            runInAction(() => {
                // this.clientProjects = [...this.clientProjects.filter(x=>x.projectId!==id)];
                this.roleRegistry.delete(id);
                this.loading = false;
                history.push('/security', { from: 'role' })
                store.modalStore.closeModal();
            })
        } catch (error) {

            runInAction(() => {
                this.loading = false;
            })
        }
    }
    

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

}