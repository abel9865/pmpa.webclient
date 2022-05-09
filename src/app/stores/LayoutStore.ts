import { makeAutoObservable, reaction } from "mobx";
import { LayoutProps } from "../models/layoutProps";

export default class LayoutStore{
    layoutProps: LayoutProps|null = null;


    constructor() {
       makeAutoObservable(this)
        
    }

}