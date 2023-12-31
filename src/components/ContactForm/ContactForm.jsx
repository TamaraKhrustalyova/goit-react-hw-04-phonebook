import { useState } from 'react';
import PropTypes from 'prop-types';
import {Form, Label, Input, Btn} from './ContactForm.styled'

export function ContactForm ({onFormSubmit}) {

const [name, setName] = useState('');
const [number, setNumber] = useState('');

const handleChange = (e) => {
    const {name, value} = e.currentTarget;
    
    switch (name) {
        case 'name':
            setName(value);
            break;
        
        case 'number':
            setNumber(value);
            break;

        default: return;    
    }
}

const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit({name, number});
    reset();
}

const reset = () => {
    setName('');
    setNumber('');
}

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Label htmlFor="">
                    Name
                    <Input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    />
                </Label>
                <Label htmlFor="">
                Phone number
                <Input
                    type="tel"
                    name="number"
                    value={number}
                    onChange={handleChange}
                    // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required 
                />
                </Label>
                <Btn type='submit'>Add contact</Btn>     
            </Form>
        </>        
     )
    }

ContactForm.propTypes = {
    onFormSubmit: PropTypes.func,
};