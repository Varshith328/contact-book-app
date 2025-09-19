// src/components/ContactForm.js
import React, { useState } from 'react';

const ContactForm = ({ onAddContact }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required';
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(phone)) {
            newErrors.phone = 'Phone number must be 10 digits';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onAddContact({ name, email, phone });
        // Reset form
        setName('');
        setEmail('');
        setPhone('');
        setErrors({});
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                />
                {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.doe@example.com"
                />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
                <label>Phone</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="1234567890"
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
            </div>
            <button type="submit" className="submit-btn">Add Contact</button>
        </form>
    );
};

export default ContactForm;