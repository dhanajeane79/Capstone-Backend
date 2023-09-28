import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import { Container, Row, Col } from 'react-bootstrap';

function HavingSomeFun({ BASE_URL, token, user }) {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      // Fetch all products and filter by category ID 1
      const fetchProducts = async () => {
        try {
          const response = await fetch(`${BASE_URL}/products`);
          if (response.ok) {
            const data = await response.json();
            const havingSomeFunProducts = data.filter((product) => product.category_id === 1);
            setProducts(havingSomeFunProducts);
          } else {
            console.error('Failed to fetch products');
          }
        } catch (error) {
          console.error('Error fetching products', error);
        }
      };
  
      fetchProducts();
    }, []);
  
    return (
      <Container>
        <h1>Having Some Fun</h1>
        <Row>
          {products.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductItem product={product} /> {/* Use your ProductItem component here */}
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
  
  export default HavingSomeFun;
