import { Route, Routes, Link  } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ReadingListPage from './pages/ReadingListPage';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import AddRecordPage from './pages/AddRecordPage';

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">📖 My Reading Journal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/reading-list">Reading List</Nav.Link>
              <Link to='/add-record'>
                <Button variant="primary" className="ms-2">+ 새 기록</Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reading-list" element={<ReadingListPage />} />
          <Route path='/add-record' element={<AddRecordPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
