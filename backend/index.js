// importujemy z node_modules
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json()); // aby móc odczytać z body wartości

// ---------------------------------------------
// ustawianie nagłówków
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // aby aplikacja mogła działać
  next();
});

// ---------------------------------------------
// tworzenie połaczenia
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shopping',
});

// ---------------------------------------------
// łaczenie z bazą danych
db.connect((error) => {
  if (error) {
    console.log('Failed to connect to the database', error.message);
    return;
  }
  console.log('Connected to the database');
});

// ---------------------------------------------
// do obsługi zapytań GET
// req - żądanie klienta, res - odpowiedź z serwera
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Backend works!' });
});

// ---------------------------------------------
// tworzenie endpoint'a - metoda GET

app.get('/items', (req, res) => {
  db.query(
    'SELECT items.id as item_id, items.Name as item_name, categories.Name as category_name, categories.id_category as category_id FROM items inner join categories on items.id_category = categories.id_category;',
    (error, results) => {
      if (error) {
        res
          .status(500)
          .json({ message: 'Failed to select items from database' });
        return;
      }
      res.status(200).json(results);
    }
  );
});

// ---------------------------------------------
// tworzenie endpoint'a - metoda POST

async function getID(category) {
  const query = 'SELECT Id_category from categories where Name = ?';

  return new Promise((resolve, reject) => {
    db.query(query, [category], (error, result) => {
      if (error) {
        reject(new Error('Failed to get category id'));
      } else {
        if (result.length === 0) {
          reject('Category not found');
          return;
        }

        // np. id = [{category_id: 1}]
        return resolve(result[0].Id_category);
      }
    });
  });
}

app.post('/add-item', async (req, res) => {
  const { name, category } = req.body;

  if (!name || name.trim() === '') {
    res.status(400).json({ message: 'Name of item was not provided' });
    return;
  }

  if (!category || category.trim() === '') {
    res.status(400).json({ message: 'Category of item was not provided' });
    return;
  }

  // get category_id
  const id = await getID(category);

  if (!id) {
    res
      .status(500)
      .json({ message: 'Failed to get category name', success: false });
    return;
  }

  const sql = 'INSERT INTO items(name, Id_category) VALUES(?, ?)';
  db.query(sql, [name, id], (error, result) => {
    if (error || result.affectedRows === 0) {
      res
        .status(500)
        .json({ message: 'Failed to insert data', success: false });
      return;
    }

    db.query(
      'SELECT items.id as item_id, items.Name as item_name, categories.Name as category_name, categories.id_category as category_id FROM items inner join categories on items.id_category = categories.id_category;',
      (error, results) => {
        if (error) {
          res
            .status(500)
            .json({ message: 'Failed to select items from database' });
          return;
        }

        res.status(201).json({
          message: 'Item has been added',
          success: true,
          items: results,
        });
      }
    );
  });
});

// ---------------------------------------------
app.post('/delete-item', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Id was not provided' });
  }

  const sql = 'DELETE FROM items WHERE Id = ?';
  db.query(sql, [id], (error, result) => {
    if (error) {
      return res
        .status(500)
        .json({ message: 'Failed to delete item', success: false });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: 'Item was not found', success: false });
    }

    return res.status(200).json({
      message: 'Item has been deleted',
      success: true,
    });
  });
});

// ---------------------------------------------

app.get('/categories', (req, res) => {
  const sql = 'SELECT Name as name from categories';
  db.query(sql, (error, result) => {
    if (error) {
      res
        .status(500)
        .json({ message: 'Failed to select categories', success: false });
      return;
    }

    if (result.length === 0) {
      res
        .status(500)
        .json({ message: 'Failed to select categories', success: false });
      return;
    }

    return res.status(200).json({
      message: 'Successfully selected categories',
      success: true,
      items: result,
    });
  });
});

/*
res.status(code).json(); // zwraca w formacie .json
res.status(code).send(); // zwraca po prostu tekst

✔️ res.sendStatus() – gdy chcesz tylko wysłać status i jego tekst.
✔️ res.status().send()/json() – gdy chcesz wysłać status i własną treść odpowiedzi (tekst lub JSON).
*/

// uruchamiamy server
app.listen(port, () => {
  console.log(`Backend running on server http://localhost:${port}`);
});
