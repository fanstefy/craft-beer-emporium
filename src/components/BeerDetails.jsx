import "../styles/BeerDetails.scss";
import { useEffect } from "react";
import useBeerStore from "../store/beerStore";
import { useParams } from "react-router-dom";
import Button from "./Button";

const BeerDetails = () => {
  const { id } = useParams();
  const getBeerByID = useBeerStore((state) => state.getBeerByID);
  const beerById = useBeerStore((state) => state.beerById);

  useEffect(() => {
    getBeerByID(parseInt(id, 10));
  }, [getBeerByID, id]);

  const buyProduct = () => {
    if (beerById) {
      alert(beerById.name + " is purchased!");
    }
  };

  return (
    <>
      <h1>Beer Details</h1>
      <div className="beer-details">
        <div className="text-content">
          <h3>{beerById.name}</h3>
          <p>{beerById.details}</p>

          <div className="brand-wrapper">
            <div className="label">Brand:</div>
            <div className="brand">{beerById.brand}</div>
          </div>

          <div className="style-wrapper">
            <div className="label">Style:</div>
            <div className="style">{beerById.style}</div>
          </div>

          <div className="abv-wrapper">
            <div className="label">ABV:</div>
            <div className="abv">{beerById.abv}</div>
          </div>

          <div className="price-wrapper">
            <div className="label">Price:</div>
            <div className="price">{beerById.price?.replace(/\$/g, "")} $</div>
          </div>

          <Button
            title="Buy"
            customBtnStyle="custom-btn-style"
            onClick={buyProduct}
          />
        </div>
        <div className="img-wrapper">
          <img src={beerById.image} alt={beerById.name} />
        </div>
      </div>
    </>
  );
};

export default BeerDetails;
