import {
  useState,
  forwardRef,
  ChangeEventHandler,
  ChangeEvent,
  useEffect,
} from 'react';

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
  onChange: (newMenu: IDailyMenu) => void;
};

interface IDishesListItem {
  key: number;
  dish: string;
}

const DailyMenu = (props: DailyMenuProps) => {
  const [dishesList, setDishesList] = useState<IDishesListItem[]>([]);

  useEffect(() => {
    setDishesList(props.menu.dishes.map((dish, i) => ({ key: i, dish })));
  }, [props.menu]);

  const valueChangeHandler = (
    event: ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const newValue = event.target.value;

    setDishesList((prevItems) => {
      const newItems = [...prevItems];
      newItems[i].dish = newValue;

      props.onChange({
        weekDay: props.menu.weekDay,
        dishes: newItems.map((item) => item.dish),
      });

      return newItems;
    });
  };

  const removeItemHandler = (i: number) => {
    setDishesList((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(i, 1);
      props.onChange({
        weekDay: props.menu.weekDay,
        dishes: newItems.map((item) => item.dish),
      });
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

      props.onChange({
        weekDay: props.menu.weekDay,
        dishes: newItems.map((item) => item.dish),
      });

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
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          valueChangeHandler(e, i);
        }}
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
      <Box>
        <List>{inputs}</List>
        <Button variant="contained" type="button" onClick={addItemHandler}>
          Add Item
        </Button>
      </Box>
    </>
  );
};

const DailyMenu2 = forwardRef(function DailyMenu2() {
  return <>Nothing</>;
});

export default DailyMenu;
