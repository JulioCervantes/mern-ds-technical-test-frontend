import { useEffect, useState } from "react";
import Selectable from "../../atoms/buttons/selectable";
import client from "../../../client";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const response = await client.category.getCategories();
      const { data: categories } = response;
      const categoriesMapped = categories.map((category) => {
        return {
          name: category.name,
          selected: true,
        }
      });
      setCategories(categoriesMapped);
    };
    loadCategories();
  }, []);

  return (
    <div className="bg-blue-400 pt-2 pb-2">
      {categories.length === 0 && (
        <div>
          Aún no existen categorías
        </div>
      )}
      {categories.map((category, index) => (
        <Selectable key={index} selected={category.selected}>{category.name}</Selectable>
      ))}
    </div>
  )
}