import React, { ChangeEvent, useEffect } from 'react';

import { L10n, getValue } from '@syncfusion/ej2-base';

import "../../../features/syncFusion.css";

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
import { Button, Container, Icon, Input, InputOnChangeData, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { history } from '../../..';
import DeleteRole from './DeleteRole';



L10n.load({
  'en-US': {
      grid: {
          'SaveButton': 'Submit',
          'CancelButton': 'Discard'
      }
  }
});

export default observer(function RoleList(){


    const {modalStore, clientProjectStore, roleStore, userStore} = useStore();

    const{getRoles, roleRegistry} = roleStore;
    const{selectedClientProject} = clientProjectStore;
const{user} = userStore;

    useEffect(() => {
        if (roleRegistry.size<=1) getRoles(selectedClientProject?selectedClientProject.projectId!: window.localStorage.getItem("pjid")!);
      }, [roleRegistry.size, getRoles])
      
      if (roleStore.loadingInitial) return <LoadingComponent content='Loading users' />

   

    let grid: Grid | null;

    function rowSelected() {
      if (grid) {
        /** Get the selected row indexes */
        const selectedrowindex: number[] = grid.getSelectedRowIndexes();
        /** Get the selected records. */
        const selectedrecords: object[] = grid.getSelectedRecords();
      }
    }

    



    function actionTemplate(props:any):any {
      return( 
        <>
      
         <Icon name='edit' link={true}  size='small' color='blue' onClick={() => (handleEditClick(props.roleId))} style={{marginRight:'30px'}}/>
         <Icon name='delete' link size='small' color='blue' onClick={() => (modalStore.openModal(<DeleteRole roleId={props.roleId} />, "mini"))}/>
         
        </>
      )
    }

    function handleSearchTextChange(e:ChangeEvent<HTMLInputElement>, data:InputOnChangeData){
      const searchText: string =
     data.value;
     
    if (grid) {
      grid.search(searchText);
    }
    }

    function handleDeleteClick(roleId:string){
      alert(roleId);
      history.push('addUser');
    }

    function handleEditClick(roleId:string){
      console.log(roleId);
      history.push(`/manageRole/${roleId}`)
    }


console.log(Array.from(roleRegistry.values()));

    return(
        <div >

                  <Button as={Link} to='addRole' icon color='blue' labelPosition='left' floated='right'  >
      <Icon name='add' />
      Add Role
    </Button>

    <Input className='searchtext'  onChange= {(e, data) => (handleSearchTextChange(e, data))} icon='search' placeholder='Search...'  floated='right'/>
  
 


   
                    <GridComponent style={{marginTop:'20px'}}
                    dataSource={Array.from(roleRegistry.values())} 
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
                    <ColumnDirective field='roleId' headerText=''  visible={false}/>
          <ColumnDirective field='roleName' headerText='Role Name'   />
          <ColumnDirective field='createdDate' headerText=' Created Date' />
         
          <ColumnDirective headerText='Actions' field='userId' textAlign='Right' width='120' template={actionTemplate} / >
          
  
        </ColumnsDirective>
        <Inject services={[Page, 
          Sort, Group, 
          ]} />
                    
                
                        </GridComponent>
                              
   </div>
    )
})