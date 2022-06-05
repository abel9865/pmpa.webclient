import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from "./store";

export default class ProfileStore{
   uploading=false;


    constructor() {
       makeAutoObservable(this)
        
    }

    uploadPhoto = async(file:Blob)=>{
    this.uploading = true;
try {
    const response = await agent.Profiles.uploadPhoto(file);
    const photo = response.data;
    runInAction(()=>{

        console.log('---response listed below---');
        console.log(this.uploading);
console.log(response);
console.log(photo);

        //not sure if we should use selecteduser or just user
        if(store.userStore.selectedUser ){
            store.userStore.selectedUser.imageId = photo.id;
            store.userStore.selectedUser.imagePath =photo.url;
        }
        this.uploading = false;

        store.modalStore.closeModal();  
    })
  
} catch (error) {
    console.log(error)
    runInAction(()=>this.uploading = false);
}
    }

}