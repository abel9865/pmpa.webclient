import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from "./store";
import { ReportItem } from "../models/reportItem";
import { DashboardItem } from "../models/dashboardItem";
import { history } from "../..";

export default class DashboardStore {
    dashboardItem: DashboardItem | null = null;

    dashboardItemRegistry = new Map<string, DashboardItem>();
    token=''
    loading = false;
    loadingInitial = false;


    constructor() {
        makeAutoObservable(this)

    }


    get dashboardItemsByTitle() {
        return Array.from(this.dashboardItemRegistry.values()).sort((a, b) =>
            //Date.parse(a.projectTitle[0]) - Date.parse(b.projectTitle[0])
            a.name.localeCompare(b.name)
        );
    }


    getDashboardItems = async () => {
        this.loadingInitial = true;
        try {
            const dashboardItems = await agent.DashboardApi.getDashboardItems();
            //console.log(reportItems);
            dashboardItems.forEach(dashboardItem => {
                this.setDashboardItem(dashboardItem);
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


    private setDashboardItem = (dashboardItem: DashboardItem) => {
       
        this.dashboardItemRegistry.set(dashboardItem.id!, dashboardItem);
    }



    deleteDashboard = async (id: string) => {
        this.loading = true;
        try {
            await agent.DashboardApi.deleteDashboard(id);
            runInAction(() => {
                // this.clientProjects = [...this.clientProjects.filter(x=>x.projectId!==id)];
                this.dashboardItemRegistry.delete(id);
                this.loading = false;
                history.push('/dashboards')
                store.modalStore.closeModal();

            })
        } catch (error) {

            runInAction(() => {
                this.loading = false;
            })
        }
    }


    getToken = async () => {
       
       let tkn = '';
            this.loadingInitial = true;
            try {
                 tkn = await agent.DashboardApi.getDashboardToken();
               
                runInAction(() => {
                    this.token = tkn;
                })

                this.setLoadingInitial(false);

               

                return tkn;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

}