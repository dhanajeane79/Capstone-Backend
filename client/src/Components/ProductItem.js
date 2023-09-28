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
  