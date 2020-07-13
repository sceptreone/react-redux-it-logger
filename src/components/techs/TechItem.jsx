import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const TechItem = ({ tech }) => {
  return (
    <Fragment>
      <ListItem>
        <Typography component='h4'>
          {tech.firstName} {tech.lastName}
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

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
};

export default TechItem;
