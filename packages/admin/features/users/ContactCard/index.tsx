import React from 'react';
import CardForm from '~/components/CardForm';
import ContactForm from './ContactForm';
import usersService from 'services/userService';

const formRender = props => <ContactForm {...props} />;

const ContactCard = () => {
  return (
    <CardForm
      mutation={usersService.upsert}
      formRender={formRender}
      title="User Information"
    >
      abc
    </CardForm>
  );
};

export default ContactCard;
