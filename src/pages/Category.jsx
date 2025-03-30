import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PickDropSection from "../components/PickDropSection";
import SidebarFilter from "../components/SidebarFilter";
import CarCard from "../components/CarCard";
import carData from "../data/carData.json";

const Category = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { filteredCars: initialFilteredCars, pickUp, dropOff } = location.state || {};
  console.log("Category location.state:", location.state); // Debug incoming state

  const initialCars = initialFilteredCars?.length > 0 ? initialFilteredCars : carData.carData;
  const [filteredCars, setFilteredCars] = useState(initialCars);
  const [searchResults, setSearchResults] = useState(initialCars);

  const handleSearch = (results) => {
    setSearchResults(results);
    setFilteredCars(results);
  };

  const handleFilterChange = ({ types, capacities, priceRange }) => {
    let filtered = searchResults.length > 0 ? [...searchResults] : [...carData.carData];

    if (types.length > 0) {
      filtered = filtered.filter((car) => types.includes(car.type));
    }

    if (capacities.length > 0) {
      filtered = filtered.filter((car) => capacities.includes(car.capacity));
    }

    filtered = filtered.filter(
      (car) => car.price.discounted >= priceRange[0] && car.price.discounted <= priceRange[1]
    );

    setFilteredCars(filtered);
  };

  return (
    <div className="flex">
      <SidebarFilter onFilterChange={handleFilterChange} />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Available Cars</h1>
        <PickDropSection
          onSearch={handleSearch}
          initialPickUp={pickUp || { location: null, date: null }}
          initialDropOff={dropOff || { location: null, date: null }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <CarCard key={car.id} car={car} onClick={() => navigate(`/car/${car.id}`)} />
            ))
          ) : (
            <p className="dark:text-white">No cars match your filters.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Category;