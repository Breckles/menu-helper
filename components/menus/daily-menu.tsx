import { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';

interface IMenuItem {
  id: string;
  item: string;
}

type DailyMenuProps = {
  items: IMenuItem[];
};

const valueChangeHandler = () => {};

const DailyMenu = (props: DailyMenuProps) => {
  const [listItems, setListItems] = useState<IMenuItem[]>(props.items);
  const inputList: HTMLInputElement[] = [];

  const removeItemHandler = (i: number) => {
    console.log(i);
    setListItems((prevItems) => {
      const newItems = [...prevItems];

      newItems.splice(i, 1);
      return newItems;
    });
  };

  const addItemHandler = () => {
    setListItems((prevItems) => {
      const newItems = [...prevItems];

      if (newItems.length === 0) {
        newItems.push({ id: '1', item: '' });
      } else {
        const nextKey = +prevItems[prevItems.length - 1].id + 1;
        newItems.push({ id: nextKey.toString(), item: '' });
      }

      return newItems;
    });
  };

  const inputs = listItems.map((item, i) => (
    <ListItem key={item.id}>
      <TextField
        aria-label="Dish"
        placeholder="Enter New Dish"
        variant="standard"
        defaultValue={item.item}
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
