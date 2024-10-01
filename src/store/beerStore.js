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
  top10RatedBeerBrands: [],

  fetchBeers: async () => {
    const response = await fetch(
      //   "https://mocki.io/v1/872c2ebd-700d-4cb9-abe5-575a6989e116"
      "./beerData.json"
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
    set({ beers: updatedBeers, loading: false });
  },

  getBeerByID: (id) => {
    const beers = get().beers; //  beers = []; ?
    const beer = beers.find((beer) => beer.id === id);
    set({ beerById: beer });
  },

  getTopRatedBeerBrands: () => {
    const top10Beers = get()
      .beers.sort((a, b) => b.rating.average - a.rating.average)
      .slice(0, 10)
      .map((beer) => {
        return { brand: beer.brand, rating: beer.rating };
      });
    set({ top10RatedBeerBrands: top10Beers });
  },

  addNewBeer: (newBeer) => {
    const beers = get().beers;
    const newBeerId = beers.length + 1;
    const updatedBeers = [...beers, { ...newBeer, id: newBeerId }];
    set({ beers: updatedBeers });
  },
}));

export default useBeerStore;
