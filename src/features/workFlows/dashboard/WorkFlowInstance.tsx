import React from 'react'
import { Header } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';

export default function WorkFlowInstance(){

    const {  clientProjectStore  } = useStore();

    var url = "https://localhost:15265/instanceviewer?p=" + clientProjectStore.selectedClientProject?.projectId || window.localStorage.getItem("pjid") +"";

    return (
        <div className='pmpacomp' >
            <Header as='h2' content='WorkFlow Instances' />
            
            <iframe src={`${url}`}  width={1420} height={800} />;

            </div>
          
    )
}