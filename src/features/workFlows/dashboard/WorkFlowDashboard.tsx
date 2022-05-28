import React, { useEffect } from 'react'
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default function WorkFlowDashboard (){

    const {  commonStore} = useStore();

    const{setSideBarDisplay}= commonStore;
  
  
    useEffect(()=>{
      //display sidebar nav
      setSideBarDisplay(true);
     
    }, [setSideBarDisplay])

    return(
        <div className='pmpacomp' >
            <Header as='h2' content='WorkFlow Dashboard' />
            </div>
    )
}