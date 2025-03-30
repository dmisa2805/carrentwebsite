import React, { useState } from "react";
import PickDropSection from "../components/PickDropSection";
import CarCard from "../components/CarCard";
import HeroSection from "../components/HeroSection";  
import carData from "../data/carData.json";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [filteredCars, setFilteredCars] = useState([]);
  const navigate = useNavigate();

  // Handle search results from PickDropSection
  const handleSearch = (results) => {
    setFilteredCars(results);
    navigate("/category", { state: { filteredCars: results } });
  };

  return (
    <main>
      <HeroSection />  
      <div className="p-6">
        <PickDropSection onSearch={handleSearch}/>

        {/* Popular Cars */}
        <h1 className="text-2xl font-bold mt-10 dark:text-white">Popular Cars</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {carData.carData.filter(car => car.isPopular).map(car => <CarCard key={car.id} car={car} />)}
        </div>

        {/* Recommended Cars */}
        <h1 className="text-2xl font-bold mt-10 dark:text-white">Recommended Cars</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {carData.carData.sort((a, b) => b.rating - a.rating).slice(0, 8).map(car => <CarCard key={car.id} car={car} />)}
        </div>

        {/* Show More Car Button */}
        <div className="flex justify-center mt-6">
        <button
            className="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white  rounded-lg cursor-pointer"
            onClick={() => navigate(`/category`)}
          >
            Show more cars
          </button>
          </div>
      </div>
    </main>
  );
};

export default Homepage;