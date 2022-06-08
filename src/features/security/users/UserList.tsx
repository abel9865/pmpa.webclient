import React, { ChangeEvent, useEffect } from 'react';

import { L10n, getValue } from '@syncfusion/ej2-base';

// import { FlexGrid, FlexGridColumn, FlexGridCellTemplate } from '@grapecity/wijmo.react.grid';
// import '@grapecity/wijmo.styles/wijmo.css';
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
import DeleteUser from './DeleteUser';
import modalStore from '../../../app/stores/modalStore';
import "../../../features/syncFusion.css";


L10n.load({
  'en-US': {
      grid: {
          'SaveButton': 'Submit',
          'CancelButton': 'Discard'
      }
  }
});

export default observer(function UserList(){


    const {modalStore, userStore} = useStore();

    const{getRegisteredUsers, registeredUserRegistry} = userStore;


    useEffect(() => {
        if (registeredUserRegistry.size<=1) getRegisteredUsers();
      }, [registeredUserRegistry.size, getRegisteredUsers])
      
      if (userStore.loadingInitial) return <LoadingComponent content='Loading users' />

    // const data = [
    //     { OrderID: 0, CustomerName: 'Example', CustomerAddress:'123 main street' },
    //     { OrderID: 1, CustomerName: 'Demo', CustomerAddress:'456 austin hills dr' }
    //   ];


    //    let gridInstance: GridComponent  ;
    //   const filterType: { [key: string]: Object }[] = [
    //       { text: 'Menu', value: 'Menu' },
    //       { text: 'Checkbox', value: 'CheckBox' },
    //       { text: 'Excel', value: 'Excel' },
    //   ];
    //   const filterSettings: any = { type: 'Menu' }
    //   const fields: Object = { text: 'text', value: 'value' };
    //   const format: any = {type:'datetime',format:'M/d/y hh:mm a'};
    //   function onChange(sel: { itemData: { text: string, value: string } }): void {
  
    //       gridInstance.filterSettings.type = sel.itemData.value as FilterType;
    //       gridInstance.clearFiltering();
    //   }

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

    //  const editOptions:EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true , mode: 'Dialog' };
    
    //  const commands:CommandModel[] = [
    //   { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
    //   { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } },
    //   { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
    //   { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' } }
    // ];


    // const toolbarOptions: ToolbarItems[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];

    // function actionComplete(args: DialogEditEventArgs): void {
    //   if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
    //     const dialog: Dialog = args.dialog as Dialog;
    //     dialog.showCloseIcon = false;
    //     dialog.height = 400;
    //     // change the header of the dialog
    //     dialog.header = args.requestType === 'beginEdit' ? 'Edit user '  : 'Add new user';
    //   }
    // }


    function actionTemplate(props:any):any {
      return( 
        <>
      
         <Icon name='edit' link={true}  size='small' color='blue' onClick={() => (handleEditClick(props.userId))} style={{marginRight:'30px'}}/>
         <Icon name='delete' link size='small' color='blue' onClick={() => (modalStore.openModal(<DeleteUser userId={props.userId} />, "mini"))}/>
         
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

    function handleDeleteClick(userId:string){
      alert(userId);
      history.push('addUser');
      // if (grid) {
      //   rowSelected();
      //   /** Get the selected row indexes */
      //   const selectedrowindex: number[] = grid.getSelectedRowIndexes();
      //   /** Get the selected records. */
      //   const selectedrecords: object[] = grid.getSelectedRecords();
      //   alert(selectedrowindex + " : " + JSON.stringify(selectedrecords));
      // }
    }

    function handleEditClick(userId:string){
      console.log(userId);
      history.push(`/manageUser/${userId}`)
    }


console.log(Array.from(registeredUserRegistry.values()));

    return(
        <div >
        {/* <FlexGrid itemsSource={data} /> */}

        {/* <GridComponent dataSource={data} allowSorting={true} allowPaging={true} ref={grid => gridInstance = grid!} pageSettings={{ pageSize: 10, pageCount: 5 }} allowFiltering={true} filterSettings={filterSettings}>
      
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right'></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
                           
                        </ColumnsDirective>
                        <Inject services={[Filter, Page, Sort]} />
                    </GridComponent> */}

                  <Button as={Link} to='addUser' icon color='blue' labelPosition='left' floated='right'  >
      <Icon name='add' />
      Add User
    </Button>

    <Input className='searchtext'  onChange= {(e, data) => (handleSearchTextChange(e, data))} icon='search' placeholder='Search...'  floated='right'/>
  
 


   
                    <GridComponent style={{marginTop:'20px'}}
                    dataSource={Array.from(registeredUserRegistry.values())} 
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
                    <ColumnDirective field='userId' headerText=''  visible={false}/>
          <ColumnDirective field='firstName' headerText='First Name'   />
          <ColumnDirective field='lastName' headerText='Last Name' />
          <ColumnDirective field='email' headerText='Email Address' />
          <ColumnDirective field='isAdmin' headerText='Admin Access' />
          {/* <ColumnDirective headerText='Commands'  commands= {commands}/> */} 
          <ColumnDirective headerText='Actions' field='userId' textAlign='Right' width='120' template={actionTemplate} / >
          
  
        </ColumnsDirective>
        <Inject services={[Page, 
          Sort, Group, 
          ]} />
                    
                
                        </GridComponent>
                              
   </div>
    )
})