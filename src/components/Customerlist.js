import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from 'ag-grid-react';

import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';
import EditCustomer from './EditCustomer';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function Customerlist() {
    
    //This is used to RESET the Database. It will NOT be included to the final product! 
    const resetDB = () => {
        fetch('https://customerrest.herokuapp.com/reset', {
            method: 'POST'
        })
        .then(_ => getCustomers())
    }
    
    const [customers, setCustomers] = useState([]);

    const [open, setOpen] = useState(false);

    const [msg, setMsg] = useState('');

    const [filter, setFilter] = useState('')

    const gridRef = useRef();

    useEffect(() => {
        getCustomers();
    }, []);

    const handleClose = () => {
        setOpen(false);
    }

    const onQuickFilterText= (event) => {
        setFilter(event.target.value);
    }

    const columns = [
        {
            headerName: 'Actions',
            field: 'links.0.href',
            width: 160,
            cellRendererFramework: params =>    <IconButton
                                                    color= 'inherit'
                                                    onClick={() => deleteCustomer(params.value)}>
                                                        <DeleteIcon />
                                                </IconButton>
        },
        {
            headerName: '', 
            field: 'links.0.href',
            width: 160,
            cellRendererFramework: params => <EditCustomer editCustomer={editCustomer} params={params} /> 
        },
        {
            headerName: '', 
            field: 'links.0.href',
            width: 250,
            cellRendererFramework: params => <AddTraining addTraining={addTraining} params={params} />
        },
        {headerName: 'First name', field: 'firstname', sortable: true, filter: true, floatingFilter: true},
        {headerName: 'Last name', field: 'lastname', sortable: true, filter: true, floatingFilter: true},
        {headerName: 'E-mail', field: 'email', sortable: true, filter: true, floatingFilter: true},
        {headerName: 'Phone', field: 'phone', sortable: true, filter: true, floatingFilter: true},
        {headerName: 'Address', field: 'streetaddress', sortable: true, filter: true, floatingFilter: true},
        {headerName: 'Postcode', field: 'postcode', sortable: true, filter: true, floatingFilter: true},
        {headerName: 'City', field: 'city', sortable: true, filter: true, floatingFilter: true}
    ]

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if(window.confirm('Are you sure?')) {
            fetch(link, {
                method: 'DELETE'
            })
            .then(_ => getCustomers())
            .then(_ => setMsg("Customer deleted succesfully"))
            .then(_ => setOpen(true))
            .catch(err => console.error(err))
        }
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(newCustomer)
        })
        .then(_ => getCustomers())
        .then(_ => setMsg('Customer added!'))
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
    }

    const editCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(_ => getCustomers())
        .then(_ => setMsg('Customer updated!'))
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
    }

    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(newTraining)
        })
        .then(_ => setMsg('Training added!'))
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
    }

    return (
        <div>
            {/* This button is used to RESET the Database and will NOT be included in the final product! */}
            <Button color= 'secondary' onClick={() => resetDB()}>RESET THE DATABASE</Button>
            
            <div id="filter">
                <input type="text" 
                    id="quickFilter" 
                    onChange={onQuickFilterText}
                    placeholder="Filter..." 
                    />
                <AddCustomer addCustomer={addCustomer}/>
            </div>
            
            <div className="ag-theme-material" style={{height: '410px', width:'95%', margin: 'auto'}}>
            <AgGridReact
                ref={gridRef}
                onGridReady={ params => {
                    gridRef.current = params.api;
                    params.api.sizeColumnsToFit();
                }}
                quickFilterText={filter}
                columnDefs={columns}
                suppressCellSelection={true}
                rowData={customers}
                pagination={true}
                paginationPageSize={5}
            ></AgGridReact>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={msg}
            />
            </div>
        </div>
    );
}

export default Customerlist;