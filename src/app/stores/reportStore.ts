import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from "./store";
import { ReportItem } from "../models/reportItem";


export default class ReportStore {
    reportItem: ReportItem | null = null;

    reportItemRegistry = new Map<string, ReportItem>();
    token=''
    loading = false;
    loadingInitial = false;


    constructor() {
        makeAutoObservable(this)

    }


    get reportItemsByTitle() {
        return Array.from(this.reportItemRegistry.values()).sort((a, b) =>
            //Date.parse(a.projectTitle[0]) - Date.parse(b.projectTitle[0])
            a.name.localeCompare(b.name)
        );
    }


    getReportItems = async () => {
        this.loadingInitial = true;
        try {
            const reportItems = await agent.ReportApi.getReportItems();
            //console.log(reportItems);
            reportItems.forEach(reportItem => {
                this.setReportItem(reportItem);
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


    private setReportItem = (reportItem: ReportItem) => {
       
        this.reportItemRegistry.set(reportItem.id!, reportItem);
    }




    getToken = async () => {
       
       let tkn = '';
            this.loadingInitial = true;
            try {
                 tkn = await agent.ReportApi.getReportToken();
               
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