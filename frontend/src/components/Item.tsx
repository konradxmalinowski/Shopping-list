import { useState } from 'react';
import type { ItemType } from '../App';
import trashIcon from '../assets/filled-trash-icon.png';
import { deleteItem } from '../http';
import ItemWrapper from './ItemWrapper';

const Item = ({
  value,
  id,
  setItems,
}: {
  value: string;
  id: number;
  setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
}) => {
  const [className, setClassName] = useState<string>('');

  const onDelete = async () => {
    try {
      const result = await deleteItem(id);
      if (!result?.success) {
        console.log(result?.message);
        return;
      }

      setClassName('translate-x-[300%]');

      setTimeout(() => {
        setItems((items) => {
          const updatedItems = [...items].filter((item) => {
            return item.item_id != id;
          });

          return updatedItems;
        });
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ItemWrapper className={className}>
      <span>{value}</span>
      <button onClick={onDelete}>
        <img src={trashIcon} alt="trash icon" className="w-8" />
      </button>
    </ItemWrapper>
  );
};

export default Item;
