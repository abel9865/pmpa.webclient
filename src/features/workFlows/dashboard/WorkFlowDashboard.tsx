/// <reference path="elsa.d.ts" />

import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Button, Header, Icon, Tab, TabProps } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import WorkFlowList from '../WorkFlowList';
import WorkFlowInstance from './WorkFlowInstance';
//import '@elsa-workflows/elsa-workflow-designer'
//import '@elsa-workflows/elsa-workflow-designer/loader'
//import '../@elsa-workflows/elsa-workflow-designer'
//import '../@elsa-workflows/elsa-workflow-designer/loader'



//import   "../../../../node_modules/@elsa-workflows/elsa-workflow-designer/loader";


//declare let wf-designer-host: any;



export default function WorkFlowDashboard (){

    const {  commonStore, clientProjectStore} = useStore();

    const{setSideBarDisplay}= commonStore;

    const[activeIndex, setActiveIndex] = useState(1);
    const location = useLocation<{from: string}>();


  
  var url = "https://localhost:15265/instanceviewer?p=" + clientProjectStore.selectedClientProject?.projectId || window.localStorage.getItem("pjid") +"";
  console.log(url);

    useEffect(()=>{
      //display sidebar nav
      setSideBarDisplay(true);
     

      if(location.state){

        //console.log(location.state.from);
  
  
  switch(location.state.from){
    case 'instance':
      setActiveIndex(1);
      break;
      case 'list':
        setActiveIndex(0);
        break;
        default:
  }
  
  
          
        }
        else{
  
         // console.log('use 1st tab');
          setActiveIndex(0);
        }




    }, [setSideBarDisplay, setActiveIndex])



function getDefaultIndex(){
  return activeIndex;
}

  const useIndex = getDefaultIndex();

  function handleTabChange( data:TabProps) {
  
setActiveIndex(data.activeIndex! as number);

  } 


    return(
        <div className='pmpacomp' >
            <Header as='h2' content='WorkFlow Dashboard' />
            

            <Button as={Link} to='addWorkFlow' icon color='blue' labelPosition='left' floated='right'  >
                <Icon name='add' />
                New Workflow
            </Button>


            <Tab panes={
        [
            { menuItem: 'Workflow List', render: () => <Tab.Pane><WorkFlowList /></Tab.Pane> },
            { menuItem: 'WorkfLow Instances', render: () => <Tab.Pane>< WorkFlowInstance/></Tab.Pane> },
          
          ]
       }  activeIndex={useIndex} onTabChange={(e, data) => (handleTabChange(data))}  >
          
       </Tab>

            {/* <iframe  src={`${url}`}  width={1450} height={800} />; */}
          
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