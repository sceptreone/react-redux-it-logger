import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  logItem: {
    display: 'block',
  },
  logItemTextBlue: {
    color: 'blue',
  },
  logItemTextRed: {
    color: 'red',
  },
  spanGrey: {
    color: 'grey',
  },
  spanBlack: {
    color: 'black',
  },
}));

const LogItem = ({ log }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <ListItem className={classes.logItem}>
        <ListItemText
          className={
            log.attention ? classes.logItemTextBlue : classes.logItemTextRed
          }
          primary={log.message}
        />
        <br />
        <Typography component='span' className={classes.spanGrey}>
          <Typography component='span' className={classes.spanBlack}>
            ID #{log.id}
          </Typography>{' '}
          last updated by{' '}
          <Typography component='span' className={classes.spanBlack}>
            {log.tech}
          </Typography>
          on <Moment format='MMMM Do YYYY, h:mm:ss a'>{log.data}</Moment>
        </Typography>
        <ListItemSecondaryAction>
          <IconButton edge='end' aria-label='delete'>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Fragment>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
};

export default LogItem;
