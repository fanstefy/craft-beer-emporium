import "../styles/BeerList.scss";
import { useEffect, useState } from "react";
import useBeerStore from "../store/beerStore";
import BeerCard from "./BeerCard";
import { Link, useSearchParams } from "react-router-dom";
import BeerFilter from "./BeerFilter";
import Loading from "./Loading";

const BeerList = () => {
  const { beers, fetchBeers, loading } = useBeerStore();
  const [filterCriteria, setFilterCriteria] = useState({});
  const [sortCriteria, setSortCriteria] = useState({ abv: null, price: null });
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSearchParams({});
  }, []);

  useEffect(() => {
    fetchBeers();
  }, [fetchBeers]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
    const updatedParams = {
      ...Object.fromEntries(searchParams.entries()),
      ...{ [name]: value },
    };
    setSearchParams(updatedParams);
  };

  const handleSortChange = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      setSortCriteria({
        price: value,
        abv: null,
      });
    } else if (name === "abv") {
      setSortCriteria({
        abv: value,
        price: null,
      });
    }

    const updatedParams = {
      ...Object.fromEntries(searchParams.entries()),
    };
    delete updatedParams.price;
    delete updatedParams.abv;
    updatedParams[name] = value;
    setSearchParams(updatedParams);
  };

  const getPriceValue = (priceStr) => {
    return parseFloat(priceStr.replace("$", ""));
  };

  const filteredBeers = beers
    .filter((beer) => {
      const matchesBrand = filterCriteria.brand
        ? beer.brand.toLowerCase().includes(filterCriteria.brand.toLowerCase())
        : true;
      const matchesStyle = filterCriteria.style
        ? beer.style.toLowerCase().includes(filterCriteria.style.toLowerCase())
        : true;
      return matchesBrand && matchesStyle;
    })
    .sort((a, b) => {
      if (sortCriteria.abv) {
        if (sortCriteria.abv === "increasing")
          return parseFloat(a.abv) - parseFloat(b.abv);
        if (sortCriteria.abv === "decreasing")
          return parseFloat(b.abv) - parseFloat(a.abv);
      }
      if (sortCriteria.price) {
        if (sortCriteria.price === "increasing")
          return getPriceValue(a.price) - getPriceValue(b.price);
        if (sortCriteria.price === "decreasing")
          return getPriceValue(b.price) - getPriceValue(a.price);
      }
      return 0;
    });

  const itemsPerPage = 9;
  const totalPages = Math.round(filteredBeers.length / itemsPerPage);

  const indexOfLastBeer = currentPage * itemsPerPage;
  const indexOfFirstBeer = indexOfLastBeer - itemsPerPage;
  const currentBeers = filteredBeers.slice(indexOfFirstBeer, indexOfLastBeer);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="beer-list-container">
      <h1>Beer Recomendation</h1>
      <BeerFilter
        sortCriteria={sortCriteria}
        handleFilterChange={handleFilterChange}
        handleSortChange={handleSortChange}
      />
      {loading && <Loading />}
      <div className="beer-list">
        {currentBeers.map((beer) => (
          <Link
            key={beer.id}
            to={`/beer-details/${beer.id}`}
            className="beer-link"
          >
            <BeerCard beer={beer} />
          </Link>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{
              border: currentPage === index + 1 ? "1px solid #292566" : "none",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BeerList;
