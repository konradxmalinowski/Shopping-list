import type { ItemType } from '../App';
import Item from './Item';
import NewItem from './NewItem';

const Category = ({
  title,
  items,
  setItems,
}: {
  title: string;
  items: ItemType[];
  setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
}) => {
  return (
    <div className="w-full flex flex-col gap-y-2.5">
      <span className="font-medium text-2xl">{title}</span>
      {items.map((item: ItemType) => (
        <Item
          value={item.item_name}
          id={item.item_id}
          setItems={setItems}
          key={item.item_id}
        />
      ))}
      <NewItem categoryName={title.trim()} setItems={setItems} />
    </div>
  );
};

export default Category;
