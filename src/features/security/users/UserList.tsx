import React from 'react';
import dataSource from './DataSource.json';



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
import { Button, Icon, Segment } from 'semantic-ui-react';
export default function UserList(){

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

                  
                    <Button icon positive labelPosition='left' style={{marginBottom:'15px'}} spaced='right'>
      <Icon name='add' />
      Add User
    </Button>
 


   
                    <GridComponent dataSource={dataSource} allowSorting={true}  allowFiltering={true}  allowPaging={true} pageSettings={{ pageSize: 6 }} allowGrouping={true}>
                    
                    <ColumnsDirective>
          <ColumnDirective field='OrderID' headerText='Invoice ID' textAlign='Right' width='100' />
          <ColumnDirective field='CustomerID' headerText='Customer ID' width='150' />
          <ColumnDirective field='ShipCountry' headerText='Ship Country' />
          <ColumnDirective field='ShipName' headerText='Ship Name' />
          <ColumnDirective field='Freight' textAlign='Right' format='C2' width='100' />
        </ColumnsDirective>
        <Inject services={[Page, Filter, Sort, Group]} />
                    
                
                        </GridComponent>
                     
   </>
    )
}