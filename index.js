const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv)).argv;

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      if (id) {
        getContactById(id);
      } else {
        console.error("ID de contacto no proporcionado.");
      }
      break;

    case "add":
      if (name && email && phone) {
        addContact(name, email, phone);
      } else {
        console.error("Faltan argumentos para añadir el contacto.");
      }
      break;

    case "remove":
      if (id) {
        removeContact(id);
      } else {
        console.error("ID de contacto no proporcionado.");
      }
      break;

    default:
      console.warn("\x1B[31m Tipo de acción desconocida!");
  }
}

invokeAction(argv);
