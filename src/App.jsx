import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import BeerList from "./components/BeerList";
import BeerDetails from "./components/BeerDetails";
import ManagementView from "./components/ManagementView";
import { useEffect } from "react";
import { useBeerStore } from "./store/beerStore";

function App() {
  const fetchBeers = useBeerStore((store) => store.fetchBeers);

  useEffect(() => {
    fetchBeers();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BeerList />} />
        <Route path="/beer-details/:id" element={<BeerDetails />} />
        <Route path="/management" element={<ManagementView />} />
      </Routes>
    </Router>
  );
}

export default App;
