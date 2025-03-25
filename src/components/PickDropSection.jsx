import React, { useState } from "react";
import { DatePicker, TimePicker, Select, Button } from "antd";
import { useNavigate } from "react-router-dom";
import carData from "../data/carData.json";
import SwapIcon from "../assets/icons/Swap.svg"

const PickDropSection = ({ onSearch }) => {
  const [pickUp, setPickUp] = useState({ location: "", date: null, time: null });
  const [dropOff, setDropOff] = useState({ location: "", date: null, time: null });
  const navigate = useNavigate();

  // Handle search logic
  const handleSearch = () => {
    const results = carData.carData.filter(car =>
      car.location === pickUp.location &&
      car.date_available.includes(pickUp.date?.format("YYYY-MM-DD")) &&
      car.time_available.includes(pickUp.time?.format("HH:mm"))
    );

    if (onSearch) {
      onSearch(results); // Pass filtered cars to parent (Homepage)
    } else {
      navigate("/category", { state: { filteredCars: results } }); // Redirect if no onSearch prop
    }
  };

  const handleSwap = () => {
    setPickUp(dropOff);
    setDropOff(pickUp);
  };

  return (
    <div className="relative flex flex-row gap-8 items-center justify-center mb-20">
      {/* Pick-up Location */}
    <section className="w-1/2 p-6 bg-white shadow-md rounded-lg flex flex-col lg:flex-row items-center justify-around gap-8">
      <div className="flex flex-col">
        <label className="font-semibold">Location</label>
        <Select 
          value={pickUp.location} 
          onChange={(value) => setPickUp({ ...pickUp, location: value })} 
          placeholder="Select location"
          allowClear
        >
          <Select.Option value="Ho Chi Minh">Ho Chi Minh</Select.Option>
          <Select.Option value="Ha Noi">Ha Noi</Select.Option>
          <Select.Option value="Da Nang">Da Nang</Select.Option>
          <Select.Option value="Hue">Hue</Select.Option>
        </Select>
      </div>
      {/* Pick-up Date */}
      <div className="flex flex-col">
        <label className="font-semibold">Date</label>
        <DatePicker 
          value={pickUp.date} 
          onChange={(date) => setPickUp({ ...pickUp, date })} 
          format="YYYY-MM-DD"
        />
      </div>

      {/* Pick-up Time */}
      <div className="flex flex-col">
        <label className="font-semibold">Time</label>
        <TimePicker 
          value={pickUp.time} 
          onChange={(time) => setPickUp({ ...pickUp, time })} 
          format="HH:mm"
        />
      </div>
      </section>

      {/* Swap Button */}
      <button className="px-2 py-2 bg-primary rounded-lg cursor-pointer shadow-md" onClick={handleSwap}>
      <img src={SwapIcon} alt="Swap" className="w-6 h-6" />
      </button>

      {/* Drop-off Location */}
      <section className="w-1/2 p-6 bg-white shadow-md rounded-lg flex flex-col lg:flex-row items-center justify-around gap-8">
      <div className="flex flex-col">
        <label className="font-semibold">Location</label>
        <Select 
          value={dropOff.location} 
          onChange={(value) => setDropOff({ ...dropOff, location: value })} 
          placeholder="Select location"
          allowClear
        >
          <Select.Option value="Ho Chi Minh">Ho Chi Minh</Select.Option>
          <Select.Option value="Ha Noi">Ha Noi</Select.Option>
          <Select.Option value="Da Nang">Da Nang</Select.Option>
          <Select.Option value="Hue">Hue</Select.Option>
        </Select>
      </div>

      {/* Drop-off Date */}
      <div className="flex flex-col">
        <label className="font-semibold">Date</label>
        <DatePicker 
          value={dropOff.date} 
          onChange={(date) => setDropOff({ ...dropOff, date })} 
          format="YYYY-MM-DD"
        />
      </div>

      {/* Drop-off Time */}
      <div className="flex flex-col">
        <label className="font-semibold">Time</label>
        <TimePicker 
          value={dropOff.time} 
          onChange={(time) => setDropOff({ ...dropOff, time })} 
          format="HH:mm"
        />
      </div>
    </section>
        {/* Search Button */}
        <div className="absolute -bottom-12 right-0">
        <Button type="primary" onClick={handleSearch}>View More</Button>
        </div>
    </div>
  );
};

export default PickDropSection;