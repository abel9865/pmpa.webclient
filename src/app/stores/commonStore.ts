import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = window.localStorage.getItem('jwt');
    reportToken:string|null = window.localStorage.getItem('tk1');
    appLoaded = false;
    showSideBar = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token)
                }
                else {
                    window.localStorage.removeItem('jwt')
                }
            }
        )
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }

    setToken = (token: string | null) => {
        //not needed because we have a reaction in the constructor
        // if (token) window.localStorage.setItem('jwt', token);
        this.token = token;
    }

    setReportToken=(rptToken: string | null) => {
        //not needed because we have a reaction in the constructor
        // if (token) window.localStorage.setItem('jwt', token);
        this.reportToken = rptToken;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }

    setSideBarDisplay = (val: boolean) => {

        this.showSideBar = val;
    }
}