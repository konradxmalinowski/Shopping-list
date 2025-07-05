import { type CategoriesType, type ItemType, type Result } from './App';

type AllCategories = {
  message: string;
  success: boolean;
  items?: CategoriesType[];
};

interface AddItemResponse {
  message: string;
  success: boolean;
  items: ItemType[]; // dokładnie ta struktura, którą backend zwraca
}

export const getItems = async (): Promise<ItemType[] | undefined> => {
  try {
    const response: Response = await fetch(
      'http://localhost/Shopping%20list/backend/items.php'
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = async (id: number): Promise<Result | undefined> => {
  try {
    const response: Response = await fetch(
      'http://localhost/Shopping%20list/backend/delete-item.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addItem = async (
  name: string,
  category: string
): Promise<AddItemResponse | undefined> => {
  try {
    const response: Response = await fetch(
      'http://localhost/Shopping%20list/backend/add-item.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, category }),
      }
    );

    const data: AddItemResponse = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async (): Promise<AllCategories | undefined> => {
  try {
    const response: Response = await fetch(
      'http://localhost/Shopping%20list/backend/categories.php'
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
