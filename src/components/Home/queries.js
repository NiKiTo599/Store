import { gql } from "apollo-boost";

export const productsQuery = gql`
  query getProducts($category_id: ID, $page: String, $attr: [String], $prices: prices) {
    products(category_id: $category_id, page: $page, attr: $attr, prices: $prices){
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
