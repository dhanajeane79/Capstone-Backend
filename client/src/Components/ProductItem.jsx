// import React, { useContext } from "react";
// import { CartContext } from "./CartProvider";

// function ProductItem({ product }) {
//   const { addToCart } = useContext(CartContext);

//   const handleAddToCart = () => {
//     // Assuming your product data structure includes a unique identifier like "productId"
//     // and that you want to add one unit of the product to the cart
//     addToCart(product.productId, 1);
//   };

//   return (
//     <div>
//       <h2>{product.name}</h2>
//       <p>{product.description}</p>
//       <p>Price: ${product.price}</p>
//       {/* You can include more product details here */}
//       <button onClick={handleAddToCart}>Add to Cart</button>
//     </div>
//   );
// }

// export default ProductItem;

function ProductItem() {
    const { productId } = useParams(); // Extract the product ID from the URL
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      // Fetch the product data by ID
      async function fetchProduct() {
        try {
          const response = await fetch(`/api/products/${productId}`);
          if (response.ok) {
            const data = await response.json();
            setProduct(data);
          } else {
            console.error("Failed to fetch product");
          }
        } catch (error) {
          console.error("Error fetching product", error);
        } finally {
          setIsLoading(false);
        }
      }
  
      fetchProduct();
    }, [productId]);
  
    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    return (
      <Container className="mt-4">
        {product && (
          <Card>
            <Row>
              <Col md={4}>
                <Card.Img
                  src={product.product_image}
                  alt={product.name}
                  className="p-4"
                />
              </Col>
              <Col md={8}>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>Price: ${product.item_price}</Card.Text>
                  <Button variant="primary">Add to Cart</Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        )}
      </Container>
    );
  }
  
  export default ProductItem;