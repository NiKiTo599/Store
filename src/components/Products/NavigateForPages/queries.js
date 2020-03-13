import { gql } from "apollo-boost";

export const countOfAllProducts = gql`
  query countOfAllProducts($category_id: ID) {
    count (category_id: $category_id)
  }
`;