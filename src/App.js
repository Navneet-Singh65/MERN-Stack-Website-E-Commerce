
import ReactDOM from 'react-dom';
import Admin from './components/Admin_Home';
import Customer from './components/Customer_Home';
import Login from './components/Login';
import Shirt from './components/Shirt';
import Tshirt from './components/Tshirt';
import Trouser from './components/Trouser';
import Shoes from './components/Shoes';
import Caps from './components/Caps';

import Home from './components/Home';
import Services from './components/Services';
import Contact from './components/Contact';
import Register from './components/Register';
import Cart from './components/View_Cart';
import Payment from './components/Payment';
import Bill from './components/Bill';
import { Route, Link, Routes} from 'react-router-dom';
import {Form,Button,Navbar,Nav,Container,Carousel} from 'react-bootstrap';

const App=() => (
  <>

<Navs />







<Routes>
<Route exact path="/" element={<Home/>} />
  
    <Route  path="/admin" element={<Admin/>} />
    <Route  path="/customer" element={<Customer/>} />
    <Route  path="/login" element={<Login/>} />
 <Route  path="/viewcart" element={<Cart/>} />
 <Route  path="/contact" element={<Contact/>} />
 <Route  path="/services" element={<Services/>} />
 <Route  path="/register" element={<Register/>} />
 <Route  path="/payment" element={<Payment/>} />
 <Route  path="/bill" element={<Bill/>} />
 <Route  path="/shirt" element={<Shirt/>} />
 <Route  path="/tshirt" element={<Tshirt/>} />
 <Route  path="/shoes" element={<Shoes/>} />
 <Route  path="/trouser" element={<Trouser/>} />
 <Route  path="/caps" element={<Caps/>} />

 </Routes>


</>
);
function Navs()
{

  return(

<>
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="/">Ecommerce</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
    <Nav.Link href="/">Home</Nav.Link>
    
      <Nav.Link href="/services">Offers</Nav.Link>
      <Nav.Link href="/shirt">Shirts</Nav.Link>
      <Nav.Link href="/tshirt">Tshirt</Nav.Link>
      <Nav.Link href="/trouser">Trouser</Nav.Link>
      <Nav.Link href="/shoes">Shoes</Nav.Link>
      <Nav.Link href="/caps">Caps</Nav.Link>
  
    </Nav>
    <Nav>
      <Nav.Link href="/register">Register</Nav.Link>
      <Nav.Link eventKey={2} href="/login">
        Login
      </Nav.Link>
      <Nav.Link href="/viewcart"><img src="cart.png" width="30" height="30" /></Nav.Link>
    
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>





</>
  );
}




export default App;