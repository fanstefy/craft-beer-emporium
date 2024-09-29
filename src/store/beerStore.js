import { create } from "zustand";

const placeholderImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019";

const checkImageURL = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => reject(false);
  });
};

const useBeerStore = create((set, get) => ({
  beers: [],
  beerById: {},
  loading: true,

  fetchBeers: async () => {
    const response = await fetch(
      "https://mocki.io/v1/872c2ebd-700d-4cb9-abe5-575a6989e116"
    );
    const data = await response.json();

    // Check image URLs and replace broken ones
    const updatedBeers = await Promise.all(
      data.map(async (beer) => {
        const isImageValid = await checkImageURL(beer.image).catch(() => false);
        return {
          ...beer,
          image: isImageValid ? beer.image : placeholderImage,
        };
      })
    );
    set({ beers: updatedBeers });
    set({ loading: false });
  },

  getBeerByID: (id) => {
    const beers = get().beers;
    const beer = beers.find((beer) => beer.id === id);
    set({ beerById: beer });
  },
}));

export default useBeerStore;
