import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateLog } from '../../actions/logActions';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

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
    height: '60%',
    width: '60%',
  },
  formControl: {
    minWidth: 120,
    marginTop: '30px',
  },
  formControlLabel: {
    marginTop: '30px',
  },
  button: {
    marginTop: '30px',
  },
}));

const EditLogModal = ({
  editLogModal,
  editLogModalClose,
  current,
  updateLog,
}) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  }, [current]);

  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (editLogModal === true) {
      setModalOpen(true);
    }
    // eslint-disable-next-line
  }, [editLogModal]);

  const modalHandleClose = () => {
    setModalOpen(false);
    editLogModalClose();
  };

  const onSubmit = () => {
    const updatedLog = {
      id: current.id,
      message,
      attention,
      tech,
      date: new Date(),
    };

    updateLog(updatedLog);

    //Clear Fields
    setMessage('');
    setTech('');
    setAttention(false);

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
              Edit System Log
            </Typography>
            <FormGroup row>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor='message'>Log Message</InputLabel>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </FormControl>
            </FormGroup>
            <FormGroup row>
              {' '}
              <FormControl
                fullWidth
                variant='outlined'
                className={classes.formControl}
              >
                <InputLabel id='select-tech'>Select Technician</InputLabel>
                <Select
                  required
                  labelId='select-tech'
                  value={tech}
                  onChange={(e) => setTech(e.target.value)}
                >
                  <MenuItem value=''>
                    <em>Select Technician</em>
                  </MenuItem>
                  <MenuItem value='John'>John</MenuItem>
                  <MenuItem value='Sam'>Sam</MenuItem>
                  <MenuItem value='Zoey'>Zoey</MenuItem>
                </Select>
              </FormControl>
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                className={classes.formControlLabel}
                control={
                  <Checkbox
                    checked={attention}
                    onChange={(e) => setAttention(!attention)}
                    color='primary'
                  />
                }
                label='Needs Attention'
              />
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

EditLogModal.propTypes = {
  updateLog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  current: state.log.current,
});

export default connect(mapStateToProps, { updateLog })(EditLogModal);
