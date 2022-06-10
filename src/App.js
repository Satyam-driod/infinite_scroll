import { useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import PrivateRoute from './Routing/PrivateRoute';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {Button} from 'react-bootstrap';
import history from './history';

function App() {

  const [user, setUser] = useState(null);
  const handleLogin = (e) => {
    // e.preventDefault();
    localStorage.setItem("user",user);
    history.push(`/home`);
  }
  const handleLogout = () => {
    localStorage.removeItem("user");
    history.push("/");
  }
  
  return (
    <Router history={history}>
      <div className="App">

      <Navbar color="dark" light expand="md">
          <NavbarBrand href="/home"><h2 style={{color:'white'}}>Welcome</h2></NavbarBrand>
          {localStorage.getItem("user")?
            <Nav className="ml-auto">
                    <Button variant="hidden-profile" onClick={handleLogout}>
                        Logout
                    </Button>
            </Nav>
            :
              <Nav className="ml-auto " navbar>
                <NavItem>
                  <NavLink className='navlink' href="/" style={{color:'white'}}>Login</NavLink>
                </NavItem>      
              </Nav>
              }
        </Navbar>


        <Routes>
          <Route exact path="/" element={<Login handleLogin={handleLogin} user={user} setUser={setUser}/>}></Route>
          <Route exact path="/home" 
                      element={<PrivateRoute user={user}>
                                <Home />
                              </PrivateRoute>}>
                      
          </Route>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
