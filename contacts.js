const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const rezult = contacts.find(item => item.id === `${contactId}`);

  return rezult || null;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const lastElement = contacts[contacts.length - 1];
  const id = Number(lastElement.id) + 1;

  const newContact = { id: `${id}`, name, email, phone };

  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === `${contactId}`);

  if (index === -1) return null;

  const [removeContact] = contacts.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removeContact;
};

module.exports = { listContacts, getContactById, addContact, removeContact };
