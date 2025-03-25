import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PickDropSection from "../components/PickDropSection";
import SidebarFilter from "../components/SidebarFilter";
import CarCard from "../components/CarCard";
import carData from "../data/carData.json";

const Category = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Nếu người dùng đến từ Homepage với filteredCars, dùng nó. Nếu không, dùng toàn bộ carData
  const initialCars = location.state?.filteredCars?.length > 0 ? location.state.filteredCars : carData.carData;
  const [filteredCars, setFilteredCars] = useState(initialCars);
  const [searchResults, setSearchResults] = useState(initialCars); // Lưu kết quả từ PickDropSection

  // Handle search filter từ PickDropSection
  const handleSearch = (results) => {
    setSearchResults(results); // Lưu kết quả tìm kiếm
    setFilteredCars(results); // Cập nhật danh sách hiển thị
  };

  // Handle sidebar filter
  const handleFilterChange = ({ types, capacities, priceRange }) => {
    let filtered = searchResults.length > 0 ? [...searchResults] : [...carData.carData]; // Dùng searchResults nếu có, nếu không dùng toàn bộ carData

    // Filter by Type
    if (types.length > 0) {
      filtered = filtered.filter((car) => types.includes(car.type));
    }

    // Filter by Capacity
    if (capacities.length > 0) {
      filtered = filtered.filter((car) => capacities.includes(car.capacity)); // So sánh trực tiếp với số
    }

    // Filter by Price
    filtered = filtered.filter(
      (car) => car.price.discounted >= priceRange[0] && car.price.discounted <= priceRange[1]
    );

    setFilteredCars(filtered);
  };

  return (
    <div className="flex ">
      {/* Sidebar Filter */}
      <SidebarFilter onFilterChange={handleFilterChange} />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Available Cars</h1>

        <PickDropSection onSearch={handleSearch} />

        {/* Car Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <CarCard key={car.id} car={car} onClick={() => navigate(`/car/${car.id}`)} />
            ))
          ) : (
            <p>No cars match your filters.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Category;