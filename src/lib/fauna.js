import faunadb from 'faunadb';
const q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

export const addProduct = (name, quantity) =>
  client.query(
    q.Create(q.Collection('products'), { data: { name, quantity, sold: 0 } })
  );

export const sellProduct = (id, soldQty) =>
  client.query(
    q.Let(
      {
        ref: q.Ref(q.Collection('products'), id),
        data: q.Get(q.Var('ref'))
      },
      q.Update(q.Var('ref'), {
        data: {
          quantity: q.Select(['data', 'quantity'], q.Var('data')) - soldQty,
          sold: q.Select(['data', 'sold'], q.Var('data')) + soldQty
        }
      })
    )
  );

export const getProducts = () =>
  client.query(
    q.Map(q.Paginate(q.Documents(q.Collection('products'))), ref => q.Get(ref))
  );

// Nuevos productos
export const getBuildingMaterials = () => [
  { id: 1, name: 'Ladrillo 20-10', price: 330, image: 'https://placehold.co/250x200?text=Ladrillo+20-10' },
  { id: 2, name: 'Ladrillo 22-12', price: 450, image: 'https://placehold.co/250x200?text=Ladrillo+22-12' },
  { id: 3, name: 'Bloque No 4', price: 830, image: 'https://placehold.co/250x200?text=Bloque+No+4' },
  { id: 4, name: 'Bloque No 5', price: 900, image: 'https://placehold.co/250x200?text=Bloque+No+5' },
  { id: 5, name: 'Blocklon', price: 5000, image: 'https://placehold.co/250x200?text=Blocklon' },
  { id: 6, name: 'Regilla', price: 700, image: 'https://placehold.co/250x200?text=Regilla' },
  { id: 7, name: 'Adoquin', price: 650, image: 'https://placehold.co/250x200?text=Adoquin' },
  { id: 8, name: 'Tableta CUC', price: 24000, image: 'https://placehold.co/250x200?text=Tableta+CUC' },
  { id: 9, name: 'Teja Española', price: 700, image: 'https://placehold.co/250x200?text=Teja+Española' }
];