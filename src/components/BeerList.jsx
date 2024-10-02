import "../styles/BeerList.scss";
import { useEffect, useState } from "react";
import { useBeerStore } from "../store/beerStore";
import BeerCard from "./BeerCard";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import BeerFilter from "./BeerFilter";
import Loading from "./Loading";
import Button from "./Button";
import { faArrowRight, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BeerList = () => {
  const { beers, loading } = useBeerStore();
  const [filterCriteria, setFilterCriteria] = useState({});
  const [sortCriteria, setSortCriteria] = useState({ abv: null, price: null });
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchParams({});
  }, []);

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
    setCurrentPage(1);
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
  const totalPages = Math.ceil(filteredBeers.length / itemsPerPage);

  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  if (endPage - startPage < maxPageButtons - 1) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

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

      <div className="button-container">
        <Button
          title="Admin"
          customBtnStyle="management-view-btn"
          onClick={() => navigate("/management")}
          iconLeft={faUserShield}
        />
      </div>

      {loading && <Loading />}

      {loading && <Loading />}
      <div className="beer-list">
        {beers
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((beer) => (
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
        {currentPage > 1 ? (
          <Button
            title="Previous"
            onClick={() => handlePageChange(currentPage - 1)}
            customBtnStyle="next-prev-btn"
            iconLeft={faArrowLeft}
          />
        ) : (
          currentPage === 1 && <Button />
        )}
        <div>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              style={{
                color: currentPage === page ? "#000" : "#828181",
              }}
            >
              {page}
            </button>
          ))}
        </div>

        {currentPage < totalPages ? (
          <Button
            title="Next"
            onClick={() => handlePageChange(currentPage + 1)}
            customBtnStyle="next-prev-btn"
            iconRight={faArrowRight}
          />
        ) : (
          currentPage === totalPages && <Button />
        )}
      </div>
    </div>
  );
};

export default BeerList;
