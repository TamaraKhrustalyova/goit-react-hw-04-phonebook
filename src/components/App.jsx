import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import {SearchFilter} from './SearchFilter/SearchFilter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid'
import {Container, ContactTitle, PhonebookTitle, SubTitle} from './App.styled'

export function App () {

const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem('contacts')) ?? []);
const [filter, setFilter] = useState('');
  
const formSubmitHandler = (data) => {
  // console.log(data)
  const {name} = data;
      if (contacts.find((contact) => contact.data.name === name)) {
      return alert (`Contact ${name} already exists`);
    }
  setContacts(prevState => [{id: nanoid(), data}, ...prevState]);
};

const filterHandler = (e) => {
    setFilter(e.currentTarget.value);
  }

const getFilteredContacts = () => {
  return contacts.filter(({data: {name}}) =>
   name.toLowerCase().includes(filter.toLowerCase()),
  );
};

const handleDelete = id => {
 setContacts(prevState => [...prevState.filter(contact => contact.id !== id)]);
};

useEffect(() => {
  window.localStorage.setItem('contacts', JSON.stringify(contacts))
}, [contacts])

    return (
      <Container>
          <PhonebookTitle>Phonebook</PhonebookTitle>
          <ContactForm onFormSubmit={formSubmitHandler}/>

          <ContactTitle>Contacts</ContactTitle>

          <SubTitle>Find contact by name</SubTitle>
          <SearchFilter 
            value={filter} 
            onChange={filterHandler}
          />

          <ContactList 
            contacts={getFilteredContacts()}
            deleteContact={handleDelete} 
          />     
      </Container>
    )
  
};