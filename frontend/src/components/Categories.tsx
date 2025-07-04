import type { ItemType } from '../App';
import { getCategories } from '../http';
import Category from './Category';

const nestedAllCategories = await getCategories();
const allCategories =
  nestedAllCategories?.items?.map((item) => item.name) ?? [];

const Categories = ({
  items,
  setItems,
}: {
  items: ItemType[];
  setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
}) => {
  console.log(allCategories);

  const groupedCategories: Record<string, ItemType[]> = items.reduce(
    (acc, item) => {
      const category = item.category_name ?? 'Unknown';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    },
    {} as Record<string, ItemType[]>
  );

  return (
    <section className="w-full flex flex-col justify-center gap-y-8">
      {allCategories.map((categoryName) => (
        <Category
          title={categoryName}
          items={groupedCategories[categoryName] ?? []}
          key={categoryName}
          setItems={setItems}
        />
      ))}
    </section>
  );
};

export default Categories;
