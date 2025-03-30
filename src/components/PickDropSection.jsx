import React, { useState } from "react";
import { DatePicker, Select, Button } from "antd";
import { useNavigate } from "react-router-dom";
import carData from "../data/carData.json";
import SwapIcon from "../assets/icons/Swap.svg";
import dayjs from "dayjs";

const PickDropSection = ({ onSearch, initialPickUp = { location: null, date: null }, initialDropOff = { location: null, date: null } }) => {
  const [pickUp, setPickUp] = useState({
    location: initialPickUp.location,
    date: initialPickUp.date ? dayjs(initialPickUp.date) : null, // Ensure date is a dayjs object
  });
  const [dropOff, setDropOff] = useState({
    location: initialDropOff.location,
    date: initialDropOff.date ? dayjs(initialDropOff.date) : null, // Ensure date is a dayjs object
  });
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!pickUp.location) {
      console.log("Please select pick-up location");
      return;
    }

    const pickUpDate = pickUp.date ? dayjs(pickUp.date).format("YYYY-MM-DD") : null;
    const dropOffDate = dropOff.date ? dayjs(dropOff.date).format("YYYY-MM-DD") : null;

    const results = carData.carData.filter((car) => {
      const locationMatch = car.location === pickUp.location;
      const [startDateStr, endDateStr] = car.date_available;
      const startDate = dayjs(startDateStr);
      const endDate = dayjs(endDateStr);

      let dateMatch = true;
      if (pickUpDate && dayjs(pickUpDate).isValid()) {
        const selectedPickUpDate = dayjs(pickUpDate);
        dateMatch =
          selectedPickUpDate.isSame(startDate, "day") ||
          selectedPickUpDate.isSame(endDate, "day") ||
          (selectedPickUpDate.isAfter(startDate, "day") && selectedPickUpDate.isBefore(endDate, "day"));
      }

      return locationMatch && dateMatch;
    });

    console.log("Filter results:", results);

    if (onSearch) {
      onSearch(results);
    } else {
      navigate("/category", {
        state: {
          filteredCars: results,
          pickUp,
          dropOff,
        },
      });
    }
  };

  const handleSwap = () => {
    const temp = { ...pickUp };
    setPickUp({ ...dropOff });
    setDropOff(temp);
  };

  return (
    <div className="relative flex flex-row gap-8 items-center justify-evenly mb-20">
      <section className="w-1/2 p-6 bg-white dark:bg-gray-700 dark:text-white shadow-md rounded-lg flex flex-col lg:flex-row items-center justify-around gap-8">
        <div className="flex flex-col">
          <label className="font-semibold">Pick-up Location</label>
          <Select
            value={pickUp.location}
            onChange={(value) => setPickUp((prev) => ({ ...prev, location: value }))}
            placeholder="Select location"
            className="w-40 !dark:bg-gray-500"
            allowClear
          >
            <Select.Option value="Ho Chi Minh">Ho Chi Minh</Select.Option>
            <Select.Option value="Ha Noi">Ha Noi</Select.Option>
            <Select.Option value="Da Nang">Da Nang</Select.Option>
            <Select.Option value="Hue">Hue</Select.Option>
          </Select>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Pick-up Date</label>
          <DatePicker
            value={pickUp.date}
            onChange={(date) => setPickUp((prev) => ({ ...prev, date }))}
            format="YYYY-MM-DD"
            className="w-40"
            disabledDate={(current) => current && current < dayjs().startOf("day")}
          />
        </div>
      </section>

      <button className="px-2 py-2 bg-primary rounded-lg cursor-pointer shadow-md" onClick={handleSwap}>
        <img src={SwapIcon} alt="Swap" className="w-6 h-6" />
      </button>

      <section className="w-1/2 p-6 bg-white dark:bg-gray-700 dark:text-white shadow-md rounded-lg flex flex-col lg:flex-row items-center justify-around gap-8">
        <div className="flex flex-col">
          <label className="font-semibold">Drop-off Location</label>
          <Select
            value={dropOff.location}
            onChange={(value) => setDropOff((prev) => ({ ...prev, location: value }))}
            placeholder="Select location"
            className="w-40"
            allowClear
          >
            <Select.Option value="Ho Chi Minh">Ho Chi Minh</Select.Option>
            <Select.Option value="Ha Noi">Ha Noi</Select.Option>
            <Select.Option value="Da Nang">Da Nang</Select.Option>
            <Select.Option value="Hue">Hue</Select.Option>
          </Select>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Drop-off Date</label>
          <DatePicker
            value={dropOff.date}
            onChange={(date) => setDropOff((prev) => ({ ...prev, date }))}
            format="YYYY-MM-DD"
            className="w-40"
            disabledDate={(current) =>
              current && (current < dayjs().startOf("day") || (pickUp.date && current < dayjs(pickUp.date)))
            }
          />
        </div>
      </section>

      <div className="absolute -bottom-12 right-0">
        <Button type="primary" onClick={handleSearch}>
          View More
        </Button>
      </div>
    </div>
  );
};

export default PickDropSection;