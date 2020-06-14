import Typography from '@material-ui/core/Typography';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { List, MenuItem } from '@material-ui/core';

function SuggestionsList({ list, listItemClass, onListItemClick }) {
  return (
    <List className="suggestion-list">
      <Paper>
        {list.map(item => (
          <MenuItem
            key={`Place ${item.place_id}`}
            onClick={onListItemClick(item)}
            className={listItemClass}
            value={item.place_id}
            data-role="suggestion"
          >
            <Typography noWrap>{item.description}</Typography>
          </MenuItem>
        ))}
      </Paper>
    </List>
  );
}

export default SuggestionsList;
