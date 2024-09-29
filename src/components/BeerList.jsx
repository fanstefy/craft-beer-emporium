import "../styles/BeerList.scss";
import { useEffect } from "react";
import useBeerStore from "../store/beerStore";
import BeerCard from "./BeerCard";

const BeerList = () => {
  const { beers, fetchBeers } = useBeerStore();

  useEffect(() => {
    fetchBeers();
  }, [fetchBeers]);

  return (
    <div className="beer-list-container">
      <div className="beer-list">
        {beers.map((beer) => (
          <BeerCard key={beer.id} beer={beer} />
        ))}
      </div>
    </div>
  );
};

export default BeerList;
