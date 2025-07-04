import { useEffect, useState } from 'react';
import { getItems } from './http';
import Categories from './components/Categories';

export type ItemType = {
  item_id: number;
  item_name: string;
  category_name: string;
  category_id: number;
};

export type CategoriesType = {
  name: string;
};

export type Result = {
  message: string;
  success: boolean;
};

export const App = () => {
  const [items, setItems] = useState<ItemType[]>([]);

  useEffect(() => {
    const fn = async () => {
      try {
        const items = await getItems();

        if (!items) {
          console.log('Failed to get items');
          return;
        }
        setItems(items);
      } catch (error) {
        console.log(error);
      }
    };

    fn();
  }, []);

  return (
    <main className="min-w-80 max-w-170 w-full flex flex-col items-start justify-center gap-y-4 bg-background2 p-6 rounded-xl">
      <h1 className="text-2xl font-semibold my-2.5">Lista zakupów</h1>
      <hr className="w-full bg-white" />
      {items && <Categories items={items} setItems={setItems} />}
    </main>
  );
};

export default App;
