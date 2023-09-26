import React from "react";
import style from "./sale.module.css";
import ImageWithCover2 from "../../components/usefull/ImageWithCover2";
const ListProduct = ({ products, getProduct }) => {
  return (
    <div className={style.product}>
      <div className={style.productWrapper}>
        {products?.map((product, index) => {
          return (
            <div
              onClick={() =>
                getProduct(
                  product.id,
                  product.unit_code,
                  product.name,
                  product.cashType,
                  product.unit_price,
                  product.product_price,
                  product.special_price,
                  product.description
                )
              }
              className={style.productElement}
              key={product.id}
            >
              {product.image != null ? (
                <ImageWithCover2 src={product.image} alt="image" />
              ) : (
                <ImageWithCover2 src={""} alt="image" />
              )}
              {product.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
