import "./App.css";
import { useState, useEffect } from "react";
import AuthService from "./services/auth.service";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home.component";
import InternInformation from "./components/internInformation.components";
import { NavDropdown, Navbar, Container, Nav } from "react-bootstrap";
import Register from "./components/register.component";
import Login from "./components/login.component";
import Profile from "./components/profile.component";
function App() {
  const [currentUser, setCurrentUser] = useState({});
  const history = useNavigate();
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      console.log("?0");
      setCurrentUser(user);
    }
  }, [history]);
  function logOut() {
    AuthService.logout();
    setCurrentUser({});
  }
  return (
    <div>
      <Navbar variant="dark" bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Interns Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          {currentUser.username ? (
            <Navbar.Collapse id="navbar-dark-example">
              <Nav style={{ paddingLeft: "100%" }}>
                <NavDropdown
                  align={{ lg: "end" }}
                  id="nav-dropdown-dark-example"
                  title=""
                  menuVariant="dark"
                  size="large"
                  className="drop"
                >
                  <NavDropdown.Header>
                    Welcome, {currentUser.username}
                  </NavDropdown.Header>
                  <NavDropdown.Item href={"user/" + currentUser.id}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/" onClick={logOut}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          ) : (
            <>
              <Nav className="me-auto">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav>
            </>
          )}
        </Container>
      </Navbar>
      <div className="container mt-3">
        <Routes>
          <Route
            exact
            path="/"
            element={currentUser.username ? <Home /> : <Login />}
          />
          <Route path="/intern/:id" element={<InternInformation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:id" element={ <Profile />} />
        </Routes>
      </div>
      {/* <InternInformation/> */}
    </div>
  );
}

export default App;
