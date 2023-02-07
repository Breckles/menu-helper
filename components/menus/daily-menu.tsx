import { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import IDailyMenu from '../../models/daily-menu.model';

type DailyMenuProps = {
  menu: IDailyMenu;
};

interface IDishesListItem {
  key: number;
  dish: string;
}

const valueChangeHandler = () => {};

const DailyMenu = (props: DailyMenuProps) => {
  const [dishesList, setDishesList] = useState<IDishesListItem[]>(
    props.menu.dishes.map((d, i) => ({ key: i, dish: d }))
  );
  const inputList: HTMLInputElement[] = [];

  const removeItemHandler = (i: number) => {
    console.log(i);
    setDishesList((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(i, 1);
      return newItems;
    });
  };

  const addItemHandler = () => {
    setDishesList((prevItems) => {
      const newItems = [...prevItems];
      let nextKey = 0;

      if (prevItems.length !== 0) {
        nextKey = prevItems[prevItems.length - 1].key + 1;
      }

      newItems.push({ key: nextKey, dish: '' });
      return newItems;
    });
  };

  const inputs = dishesList.map((item, i) => (
    <ListItem key={item.key}>
      <TextField
        aria-label="Dish"
        placeholder="Enter New Dish"
        variant="standard"
        defaultValue={item.dish}
        onChange={valueChangeHandler}
      ></TextField>
      <IconButton
        onClick={() => {
          removeItemHandler(i);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  ));

  return (
    <>
      <Box component="form" className="dailyMenuForm">
        <List>{inputs}</List>
        <Button variant="contained" type="button" onClick={addItemHandler}>
          Add Item
        </Button>
      </Box>
    </>
  );
};

export default DailyMenu;
