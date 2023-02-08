import React, { FC } from "react";
import lodash from "lodash";

import { Product } from "components/base/Product";

import { IProductListProps } from "./ProductList.d";

export const ProductList: FC<IProductListProps> = ({ products, onFav }) => {
  const productsArr = [];
  for (const [i, p] of products.entries()) {
    productsArr.push(<Product key={i} index={i} product={p} onFav={onFav} />);
  }
  return <div>{lodash.reverse(productsArr)}</div>;
};
