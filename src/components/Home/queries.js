import { gql } from "apollo-boost";

export const productsQuery = gql`
  query getProducts($category_id: ID, $page: String, $attr: [String]) {
    products(category_id: $category_id, page: $page, attr: $attr){
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
