import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns'; 
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [training, setTraining] = useState({
        date: '',
        duration: '', 
        activity: '', 
        customer: props.params.value
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addTraining(training);
        handleClose();
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    const changeDate = (date) => {
        setDate(date);
        setTraining({...training, date: date.toISOString()});
    }

    return (
        <div>
            <IconButton variant="outlined" color="primary" size= 'small' onClick={handleClickOpen}>
                <AddCircleOutlineIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        name='activity'
                        value={training.activity}
                        onChange={inputChanged}
                        margin="dense"
                        label="Activity"
                        fullWidth
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker style={{margin: 5}} label="Date" format="dd.MM.yyyy HH:mm" onChange={date => changeDate(date)} value={date} id="date" name="date" />
                    </MuiPickersUtilsProvider>  
                    <TextField
                        name='duration'
                        value={training.duration}
                        onChange={inputChanged}
                        margin="dense"
                        label="Duration (min)"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddTraining;