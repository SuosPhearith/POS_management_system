import React from "react";
import "./Product.css";

const CategoryTable = ({ categories, handleSearchByCategory }) => {
  return (
    <>
      <div className="category-container">
        <button
          onClick={() => handleSearchByCategory("")}
          className="category-item"
        >
          ទាំងអស់
        </button>
        {categories.map((category) => {
          return (
            <button
              onClick={() => handleSearchByCategory(category.name)}
              className="category-item"
            >
              {category.name}
            </button>
          );
        })}
      </div>
      <div className="category-footer">
        <div className="category-footer-name">ឈ្មោះប្រភេទទំនិញ</div>
      </div>
    </>
  );
};

export default CategoryTable;
