import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { ChatComment } from "../models/comment";
import { store } from "./store";

export default class CommentStore{
    comments:ChatComment[] = [];
    hubConnection:HubConnection|null=null;

    constructor(){
        makeAutoObservable(this);
    }

    createHubConnection = (resourceId:string)=>{
       this.hubConnection = new HubConnectionBuilder()
       .withUrl('http://localhost:5000/chat?resourceId=' + resourceId, {
         accessTokenFactory:()=>store.userStore.user?.token!  
       })
       .withAutomaticReconnect()
       .configureLogging(LogLevel.Information)
       .build();

       this.hubConnection.start().catch(error=> console.log('Error establishing the connection: ', error))
       this.hubConnection.on('LoadComments', (comments:ChatComment[])=>{
runInAction(()=>{
    console.log(comments);
    this.comments = comments});
       })

this.hubConnection.on('ReceiveComment', (comment:ChatComment)=>{
    runInAction(()=>{
        console.log(comment);
        this.comments.push(comment)
    });
})

    }

    stopHubConnection=()=>{
        this.hubConnection?.stop().catch(error=>console.log('Error stopping connection: ', error))
    }

    clearComments=()=>{
        this.comments=[];
        this.stopHubConnection();

    }

    addComment=async(values:any)=>{
        //replace hard code resourceId to read from selected/load resource
        console.log('attempt to send comment');
        values.resourceId = '7b9e2a98-3114-478f-8ce8-769708543068';
        try {
            await this.hubConnection?.invoke('SendComment', values);
            
        } catch (error) {
            
        }
    }
}