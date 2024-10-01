// src/components/BeerCard.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for better assertions
import BeerCard from "./BeerCard";

describe("BeerCard Component", () => {
  const beer = {
    id: 2,
    name: "Blue Moon Belgian White Belgian-Style Wheat Ale",
    brand: "Blue Moon",
    style: "Wheat Ale",
    abv: 5.4,
    price: 13.99,
    image:
      "https://www.totalwine.com/media/sys_master/twmmedia/he8/h67/11931543830558.png",
  };

  const mockOnBuy = jest.fn(); // Mock function for buy handler

  test("renders beer data correctly", () => {
    render(<BeerCard beer={beer} onBuy={mockOnBuy} />);

    // Check if all the data is rendered
    expect(
      screen.getByText("Blue Moon Belgian White Belgian-Style Wheat Ale")
    ).toBeInTheDocument();
    expect(screen.getByText("Blue Moon")).toBeInTheDocument();
    expect(screen.getByText("Wheat Ale")).toBeInTheDocument();
    expect(screen.getByText("5.4%")).toBeInTheDocument();
    expect(screen.getByText("13.99$")).toBeInTheDocument();

    // Check if the image is rendered with correct alt text
    const image = screen.getByAltText(
      "Blue Moon Belgian White Belgian-Style Wheat Ale"
    );
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(
      "https://www.totalwine.com/media/sys_master/twmmedia/he8/h67/11931543830558.png"
    );
  });

  //   test("calls the onBuy function when Buy button is clicked", () => {
  //     render(<BeerCard beer={beer} onBuy={mockOnBuy} />);

  //     const buyButton = screen.getByText("Buy");
  //     fireEvent.click(buyButton);

  //     expect(mockOnBuy).toHaveBeenCalledTimes(1);
  //     expect(mockOnBuy).toHaveBeenCalledWith(beer.id);
  //   });

  test("matches the snapshot", () => {
    const { asFragment } = render(<BeerCard beer={beer} onBuy={mockOnBuy} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
