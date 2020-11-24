import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import moment from "moment";


function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    const [open, setOpen] = useState(false);

    const [msg, setMsg] = useState('');

    const gridRef = useRef();

    useEffect(() => {
        getTrainings();
    }, []); 

    const handleClose = () => {
        setOpen(false);
    }

    const columns = [
        {
            headerName: 'Actions',
            field: 'id',
            width: 160,
            cellRendererFramework: params =>    <IconButton
                                                    color= 'inherit'
                                                    onClick={() => deleteTraining(params.value)}>
                                                        <DeleteIcon />
                                                </IconButton>
                
        },
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true, floatingFilter: true},
        {
            headerName: 'Date', 
            field: 'date', 
            sortable: true, 
            filter: true, 
            floatingFilter: true,
            cellRenderer: (data) => {
                return moment(data.value).format('DD.MM.YYYY HH:mm')
            }
        },
        {headerName: 'Duration (min)', field: 'duration', sortable: true, filter: true, floatingFilter: true},
        {
            headerName: 'Customer',  
            field: 'customer',
            sortable: true, 
            filter: true, 
            floatingFilter: true,
            valueGetter(params) {
                return params.data.customer.firstname + ' ' + params.data.customer.lastname;
            }
        }
    ]

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = (id) => {
        if(window.confirm('Are you sure')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + id, {
            method: 'DELETE'
            })
            .then(_ => getTrainings())
            .then(_ => setMsg("Training deleted succesfully"))
            .then(_ => setOpen(true))
            .catch(err => console.error(err))
        }
    }

    return (
        <div>
            <div className="ag-theme-material" style={{height: '410px', width:'95%', margin: 'auto'}}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={ params => {
                        gridRef.current = params.api;
                        params.api.sizeColumnsToFit();
                    }}
                    columnDefs={columns}
                    suppressCellSelection={true}
                    rowData={trainings}
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

export default Traininglist;