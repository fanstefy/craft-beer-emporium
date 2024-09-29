import "../styles/BeerCard.scss";

const BeerCard = ({ beer }) => {
  return (
    <div className="beer-card">
      <div className="image-wrapper">
        <img src={beer.image} alt={beer.name} />
      </div>
      <div className="text-content">
        <h4>{beer.name}</h4>
        <div className="brand-wrapper">
          <div className="label">brand</div>
          <div className="brand">{beer.brand}</div>
        </div>
        <div className="abv-wrapper">
          <div className="label">abv</div>
          <div className="abv">{beer.abv}</div>
        </div>
        <div className="price-wrapper">
          <div className="label">price</div>
          <div className="price">{beer.price.replace(/\$/g, "")} $</div>
        </div>
      </div>
    </div>
  );
};

export default BeerCard;
