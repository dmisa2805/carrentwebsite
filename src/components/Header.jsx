import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined, HeartOutlined, BellOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import carData from "../data/carData.json";
import ThemeToggle from "./ThemeToggle"

const Header = () => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredCars, setFilteredCars] = useState([]); 
  const navigate = useNavigate();


  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === "") {
      setFilteredCars([]);
      return;
    }

    const results = carData.filter((car) => car.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredCars(results);
  };

  return (
    <header className={"p-4 shadow-md flex items-center justify-between"}>
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600">MORENT</h1>

      {/* Search Box */}
      <div className="relative w-1/3">
        <Input
          placeholder="Search something here"
          prefix={<SearchOutlined />}
          className="w-80 rounded-full shadow-sm"
          onChange={handleSearch}
        />
        {/* Hiển thị kết quả tìm kiếm */}
        {filteredCars.length > 0 && (
          <ul className="absolute top-full mt-1 w-80 bg-white shadow-lg rounded-md border border-gray-200 z-10">
            {filteredCars.map((car, index) => (
              <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                {car.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <ThemeToggle />
        {/* Navigation Icons */}
        <HeartOutlined className="text-2xl cursor-pointer hover:text-red-500" onClick={() => navigate("/favorites")} />
        <div className="relative">
          <BellOutlined className="text-2xl cursor-pointer hover:text-yellow-500" />
          {/* Notification Badge */}
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-2 h-2 rounded-full"></span>
        </div>
          {/* Setting Badge */}
        <SettingOutlined className="text-2xl cursor-pointer hover:text-blue-500" />
        {/* Log In Badge */}
        <div className="flex items-center cursor-pointer hover:text-blue-600" onClick={() => navigate("/login")}>
          <UserOutlined className="text-xl mr-1" />
          <span className="text-sm">Log In/Sign Up</span>
        </div>
      </div>
    </header>
  );
};

export default Header;