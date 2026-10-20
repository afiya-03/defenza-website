function ProductCard({ product, onExplore }) {
  return (
    <article
      className="product-card-new"
      style={{ "--card-tint": product.tint }}
    >
      <div className="product-card-image">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        )}
      </div>

      <div className="product-card-panel">
        <div className="product-card-title">
          <span className="product-door-icon">▯</span>

          <h3>{product.name}</h3>
        </div>

        <button
          type="button"
          className="product-explore-btn"
          onClick={() => onExplore(product)}
        >
          Explore More →
        </button>
      </div>
    </article>
  );
}

export default ProductCard;