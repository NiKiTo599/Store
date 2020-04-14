import { gql } from "apollo-boost";

export const searchProducts = gql`
  query searchProducts($name: String) {
    searchProducts(name: $name){
      _id
      name
      regular_price
      category_id
      meta_description
      stock
      meta_title
      description
      attributes {
        name,
        value
      }
      images {
        filename
      }
    }
  }
`;
