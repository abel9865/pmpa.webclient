import React from 'react'
import { Header } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';

export default function WorkFlowDesigner(){

    const { clientProjectStore  } = useStore();

    var url = "https://localhost:15265/designer?p=" + clientProjectStore.selectedClientProject?.projectId || window.localStorage.getItem("pjid") +"";

    return (
        <div className='pmpacomp' >
            <Header as='h2' content='WorkFlow Designer' />
            
            <iframe src={`${url}`}  width={1420} height={800} />;

            </div>
          
    )
}