// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Pagination from './components/Pagination';
import './App.css';

// The base URL of your backend API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/contacts';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // useCallback ensures this function is not recreated on every render
  const fetchContacts = useCallback(async (page) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}?page=${page}&limit=10`);
      setContacts(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (err) {
      setError('Failed to fetch contacts. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts(currentPage);
  }, [fetchContacts, currentPage]);

  const handleAddContact = async (contact) => {
    try {
      await axios.post(API_URL, contact);
      // After adding, fetch the first page to see the new contact
      // A more complex app might check if it should be on the current page
      if (currentPage !== 1) {
          setCurrentPage(1);
      } else {
          fetchContacts(1);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to add contact.';
      alert(errorMessage); // Simple alert for user feedback
      console.error(err);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Refetch contacts on the current page
      // If it's the last item on a page, you might want to go to the previous page
      fetchContacts(currentPage);
    } catch (err) {
      alert('Failed to delete contact.');
      console.error(err);
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Contact Book 📖</h1>
      </header>
      <main>
        <ContactForm onAddContact={handleAddContact} />

        {error && <p className="centered-message error">{error}</p>}
        
        {isLoading ? (
          <p className="centered-message">Loading contacts...</p>
        ) : contacts.length > 0 ? (
          <>
            <ContactList contacts={contacts} onDeleteContact={handleDeleteContact} />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          !error && <p className="centered-message">No contacts found. Add one above!</p>
        )}
      </main>
    </div>
  );
}

export default App;