import { observer } from 'mobx-react-lite';
import React from 'react'
import { Header, Image } from 'semantic-ui-react';
import ResourceDetailedChat from '../../../features/chat/ResourceDetailedChat';
import ClientProjectDetailedChat from '../../../features/clientProjects/details/tempStuff/clientProjectDetailedChat';
import { useStore } from '../../stores/store';


interface Props{
    headerText:string;
    showCommentCount?:boolean;
    resourceId?:string;
    resourceType?:string;
    userId?:string;
   
}

export default observer(function ResourceHeader({headerText, resourceId, resourceType, userId}:Props){

const{modalStore} = useStore();
    return(
        // <Header as='h2'>
        <h2>
      {headerText}
       
       
       <span className="e-badge e-badge-danger e-badge-pill" onClick={() => (modalStore.openModal(<ClientProjectDetailedChat resourceId='7b9e2a98-3114-478f-8ce8-769708543068'/>, "large"))} >99+</span>
       </h2>
    //   </Header>
    );
})