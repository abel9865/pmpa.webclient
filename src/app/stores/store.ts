import { createContext, useContext } from "react";
import ClientProjectStore from "./clientProjectStore";
import CommonStore from "./commonStore";
import LayoutStore from "./LayoutStore";
import ModalStore from "./modalStore";
import RoleStore from "./roleStore";
import ThemeStore from "./themeStore";
import UserStore from "./userStore";

interface Store{
    clientProjectStore:ClientProjectStore;
    commonStore:CommonStore,
    userStore:UserStore, 
    roleStore:RoleStore,
    modalStore: ModalStore,
    layoutStore: LayoutStore,
    themeStore: ThemeStore
}

export const store:Store={
    clientProjectStore: new ClientProjectStore(),
    commonStore :new CommonStore(),
    userStore: new UserStore(),
    roleStore : new RoleStore(),
    modalStore: new ModalStore(),
    layoutStore: new LayoutStore(),
    themeStore: new ThemeStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}