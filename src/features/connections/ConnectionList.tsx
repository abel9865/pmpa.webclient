import React, { useEffect } from 'react'
import { Header } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

export default function ConnectionList (){

    const {  commonStore} = useStore();

    const{setSideBarDisplay}= commonStore;
  
  
    useEffect(()=>{
      //hide sidebar nav
      setSideBarDisplay(false);
     
    }, [setSideBarDisplay])

    return(
        <div className='pmpacomp' >
            <Header as='h2' content='Data Connectors' />
            </div>
    )
}