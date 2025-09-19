// src/components/ContactList.js
import React from 'react';

const ContactList = ({ contacts, onDeleteContact }) => {
    return (
        <ul className="contact-list">
            {contacts.map((contact) => (
                <li key={contact.id} className="contact-item">
                    <div className="contact-details">
                        <span className="name">{contact.name}</span>
                        <span className="email">{contact.email}</span>
                        <span className="phone">{contact.phone}</span>
                    </div>
                    <button
                        onClick={() => onDeleteContact(contact.id)}
                        className="delete-btn"
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default ContactList;