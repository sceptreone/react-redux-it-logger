import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { addTech } from '../../actions/techActions';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: '50%',
    width: '60%',
  },
  formControl: {
    minWidth: 120,
    marginTop: '20px',
  },
  button: {
    marginTop: '40px',
  },
}));

const AddTechModal = ({ techModal, techModalClose, addTech }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (techModal === true) {
      setModalOpen(true);
    }
    // eslint-disable-next-line
  }, [techModal]);

  const modalHandleClose = () => {
    setModalOpen(false);
    techModalClose();
  };

  const onSubmit = () => {
    addTech({
      firstName,
      lastName,
    });

    //Clear Fields
    setFirstName('');
    setLastName('');
    modalHandleClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={modalOpen}
        onClose={modalHandleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <div className={classes.paper}>
            <Typography id='transition-modal-title' variant='h4' gutterBottom>
              New Technician
            </Typography>
            <FormGroup row>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor='firstName'>First Name</InputLabel>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>
            </FormGroup>
            <FormGroup row>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor='lastName'>Last Name</InputLabel>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormControl>
            </FormGroup>
            <FormGroup row>
              <Button
                className={classes.button}
                onClick={onSubmit}
                variant='contained'
                color='primary'
              >
                Submit
              </Button>
            </FormGroup>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

AddTechModal.propTypes = {
  addTech: PropTypes.func.isRequired,
};

export default connect(null, { addTech })(AddTechModal);
