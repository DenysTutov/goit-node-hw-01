const argv = require('yargs').argv;

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require('./contacts');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contact = await getContactById(id);

      if (!contact) {
        throw new Error(`Product with id=${id} not found`);
      }

      console.log(contact);
      break;

    case 'add':
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      const remove = await removeContact(id);
      console.log(remove);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
