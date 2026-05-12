import React, { useState, useEffect } from 'react';
import { Table, Form, Row, Col, Alert, Badge, InputGroup } from 'react-bootstrap';
import { bookService } from '../services/api';

const BookCatalog = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAvailableBooks();
  }, []);

  const fetchAvailableBooks = async () => {
    try {
      const response = await bookService.getAvailableBooks();
      setBooks(response.data);
    } catch (err) {
      console.error('Error fetching available books:', err);
      setError('Failed to load book catalog.');
    }
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-4">
      <h2>Book Catalog</h2>
      <p className="text-muted">Browse books currently available in the library.</p>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>Search</InputGroup.Text>
            <Form.Control 
              placeholder="Search by title or author..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.length > 0 ? filteredBooks.map(book => (
            <tr key={book.bookId}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <Badge bg="success">Available</Badge>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="3" className="text-center">No books match your search.</td></tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default BookCatalog;
