import { useState } from "react";
import "../styles/AddNewBeer.scss";
import Button from "./Button";
import useBeerStore from "../store/beerStore";

const AddNewBeer = () => {
  const addNewBeer = useBeerStore((store) => store.addNewBeer);

  const [isInputFormOpen, setInputFormOpen] = useState(false);
  const [newBeer, setNewBeer] = useState({
    price: "",
    name: "",
    rating: {
      average: "",
      reviews: "",
    },
    image: "",
    brand: "",
    style: "",
    abv: "",
    details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBeer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("New Beer Added: ", newBeer);
    addNewBeer({
      ...newBeer,
      price: newBeer.price + "$",
      abv: newBeer.abv + "%",
    });

    // Reset the form
    setNewBeer({
      price: "",
      name: "",
      image: "",
      brand: "",
      style: "",
      abv: "",
      details: "",
    });
  };

  return (
    <div className="add-new-beer">
      <Button
        title={isInputFormOpen ? "Close" : "Add new beer"}
        onClick={
          isInputFormOpen
            ? () => setInputFormOpen(false)
            : () => setInputFormOpen(true)
        }
        customBtnStyle="add-new-beer-btn"
      />
      {isInputFormOpen ? (
        <form onSubmit={handleSubmit}>
          <label>
            Price ($):
            <input
              type="text"
              name="price"
              value={newBeer.price}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newBeer.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Image URL:
            <input
              type="text"
              name="image"
              value={newBeer.image}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Brand:
            <input
              type="text"
              name="brand"
              value={newBeer.brand}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Style:
            <input
              type="text"
              name="style"
              value={newBeer.style}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            ABV (%):
            <input
              type="text"
              name="abv"
              value={newBeer.abv}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Details:
            <textarea
              name="details"
              value={newBeer.details}
              onChange={handleChange}
              required
            />
          </label>
          <Button
            title="Submit"
            type="submit"
            customBtnStyle="add-new-beer-btn"
          />
        </form>
      ) : null}
    </div>
  );
};

export default AddNewBeer;
