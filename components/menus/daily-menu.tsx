import { useState } from 'react';

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
    <li key={item.id}>
      <input
        type="text"
        defaultValue={item.item}
        onChange={valueChangeHandler}
      />
      <button
        onClick={() => {
          removeItemHandler(i);
        }}
      >
        X
      </button>
    </li>
  ));

  return (
    <>
      <ul>{inputs}</ul>
      <button onClick={addItemHandler}>Add Item</button>
    </>
  );
};

export default DailyMenu;
