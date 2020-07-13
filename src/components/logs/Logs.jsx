import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import Divider from '@material-ui/core/Divider';

import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
    marginTop: '40px',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  subheader: {
    padding: '30px 0px 30px 30%',
  },
}));

const Logs = ({ log: { logs, loading }, getLogs }) => {
  const classes = useStyles();

  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (loading || logs === null) {
    return <Preloader />;
  }

  return (
    <Grid container justify='center'>
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
              System Logs
            </Typography>
          </ListSubheader>
        }
        className={classes.root}
      >
        <Divider />
        {!loading && logs.length === 0 ? (
          <ListItem>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary='No logs to show...' />
          </ListItem>
        ) : (
          logs.map((log) => <LogItem key={log.id} log={log} />)
        )}
      </List>
    </Grid>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.log,
});

export default connect(mapStateToProps, { getLogs })(Logs);
