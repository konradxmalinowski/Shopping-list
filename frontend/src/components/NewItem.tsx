import ItemWrapper from './ItemWrapper';

import saveIcon from '../assets/save-icon.png';
import { useState } from 'react';
import { addItem } from '../http';
import type { ItemType } from '../App';

const NewItem = ({
  categoryName,
  setItems,
}: {
  categoryName: string;
  setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
}) => {
  const [newValue, setNewValue] = useState<string>('');

  const onSave = async () => {
    if (newValue.trim() === '') {
      console.log('Empty value!');
      return;
    }

    if (newValue.length > 200) {
      alert('Too long!!');
      console.log('Too long!!');
      return;
    }

    const result = await addItem(newValue, categoryName);

    if (!result?.success) {
      console.log(result?.message);
      return;
    }

    if (result.items) {
      setItems(result.items);
    }

    setNewValue('');
  };

  return (
    <ItemWrapper className="justify-center">
      <input
        type="text"
        name={`newItem-${categoryName}`}
        id={`newItem-${categoryName}`}
        onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
          setNewValue(event.target.value ?? '');
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onSave();
          }
        }}
        value={newValue}
        placeholder="Dodaj nowy przedmiot..."
        className="w-full rounded-xl border border-dashed border-green-500 px-4 py-2 text-base outline-none mx-4 focus:border-green-700 focus:border-solid transition"
      />

      <button onClick={onSave} className="bg-transparent">
        <img src={saveIcon} alt="trash icon" className="w-8" />
      </button>
    </ItemWrapper>
  );
};

export default NewItem;
