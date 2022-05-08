import { createContext, useContext } from "react";
import ClientProjectStore from "./clientProjectStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store{
    clientProjectStore:ClientProjectStore;
    commonStore:CommonStore,
    userStore:UserStore, 
    modalStore: ModalStore
}

export const store:Store={
    clientProjectStore: new ClientProjectStore(),
    commonStore :new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}