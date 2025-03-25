import React from "react";
import { useFavorites } from "../hooks/useFavorites";
import CarCard from "../components/CarCard";

const Favorite = () => {
  const { favorites } = useFavorites();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Favorite Cars</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorite cars added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;