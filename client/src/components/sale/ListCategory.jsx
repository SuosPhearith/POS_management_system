import React from "react";
import style from "./sale.module.css";
const ListCategory = ({ categories, handleSearchByCategory }) => {
  return (
    <div className={style.category}>
      <div className={style.categoryWrapper}>
        <div
          onClick={() => handleSearchByCategory("")}
          className={style.categoryElement}
        >
          ទាំងអស់
        </div>
        {categories?.map((category, index) => {
          return (
            <div
              onClick={() => handleSearchByCategory(category.name)}
              className={style.categoryElement}
              key={category.id}
            >
              {category.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListCategory;
