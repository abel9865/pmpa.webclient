import React, { useEffect, useState } from 'react'
import { ColorPickerComponent, ColorPickerEventArgs } from '@syncfusion/ej2-react-inputs';
import { Button, Dropdown, DropdownProps, Form, Label, Table } from 'semantic-ui-react';
import { Formik } from 'formik';
import { AppTheme } from '../../app/models/theme';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';


export default observer(function ThemeBuilder() {

    const { themeStore } = useStore();

    const fontOptions = [
        {
            key: 'Roboto',
            text: 'Roboto',
            value: 'Roboto'
        },
        {
            key: 'NunitoSans',
            text: 'Nunito Sans',
            value: 'Nunito Sans'
        },
        {
            key: 'Ubuntu',
            text: 'Ubuntu',
            value: 'Ubuntu'
        },
        {
            key: 'Helvetica',
            text: 'Helvetica',
            value: 'Helvetica'
        },
        {
            key: 'Trajan',
            text: 'Trajan',
            value: 'Trajan'
        },
        {
            key: 'GaramondPro',
            text: 'Garamond Pro',
            value: 'Garamont Pro'
        },
        {
            key: 'Futura',
            text: 'Futura',
            value: 'Futura'
        },
        {
            key: 'Bodoni',
            text: 'Bodoni',
            value: 'Bodoni'
        },
        {
            key: 'BickhamScriptPro',
            text: 'Bickham Script Pro',
            value: 'Bickham Script Pro'
        },
        {
            key: 'Frutiger',
            text: 'Frutiger',
            value: 'Frutiger'
        },
        {
            key: 'Sabon',
            text: 'Sabon',
            value: 'Sabon'
        },
        {
            key: 'Rockwell',
            text: 'Rockwell',
            value: 'Rockwell'
        },
        {
            key: 'ProximaNova',
            text: 'Proxima Nova',
            value: 'Proxima Nova'
        }
    ];

    const [fontVal, setFontVal] = useState('Roboto');
    const [topMenuBgVal, setTopMenuBgVal] = useState('#F0F8FF');
    const [sideBarBgVal, setSideBarBgVal] = useState('#FF7F50');
    const [contentBgVal, setContentBgVal] = useState('#B22222');
    const [btnBgVal, setBtnBgVal] = useState('#FF69B4');
    const [txtColorVal, setTxtColorVal] = useState('#FFFACD');
    const [lnkColorVal, setLnkColorVal] = useState('#0000FF');


    const [theme, setTheme] = useState<AppTheme>(
        //     {
        //     themeId: '',
        //     topMenuBackgroundColor:'',
        //     sideBarBackgroundColor:'',
        //     contentBackgroundColor: '' ,
        //     buttonBackgroundColor:'',
        //     textColor: '',
        //     linkColor: '',
        //     font: '' ,
        // } as AppTheme
        {} as AppTheme
    );

    const { loading, loadingInitial } = themeStore;

    useEffect(() => {
        // if (id) loadClientProject(id).then(clientProject => setClientProject(clientProject!))
        let currentTheme = {} as AppTheme;
        currentTheme.buttonBackgroundColor = '#FF69B4';
        currentTheme.contentBackgroundColor = '#B22222';
        currentTheme.textColor = '#FFFACD';
        currentTheme.linkColor = '#0000FF';
        currentTheme.sideBarBackgroundColor = 'FF7F50';
        currentTheme.topMenuBackgroundColor = 'F0F8FF';
        currentTheme.font = 'Roboto';

        setTheme(currentTheme);
    }, [setTheme]);

    function handleLinkColorChange(e: ColorPickerEventArgs) {
        handleColorChange('lnkColor', e);
    }

    function handleSidebarBgColorChange(e: ColorPickerEventArgs) {
        handleColorChange('sideBarBgColor', e);
    }

    function handleTopMenuBgColorChange(e: ColorPickerEventArgs) {
        handleColorChange('topMenuBgColor', e);
    }

    function handleContentBgColorChange(e: ColorPickerEventArgs) {
        handleColorChange('contentBgColor', e);
    }

    function handleButtonBgColorChange(e: ColorPickerEventArgs) {
        handleColorChange('btnBgColor', e);
    }
function handleTextColorChange(e: ColorPickerEventArgs) {
    handleColorChange('txtColor', e);
}
  

    function handleColorChange(name: string, e: ColorPickerEventArgs) {
        switch (name) {

            case 'topMenuBgColor':
                setTopMenuBgVal(e.currentValue.hex);
                theme.topMenuBackgroundColor = e.currentValue.hex;
                break;
            case 'sideBarBgColor':
                setSideBarBgVal(e.currentValue.hex);
                theme.sideBarBackgroundColor = e.currentValue.hex;
                break;
            case 'contentBgColor':
                setContentBgVal(e.currentValue.hex);
                theme.contentBackgroundColor = e.currentValue.hex;
                break;
            case 'btnBgColor':
                setBtnBgVal(e.currentValue.hex);
                theme.buttonBackgroundColor = e.currentValue.hex;
                break;
            case 'lnkColor':
                setBtnBgVal(e.currentValue.hex);
                theme.linkColor = e.currentValue.hex;
                break;
                case 'txtColor':
                    setTxtColorVal(e.currentValue.hex);
                    theme.textColor = e.currentValue.hex;
                    break;
            default:

        }


    }

    function handleFontChange(data: DropdownProps) {
        console.log(data);
        setFontVal(data.value!.toString());
        theme.font = data.value!.toString();
    }

    // function handleFormSubmit(theme: AppTheme) {
    function handleFormSubmit(themeFont: any) {

        console.log(theme);

        console.log(themeFont);
    }


    return (

        <>
            <Formik
                //validationSchema={validationSchema}
                enableReinitialize
                initialValues={{ font: 'Roboto' }}
                onSubmit={values => handleFormSubmit({ values })}>
                {
                    ({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>

                            <Table style={{ marginBottom: '20px', width: '100%' }} >
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <p>Top Menu Background Color</p>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <ColorPickerComponent name='topMenuBackgroundColor' id='topmenu-background-color-picker' value={theme.topMenuBackgroundColor} change={(e: ColorPickerEventArgs) => (handleTopMenuBgColorChange(e))} ></ColorPickerComponent>
                                        </Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell>
                                            <p>Side Bar Background Color</p>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <ColorPickerComponent name='sideBarBackgroundColor' id='sidebar-background-color-picker' value={theme.sideBarBackgroundColor} change={(e: ColorPickerEventArgs) => (handleSidebarBgColorChange(e))} ></ColorPickerComponent>
                                        </Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell>
                                            <p>Content Background Color</p>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <ColorPickerComponent name='contentBackgroundColor' id='content-background-color-picker' value={theme.contentBackgroundColor} change={(e: ColorPickerEventArgs) => (handleContentBgColorChange(e))}></ColorPickerComponent>
                                        </Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell>
                                            <p>Button Background Color</p>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <ColorPickerComponent name='buttonBackgroundColor' id='button-background-color-picker' value={theme.buttonBackgroundColor} change={(e: ColorPickerEventArgs) => (handleButtonBgColorChange(e))}></ColorPickerComponent>
                                        </Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell>
                                            <p>Text Color</p>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <ColorPickerComponent name='textColor' id='text-color-picker' value={theme.textColor} change={(e: ColorPickerEventArgs) => (handleTextColorChange(e))} ></ColorPickerComponent>
                                        </Table.Cell>
                                    </Table.Row>


                                    <Table.Row>
                                        <Table.Cell>
                                            <p>Link Color</p>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <ColorPickerComponent name='linkColor' id='link-color-picker' value={theme.linkColor} change={(e: ColorPickerEventArgs) => (handleLinkColorChange(e))}></ColorPickerComponent>
                                        </Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell>
                                            <p>Select a font</p>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <Dropdown name='font' value= {theme.font} onChange={(e, data) => (handleFontChange(data))} placeholder='Select a font' fuid selection options={fontOptions} />
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>

                            <Button
                                // disabled={isSubmitting}
                                loading={loading} floated='right' positive type='submit' content='Submit' />


                        </Form>

                    )
                }

            </Formik>
        </>

    )




})