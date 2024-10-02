import "../styles/BeerDetails.scss";
import { useEffect } from "react";
import { useBeerStore } from "../store/beerStore";
import { useParams } from "react-router-dom";
import Button from "./Button";

const BeerDetails = () => {
  const { id } = useParams();
  const getBeerById = useBeerStore((store) => store.getBeerById);
  const beer = useBeerStore((store) => store.beer);

  useEffect(() => {
    getBeerById(id);
  }, []);

  const buyProduct = () => {
    alert(beer.name + " is purchased!");
  };

  if (!beer) return;

  return (
    <>
      <h1>Beer Details</h1>
      <div className="beer-details">
        <div className="text-content">
          <h3>{beer.name}</h3>
          <p>{beer.details}</p>

          <div className="brand-wrapper">
            <div className="label">Brand:</div>
            <div className="brand">{beer.brand}</div>
          </div>

          <div className="style-wrapper">
            <div className="label">Style:</div>
            <div className="style">{beer.style}</div>
          </div>

          <div className="abv-wrapper">
            <div className="label">ABV:</div>
            <div className="abv">{beer.abv}</div>
          </div>

          <div className="price-wrapper">
            <div className="label">Price:</div>
            <div className="price">{beer.price?.replace(/\$/g, "")} $</div>
          </div>

          <Button
            title="Buy"
            customBtnStyle="custom-btn-style"
            onClick={buyProduct}
          />
        </div>
        <div className="img-wrapper">
          <img src={beer.image} alt={beer.name} />
        </div>
      </div>
    </>
  );
};

export default BeerDetails;
