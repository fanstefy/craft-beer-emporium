import "../styles/BeerFilter.scss";

const BeerFilter = ({ sortCriteria, handleFilterChange, handleSortChange }) => {
  return (
    <div className="beer-filter">
      <input
        type="text"
        name="brand"
        placeholder="Filter by brand"
        onChange={handleFilterChange}
      />
      <input
        type="text"
        name="style"
        placeholder="Filter by style"
        onChange={handleFilterChange}
      />

      <select
        name="abv"
        onChange={handleSortChange}
        value={sortCriteria.abv || ""}
      >
        <option value="">Sort ABV</option>
        <option value="increasing">ABV: Increasing</option>
        <option value="decreasing">ABV: Decreasing</option>
      </select>

      <select
        name="price"
        onChange={handleSortChange}
        value={sortCriteria.price || ""}
      >
        <option value="">Sort Price</option>
        <option value="increasing">Price: Increasing</option>
        <option value="decreasing">Price: Decreasing</option>
      </select>
    </div>
  );
};

export default BeerFilter;
