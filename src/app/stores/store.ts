import { createContext, useContext } from "react";
import ClientProjectStore from "./clientProjectStore";
import CommonStore from "./commonStore";
import LayoutStore from "./LayoutStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store{
    clientProjectStore:ClientProjectStore;
    commonStore:CommonStore,
    userStore:UserStore, 
    modalStore: ModalStore,
    layoutStore: LayoutStore
}

export const store:Store={
    clientProjectStore: new ClientProjectStore(),
    commonStore :new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    layoutStore: new LayoutStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}