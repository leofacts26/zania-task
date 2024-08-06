import { http } from 'msw';

const initialData = [
  { type: 'bankdraft', title: 'Bank Draft', position: 0 },
  { type: 'bill-of-lading', title: 'Bill of Lading', position: 1 },
  { type: 'invoice', title: 'Invoice', position: 2 },
  { type: 'bank-draft-2', title: 'Bank Draft 2', position: 3 },
  { type: 'bill-of-lading-2', title: 'Bill of Lading 2', position: 4 },
];

const getDataFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('documents');
    console.log('Data from localStorage:', data); // Debugging
    return data ? JSON.parse(data) : initialData;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return initialData;
  }
};

const saveDataToLocalStorage = (data) => {
  try {
    localStorage.setItem('documents', JSON.stringify(data));
    console.log('Saved data to localStorage:', data); // Debugging
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

export const handlers = [
  http.get('/api/documents', (req, res, ctx) => {
    const documents = getDataFromLocalStorage();
    return res(ctx.json(documents));
  }),

  http.post('/api/documents', (req, res, ctx) => {
    const newDocument = req.body;
    if (!newDocument) {
      return res(ctx.status(400).json({ error: 'Bad Request' }));
    }
    const documents = getDataFromLocalStorage();
    documents.push(newDocument);
    saveDataToLocalStorage(documents);
    return res(ctx.status(201).json(newDocument));
  }),

  http.put('/api/documents', (req, res, ctx) => {
    const updatedDocuments = req.body;
    if (!updatedDocuments) {
      return res(ctx.status(400).json({ error: 'Bad Request' }));
    }
    saveDataToLocalStorage(updatedDocuments);
    return res(ctx.json(updatedDocuments));
  }),
];
