import { createContext, useContext } from "react";
import ClientProjectStore from "./clientProjectStore";

interface Store{
    clientProjectStore:ClientProjectStore
}

export const store:Store={
    clientProjectStore: new ClientProjectStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}