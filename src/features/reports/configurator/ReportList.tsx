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
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { history } from '../../..';
import modalStore from '../../../app/stores/modalStore';
import DeleteReport from './DeleteReport';

export default observer(function ReportList() {


    const {modalStore, userStore} = useStore();

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

    function handleEditClick(category:string, name:string){
        console.log(category+'/'+name);
        history.push(`/manageReport/${category}/${name}`)
      }

    function actionTemplate(props:any):any {
        return( 
          <>
        
           <Icon name='edit' link={true}  size='small' color='blue' onClick={() => (handleEditClick(props.categoryName, props.name))} style={{marginRight:'30px'}}/>
           <Icon name='delete' link size='small' color='blue' onClick={() => (modalStore.openModal(<DeleteReport id={props.id} />, "mini"))}/>
           
          </>
        )
      }


    const { commonStore, reportStore } = useStore();

    const { setSideBarDisplay } = commonStore;

    useEffect(() => {
        // show sidebar nav
        setSideBarDisplay(true);
    
    
    
        reportStore.getReportItems().then(roles => {
    
          console.log(Array.from(reportStore.reportItemRegistry.values()));
    
         console.log(reportStore.reportItemsByTitle);
    
      });
    
    
      }, [commonStore, reportStore])


      if (reportStore.loadingInitial) return <LoadingComponent content='Loading reports' />


    return (

        <div className="pmpacomp">

<Header as='h2'>
    Report List
</Header>

            <Button as={Link} to='addReport' icon color='blue' labelPosition='left' floated='right'  >
                <Icon name='add' />
                New Report
            </Button>

            <Input className='searchtext' onChange={(e, data) => (handleSearchTextChange(e, data))} icon='search' placeholder='Search...' floated='right' />




            <GridComponent style={{marginTop:'20px'}}
                    dataSource={Array.from(reportStore.reportItemRegistry.values())} 
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
          <ColumnDirective field='name' headerText='Report Name'   />
          <ColumnDirective field='description' headerText='Report Description' />
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