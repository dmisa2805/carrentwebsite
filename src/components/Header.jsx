import React, { useState } from "react";
import { Input } from "antd";
import { HeartFilled, BellFilled, SettingFilled, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import carData from "../data/carData.json";
import ThemeToggle from "./ThemeToggle"

const Header = () => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredCars, setFilteredCars] = useState([]); 
  const navigate = useNavigate();

  // Search Function
  const car = carData.carData;
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === "") {
      setFilteredCars([]);
      return;
    }

    const results = car.filter((car) => car.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredCars(results);
  };

// Navigate Search Function
  const handleSelectCar = (car) => {
    setSearchQuery(""); 
    setFilteredCars([]); 
    navigate(`/car/${car.id}`);
  };


  return (
    <header className="p-4 shadow-md flex items-center justify-between dark:bg-gray-800">
      {/* Logo */}
      <h1 className="pl-8 text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate("/")}>MORENT</h1>

      {/* Search Box */}
      <div className="relative w-1/3 ">
        <Input
          placeholder="Search something here"
          prefix={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#596780" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 22L20 20" stroke="#596780" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            }
          className="w-80 h-10 gap-2 !rounded-full shadow-sm"
          onChange={handleSearch}
        />
        {/* Dropdown Search */}
        {filteredCars.length > 0 && (
          <ul className="absolute top-full mt-1 w-80 bg-white shadow-lg rounded-md border border-gray-200 z-10">
            {filteredCars.map((car) => (
              <li key={car.id} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectCar(car)}>
                {car.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Navigation Icons */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Favorites */}
        <span className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition text-subtitle-light hover:text-red-500">
          <HeartFilled className="text-xl  cursor-pointer" onClick={() => navigate("/favorites")} />
        </span>

        {/* Notifications */}
        <div className="relative">
          <span className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition text-subtitle-light hover:text-subtitle">
            <BellFilled className="text-xl  cursor-pointer" />
          </span>
          {/* Notification Badge */}
          <span className="absolute top-0 right-1 bg-red-500 text-xs w-2 h-2 rounded-full"></span>
        </div>

        {/* Settings */}
        <span className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition text-subtitle-light hover:text-subtitle">
          <SettingFilled className="text-xl cursor-pointer" />
        </span>

        {/* Log In */}
        <div className="dark:text-white flex items-center cursor-pointer hover:text-blue-600" onClick={() => navigate("/login")}>
          <UserOutlined className="text-xl mr-1" />
          <span className="text-sm">Log In/Sign Up</span>
        </div>
      </div>
    </header>
  );
};

export default Header;