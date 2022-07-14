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
import modalStore from '../../app/stores/modalStore';
import DeleteConnection from './DeleteConnection';

export default observer(function ConnectorList() {


    const { modalStore, userStore } = useStore();

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
        history.push(`/manageConnection/${id}`)
      }

    function actionTemplate(props:any):any {
        return( 
          <>
        
           <Icon name='edit' link={true}  size='small' color='blue' onClick={() => (handleEditClick(props.id))} style={{marginRight:'30px'}}/>
           <Icon name='delete' link size='small' color='blue' onClick={() => (modalStore.openModal(<DeleteConnection id={props.id} />, "mini"))}/>
           
          </>
        )
      }


      const { commonStore, dataSourceStore } = useStore();

      const { setSideBarDisplay } = commonStore;


      useEffect(() => {


        dataSourceStore.getDataSourceItems().then(data => {
    
         console.log(Array.from(dataSourceStore.dashboardItemRegistry.values()));
    
         console.log(dataSourceStore.dashboardItemsByTitle);
    
      });
    
      
      }, [dataSourceStore]);


      if (dataSourceStore.loadingInitial) return <LoadingComponent content='Loading datasources' />

    return (
        <div className="pmpacomp">

        <Header as='h2'>
            Datasource List
        </Header>
        

        <Button as={Link} to='addConnector' icon color='blue' labelPosition='left' floated='right'  >
                <Icon name='add' />
                New Connector
            </Button>

            <Input className='searchtext' onChange={(e, data) => (handleSearchTextChange(e, data))} icon='search' placeholder='Search...' floated='right' />



            <GridComponent style={{marginTop:'20px'}}
                    dataSource={Array.from(dataSourceStore.dashboardItemRegistry.values())} 
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
                    <ColumnDirective field='id' headerText=''  visible={false}/>
          <ColumnDirective field='name' headerText='Connection Name'   />
          <ColumnDirective field='description' headerText='Connection Description' />
          <ColumnDirective field='modifiedDate' headerText='Last Modified Date' />
          <ColumnDirective field='modifiedByFullName' headerText='Last Modified By' />
          {/* <ColumnDirective headerText='Commands'  commands= {commands}/> */} 
          <ColumnDirective headerText='Actions' field='id' textAlign='Right' width='120' template={actionTemplate} / >
          
  
        </ColumnsDirective>
        <Inject services={[Page, 
          Sort, Group, 
          ]} />
                    
                
                        </GridComponent>


        </div>
    )

})