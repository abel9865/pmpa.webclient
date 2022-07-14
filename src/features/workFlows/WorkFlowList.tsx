import React, { ChangeEvent, useEffect } from 'react';

import { L10n, getValue } from '@syncfusion/ej2-base';

import {
    GridComponent,
    ColumnDirective,
    ColumnsDirective,
    Page,
    Inject,
    Filter,
    Sort,
    Group,
    CommandModel, CommandColumn, Edit, EditSettingsModel, Toolbar, ToolbarItems, DialogEditEventArgs, Grid
} from '@syncfusion/ej2-react-grids';
import { Dialog } from '@syncfusion/ej2-popups';
import { Button, Container, Header, Icon, Input, InputOnChangeData, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { history } from '../..';
import DeleteWorkFlow from './DeleteWorkFlow';


export default observer(function WorkFlowList() {


    const {modalStore, workFlowStore, commonStore, clientProjectStore} = useStore();

const projId:string = (clientProjectStore.selectedClientProject?.projectId || window.localStorage.getItem("pjid")) as string;

    let grid: Grid | null;

    function rowSelected() {
        if (grid) {
          /** Get the selected row indexes */
          const selectedrowindex: number[] = grid.getSelectedRowIndexes();
          /** Get the selected records. */
          const selectedrecords: object[] = grid.getSelectedRecords();
         // alert(selectedrowindex + " : " + JSON.stringify(selectedrecords));
        }
      }

    function handleSearchTextChange(e: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) {
        const searchText: string =
            data.value;

        if (grid) {
            grid.search(searchText);
        }
    }

    function handleEditClick(id:string){
        console.log(id);
        history.push(`/manageWorkFlow/${id}`)
      }

    function actionTemplate(props:any):any {



        return( 
          <>
        
           <Icon name='edit' link={true}  size='small' color='blue' onClick={() => (handleEditClick(props.definitionId))} style={{marginRight:'30px'}}/>
           <Icon name='delete' link size='small' color='blue' onClick={() => (modalStore.openModal(<DeleteWorkFlow id={props.definitionId} />, "mini"))}/>
           
          </>
        )
      }


  

    const { setSideBarDisplay } = commonStore;

    useEffect(() => {
        // show sidebar nav
        setSideBarDisplay(true);
    
    
    
        workFlowStore.getWorkFlowItems(projId).then(workflows => {
    
          console.log(Array.from(workFlowStore.workFlowItemRegistry.values()));
    
         console.log(workFlowStore.workFlowItemsByTitle);
    
      });
    
    
      }, [commonStore, workFlowStore])


      if (workFlowStore.loadingInitial) return <LoadingComponent content='Loading workflows' />


    return (

        <div className="pmpacomp">

<Header as='h2'>
    Workflow List
</Header>

            {/* <Button as={Link} to='addWorkflow' icon color='blue' labelPosition='left' floated='right'  >
                <Icon name='add' />
                New WorkFlow
            </Button> */}

            <Input className='searchtext' onChange={(e, data) => (handleSearchTextChange(e, data))} icon='search' placeholder='Search...' floated='right' />




            <GridComponent style={{marginTop:'20px'}}
                    dataSource={Array.from(workFlowStore.workFlowItemRegistry.values())} 
                    allowSorting={true} 
                    //  allowFiltering={true}  
                    allowPaging={true} pageSettings={{ pageSize: 6 }} 
                    //allowGrouping={true} 
                    //editSettings={editOptions} 
                    //toolbar={toolbarOptions} actionComplete={actionComplete} 
                    rowSelected={rowSelected}    
                    ref={g => grid = g}
                    >
                    
                    <ColumnsDirective>
                    <ColumnDirective field='definitionId' headerText=''  visible={false}/>
          <ColumnDirective field='name' headerText='Workflow Name'   />
          <ColumnDirective field='version' headerText=' Version' />
          <ColumnDirective field='isPublished' headerText='Is Published' />
         
          <ColumnDirective headerText='Actions' field='definitionId' textAlign='Right' width='120' template={actionTemplate} / >
          
  
        </ColumnsDirective>
        <Inject services={[Page, 
          Sort, Group, 
          ]} />
                    
                
                        </GridComponent>


        </div>
    )

})