import React, { useState } from 'react';
import { ContactContext } from './ContactContext';

const ContactProvider = ({children}) => {
    const [contact, setContact] = useState([])
    return (
        <div>
            <ContactContext.Provider value={{contact, setContact}}>
                {children}
            </ContactContext.Provider>
        </div>
    );
};

export default ContactProvider;