import { createContext, useContext } from "react";
import ClientProjectStore from "./clientProjectStore";
import CommentStore from "./commentStore";
import CommonStore from "./commonStore";
import DashboardStore from "./dashboardStore";
import DataSourceStore from "./dataSourceStore";
import LayoutStore from "./LayoutStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import ReportStore from "./reportStore";
import RoleStore from "./roleStore";
import ThemeStore from "./themeStore";
import UserStore from "./userStore";
import WorkFlowStore from "./workflowStore";

interface Store{
    clientProjectStore:ClientProjectStore;
    commonStore:CommonStore,
    userStore:UserStore, 
    roleStore:RoleStore,
    modalStore: ModalStore,
    layoutStore: LayoutStore,
    themeStore: ThemeStore,
    profileStore: ProfileStore,
    commentStore:CommentStore,
    reportStore:ReportStore,
    dashboardStore: DashboardStore,
    workFlowStore:WorkFlowStore,
    dataSourceStore: DataSourceStore
}

export const store:Store={
    clientProjectStore: new ClientProjectStore(),
    commonStore :new CommonStore(),
    userStore: new UserStore(),
    roleStore : new RoleStore(),
    modalStore: new ModalStore(),
    layoutStore: new LayoutStore(),
    themeStore: new ThemeStore(),
    profileStore: new ProfileStore(),
    commentStore : new CommentStore(),
    reportStore: new ReportStore(),
    dashboardStore: new DashboardStore(),
    workFlowStore: new WorkFlowStore(),
    dataSourceStore: new DataSourceStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}