import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import TechItem from './TechItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  subheader: {
    marginBottom: '20px',
  },
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
    width: '50%',
  },
}));

const TechListModal = ({ techListModal, techListModalClose }) => {
  const classes = useStyles();
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const getTechs = async () => {
    setLoading(true);

    const res = await fetch('/techs');
    const data = await res.json();

    setTechs(data);
    setLoading(false);
  };

  useEffect(() => {
    if (techListModal === true) {
      setModalOpen(true);
      getTechs();
    }
    // eslint-disable-next-line
  }, [techListModal]);

  const modalHandleClose = () => {
    setModalOpen(false);
    techListModalClose();
  };

  return (
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
          <List
            component='nav'
            aria-labelledby='nested-list-subheader'
            subheader={
              <ListSubheader
                className={classes.subheader}
                component='div'
                id='nested-list-subheader'
              >
                <Typography variant='h4' component='h4'>
                  Technician List
                </Typography>
              </ListSubheader>
            }
            className={classes.root}
          >
            <Divider />
            {!loading && techs.length === 0 ? (
              <ListItem>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary='No techs available...' />
              </ListItem>
            ) : (
              techs.map((tech) => <TechItem key={tech.id} tech={tech} />)
            )}
          </List>
        </div>
      </Fade>
    </Modal>
  );
};

export default TechListModal;
