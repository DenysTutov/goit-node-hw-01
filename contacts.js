const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const rezult = contacts.find(item => item.id === `${contactId}`);

  if (!rezult) return null;

  return rezult;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };

  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === `${contactId}`);

  if (index === -1) return null;

  const [removeContact] = contacts.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts));

  return removeContact;
};

module.exports = { listContacts, getContactById, addContact, removeContact };
