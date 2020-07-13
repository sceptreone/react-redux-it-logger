import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';

import AddLogModal from '../logs/AddLogModal';
import AddTechModal from '../techs/AddTechModal';
import TechListModal from '../techs/TechListModal';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 50,
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const AddBtn = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [logModal, setLogModal] = useState(false);
  const [techModal, setTechModal] = useState(false);
  const [techListModal, setTechListModal] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logModalOpen = () => {
    setLogModal(true);
  };

  const logModalClose = () => {
    setLogModal(false);
  };

  const techModalOpen = () => {
    setTechModal(true);
  };

  const techModalClose = () => {
    setTechModal(false);
  };

  const techListModalOpen = () => {
    setTechListModal(true);
  };

  const techListModalClose = () => {
    setTechListModal(false);
  };

  const actions = [
    {
      icon: <PersonAddIcon onClick={techModalOpen} color='primary' />,
      name: 'Add Technician',
    },
    {
      icon: <PersonIcon onClick={techListModalOpen} color='primary' />,
      name: 'Add Person',
    },
  ];

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel='SpeedDial openIcon example'
        className={classes.speedDial}
        icon={<SpeedDialIcon onClick={logModalOpen} openIcon={<EditIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      <AddLogModal logModal={logModal} logModalClose={logModalClose} />
      <AddTechModal techModal={techModal} techModalClose={techModalClose} />
      <TechListModal
        techListModal={techListModal}
        techListModalClose={techListModalClose}
      />
    </div>
  );
};

export default AddBtn;
