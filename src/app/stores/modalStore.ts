import { makeAutoObservable } from "mobx"

interface Modal{
    open:boolean;
    body:JSX.Element|null;
    size:"mini" | "tiny" | "small" | "large" | "fullscreen" | undefined
    //string; //mini, tiny, small, large, fullscreen
}

export default class ModalStore{

modal:Modal={
    open:false,
    body:null,
    size:"mini"
}

constructor(){
    makeAutoObservable(this)
}

openModal=(content:JSX.Element, modalSize:"mini" | "tiny" | "small" | "large" | "fullscreen" | undefined)=>{
    this.modal.size = modalSize;
    this.modal.open = true;
    this.modal.body = content;
}

closeModal=()=>{
    this.modal.open = false;
    this.modal.body = null;
    this.modal.size = undefined;
}

}