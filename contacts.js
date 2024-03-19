const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      console.table(contacts);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.find((contact) => contact.id === contactId);
      console.table([contact]);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      let contacts = JSON.parse(data);
      contacts = contacts.filter((contact) => contact.id !== contactId);
      return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    })
    .then(() => {
      console.log(`Contact with ID ${contactId} removed successfully.`);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      let contacts = JSON.parse(data);
      const newContact = {
        id: Date.now().toString(),
        name,
        email,
        phone,
      };
      contacts.push(newContact);
      return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    })
    .then(() => {
      console.log("Contact added successfully.");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
