import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { ClientProject } from "../models/clientProject";

export default class ThemeStore {

   
    loading = false;
    loadingInitial = false;
    collapsed = false;


    constructor() {

        makeAutoObservable(this)
    }

 





}