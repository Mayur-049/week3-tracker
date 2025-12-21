import { useState, useEffect } from 'react';

const StarRating = ({ rating }) => {
  const stars = [];
  const rate = Math.round(rating);
  
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={i < rate ? 'star filled' : 'star'}>
        ★
      </span>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

const NewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading-container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Loading products...</p>
    </div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-4">Error: {error}</div>;
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h1 className="products-title">Store Products</h1>
        <p className="products-subtitle">Browse our collection of {products.length} products</p>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card-wrapper">
            <div className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.title} className="product-image" />
              </div>
              <div className="product-body">
                <span className="product-category">{product.category}</span>
                <h5 className="product-title">{product.title}</h5>
                <p className="product-description">{product.description.substring(0, 70)}...</p>
                <StarRating rating={product.rating.rate} />
                <p className="rating-count">({product.rating.count} reviews)</p>
                <div className="product-footer">
                  <span className="product-price">${product.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
