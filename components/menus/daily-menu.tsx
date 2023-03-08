import { useState, ChangeEvent, useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import theme from '../../styles/theme';

import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IDailyMenu from '../../models/daily-menu.model';
import { SxProps } from '@mui/material';

const dailyMenuStyles: SxProps = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
  width: '100%',
  '&>*': { width: '100%' },
  '.MuiList-root': {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(),
    width: '100%',
  },
  '.MuiListItem-root': {
    gap: theme.spacing(3),
    padding: `0 ${theme.spacing(2)}`,
    width: '100%',
  },
  '.MuiTextField-root': {
    flex: 1,
  },
  '#dishInputContainer': {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    gap: theme.spacing(2),
    '.MuiInputBase-input': {
      padding: { mobile: theme.spacing(), tablet: theme.spacing(2) },
    },
  },
};

interface IDishesListItem {
  key: number;
  dish: string;
}

type DailyMenuProps = {
  menu: IDailyMenu;
  onChange: (newMenu: IDailyMenu) => void;
  className?: string;
  sx?: SxProps;
};

const DailyMenu = (props: DailyMenuProps) => {
  const [dishesList, setDishesList] = useState<IDishesListItem[]>([]);
  const addDishInputRef = useRef<HTMLInputElement>();
  const { className = 'dailyMenu', sx = {} } = props;

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

      const newListItem = {
        key: nextKey,
        dish: addDishInputRef.current!.value,
      };

      newItems.push(newListItem);

      addDishInputRef.current!.value = '';

      props.onChange({
        weekDay: props.menu.weekDay,
        dishes: newItems.map((item) => item.dish),
      });

      return newItems;
    });
  };

  console.log(dishesList);

  const inputs = dishesList.map((item, i) => (
    <ListItem key={item.key}>
      <TextField
        aria-label="Dish"
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

  const styles = { ...sx, ...dailyMenuStyles };

  return (
    <Box className={className} sx={styles}>
      {inputs.length === 0 && (
        <Typography>There are currently no dishes for this day</Typography>
      )}
      {inputs.length !== 0 && <List>{inputs}</List>}
      <Box id="dishInputContainer">
        <TextField
          placeholder="Enter New Dish"
          inputRef={addDishInputRef}
        ></TextField>
        <Button variant="outlined" type="button" onClick={addItemHandler}>
          Add Item
        </Button>
      </Box>
    </Box>
  );
};

export default DailyMenu;
