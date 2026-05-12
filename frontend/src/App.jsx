import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';

import BookManagement from './pages/BookManagement';
import MemberManagement from './pages/MemberManagement';
import MemberDashboard from './pages/MemberDashboard';
import BookCatalog from './pages/BookCatalog';

const LibrarianDashboard = () => (
  <div className="mt-4 p-5 bg-light rounded-3">
    <h2>Librarian Administration</h2>
    <p className="lead">Manage the library's inventory, register members, and oversee book transactions.</p>
    <hr className="my-4" />
    <div className="d-flex gap-3">
      <Link to="/librarian/books" className="btn btn-primary btn-lg">Manage Books</Link>
      <Link to="/librarian/members" className="btn btn-success btn-lg">Manage Members</Link>
    </div>
  </div>
);

function App() {
  const [role, setRole] = useState('Librarian'); // Default role

  const toggleRole = () => {
    setRole(prev => (prev === 'Librarian' ? 'Member' : 'Librarian'));
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Library System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {role === 'Librarian' ? (
                <>
                  <Nav.Link as={Link} to="/librarian">Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/librarian/books">Books</Nav.Link>
                  <Nav.Link as={Link} to="/librarian/members">Members</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/member">My Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/member/catalog">Browse Books</Nav.Link>
                </>
              )}
            </Nav>
            <Nav>
              <Button variant="outline-info" onClick={toggleRole}>
                Switch to {role === 'Librarian' ? 'Member' : 'Librarian'} View
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/" element={<Navigate to={role === 'Librarian' ? "/librarian" : "/member"} />} />
          
          {/* Librarian Routes */}
          <Route path="/librarian" element={<LibrarianDashboard />} />
          <Route path="/librarian/books" element={<BookManagement />} />
          <Route path="/librarian/members" element={<MemberManagement />} />

          {/* Member Routes */}
          <Route path="/member" element={<MemberDashboard />} />
          <Route path="/member/catalog" element={<BookCatalog />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
