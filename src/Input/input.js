import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Input() {
    const [modalStyle] = React.useState(getModalStyle);
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={()=> setOpen(false)}
            >
            <div style={modalStyle} className={classes.paper}>
                <h2>i am a model</h2>
            </div>
            );

            </Modal>
        </div>
    )
}