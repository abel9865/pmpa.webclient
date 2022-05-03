import { createContext, useContext } from "react";
import ClientProjectStore from "./clientProjectStore";
import CommonStore from "./commonStore";

interface Store{
    clientProjectStore:ClientProjectStore;
    commonStore:CommonStore
}

export const store:Store={
    clientProjectStore: new ClientProjectStore(),
    commonStore :new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}