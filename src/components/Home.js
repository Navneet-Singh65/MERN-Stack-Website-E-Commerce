//import React, { useState } from 'react';
import Axios from "axios";
import React, { useState, useEffect } from 'react';
import {Form,Button,Navbar,Nav,Container,Carousel,Table} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function Home()
{

  const [mylist, setList] = useState([]);
  useEffect(() => {

    Axios.get("http://localhost:4200/showproduct").then(
      res => setList(res.data));

    console.log("once");

  }, []);
  const navigate = useNavigate();
  function onAdd() {
    navigate('/login');
  }
return(
<>

<Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="a1.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>High Class Cloths</h3>
      <p>Superior Quality cloths can effect your style of living</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="a4.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>All Brands</h3>
      <p>Brand visibility is unique with us</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="a2.jpg"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Whole sale prices</h3>
      <p>Effective Prices.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="a3.jpg"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Gents all collection in cloths</h3>
      <p> Collections includes shirts,tshirts,trouser,caps , shoes.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>


<div>
<Container>
                 <h2 align="center">  PRODUCTS </h2>
                
<hr/>    
<Table striped bordered hover> 
<thead>

<th> Image</th><th>Id</th> <th> Name </th> <th> Price </th>
<th>Add Cart</th>
</thead>
<tbody>
                        {mylist.map((item,index)=>{
                            
                            return(
                                <tr key={index}>
 <td><img src={item.product_image} width="100" height="100" /></td>
                                    <td>{item.product_id}</td>
                                    <td>{item.product_name}</td>
                                    <td>{item.product_price}</td>
                                <td>
                                 
<Button variant="success" type="button"  id={item.product_id}
                      onClick={onAdd}>
    Add To Cart
  </Button>                              
    
                          
</td>




                                    </tr>
                            );
                        })}

                        
                    </tbody>
</Table>


</Container>

            </div>
   



</>


);

}