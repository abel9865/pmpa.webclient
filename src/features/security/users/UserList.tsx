import React, { useEffect } from 'react';



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
    Group
  } from '@syncfusion/ej2-react-grids';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';





export default observer(function UserList(){


    const {userStore} = useStore();

    const{getAllUsers, registeredUserRegistry} = userStore;


    useEffect(() => {
        if (registeredUserRegistry.size<=1) getAllUsers();
      }, [registeredUserRegistry.size, getAllUsers])
      
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


    return(
        <>
        {/* <FlexGrid itemsSource={data} /> */}

        {/* <GridComponent dataSource={data} allowSorting={true} allowPaging={true} ref={grid => gridInstance = grid!} pageSettings={{ pageSize: 10, pageCount: 5 }} allowFiltering={true} filterSettings={filterSettings}>
      
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right'></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
                           
                        </ColumnsDirective>
                        <Inject services={[Filter, Page, Sort]} />
                    </GridComponent> */}

                  
                    <Button as={Link} to='addUser' icon positive labelPosition='left' style={{marginBottom:'15px'}} spaced='right'>
      <Icon name='add' />
      Add User
    </Button>
 


   
                    <GridComponent dataSource={Array.from(registeredUserRegistry.values())} allowSorting={true}  allowFiltering={true}  allowPaging={true} pageSettings={{ pageSize: 6 }} allowGrouping={true}>
                    
                    <ColumnsDirective>
          <ColumnDirective field='firstName' headerText='First Name' textAlign='Right' width='100' />
          <ColumnDirective field='lastName' headerText='Last Name' width='150' />
          <ColumnDirective field='email' headerText='Email Address' />
          <ColumnDirective field='isAdmin' headerText='Admin Access' />
         
        </ColumnsDirective>
        <Inject services={[Page, Filter, Sort, Group]} />
                    
                
                        </GridComponent>
                     
   </>
    )
})