import "../styles/BeerList.scss";
import { useEffect } from "react";
import useBeerStore from "../store/beerStore";
import BeerCard from "./BeerCard";
import { Link } from "react-router-dom";

const BeerList = () => {
  const { beers, fetchBeers } = useBeerStore();

  useEffect(() => {
    fetchBeers();
  }, [fetchBeers]);

  return (
    <div className="beer-list-container">
      <div className="beer-list">
        {beers.map((beer) => (
          <Link
            key={beer.id}
            to={`/beer-details/${beer.id}`}
            className="beer-link"
          >
            <BeerCard beer={beer} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BeerList;
