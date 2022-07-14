import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from "./store";
import { history } from "../..";
import { WorkFlowItem } from "../models/workFlowItem";

export default class WorkFlowStore {
    workFlowItem: WorkFlowItem | null = null;

    workFlowItemRegistry = new Map<string, WorkFlowItem>();
    
    loading = false;
    loadingInitial = false;


    constructor() {
        makeAutoObservable(this)

    }


    get workFlowItemsByTitle() {
        return Array.from(this.workFlowItemRegistry.values()).sort((a, b) =>
            //Date.parse(a.projectTitle[0]) - Date.parse(b.projectTitle[0])
            a.name.localeCompare(b.name)
        );
    }


    getWorkFlowItems = async (id: string) => {
        this.loadingInitial = true;
        try {
            const workFlowItems = await agent.WorkFlowApi.getWorkFlows(id);
            //console.log(reportItems);
            workFlowItems.forEach(workFlowItem => {
                this.setWorkFlowItem(workFlowItem);
            })
            this.setLoadingInitial(false);

//console.log(Array.from(this.reportItemRegistry.values()))
//console.log(Array.from(this.reportItemRegistry))
//return Array.from(this.reportItemRegistry.values());


        } catch (error) {
            console.log(error);

            this.setLoadingInitial(false);

        }
    }


    private setWorkFlowItem = (workFlowItem: WorkFlowItem) => {
       
        this.workFlowItemRegistry.set(workFlowItem.id!, workFlowItem);
    }



    deleteWorkFlow = async (id: string) => {
        this.loading = true;
        try {
            
            await agent.WorkFlowApi.deleteWorkFlow(id);
            runInAction(() => {
                // this.clientProjects = [...this.clientProjects.filter(x=>x.projectId!==id)];
                this.workFlowItemRegistry.delete(id);
                this.loading = false;
                history.push('/workflows')
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