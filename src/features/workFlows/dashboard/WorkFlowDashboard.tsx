/// <reference path="elsa.d.ts" />

import React, { useEffect } from 'react'
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
//import '@elsa-workflows/elsa-workflow-designer'
//import '@elsa-workflows/elsa-workflow-designer/loader'
//import '../@elsa-workflows/elsa-workflow-designer'
//import '../@elsa-workflows/elsa-workflow-designer/loader'



//import   "../../../../node_modules/@elsa-workflows/elsa-workflow-designer/loader";


//declare let wf-designer-host: any;



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
            

            {/* <wf-designer-host
        id="designerHost2"
        canvas-height="300vh"
        plugins="PrimitiveActivities ControlFlowActivities EmailActivities HttpActivities ConsoleActivities MassTransitActivities TimerActivities"
        data-activity-definitions='[{"type": "Custom", "displayName": "Custom", "description": "Custom Activity", "category": "Custom", "designer": { "outcomes": ["Done"] }}]'
        data-workflow='{"activities":[{"id":"timer","top":137,"left":1171,"type":"TimerEvent","state":{}, "executed":true},{"id":"send-email","top":641,"left":993,"type":"SendEmail","state":{}, "blocking":true},{"id":"if-else","top":378,"left":1139,"type":"IfElse","state":{}},{"id":"log","top":644,"left":1438,"type":"Log","state":{}, "faulted":true, "message":{"title":"Faulted","content":"This didnt work."}}],"connections":[{"sourceActivityId":"timer","destinationActivityId":"if-else","outcome":"Done"},{"sourceActivityId":"if-else","destinationActivityId":"send-email","outcome":"True"},{"sourceActivityId":"if-else","destinationActivityId":"log","outcome":"False"}]}'
        readonly="false"
      /> */}
            


            </div>
    )
}