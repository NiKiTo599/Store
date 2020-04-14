import { gql } from "apollo-boost";

export const allAttributesQuery = gql`
  query getAllAttributes($category_id: ID) {
    productsAttributes (category_id: $category_id){
      attributes {
        name,
        value,
      }
      regular_price
    }
  }
`;

export const countOfFindProducts = gql`
  query attributeSort($attr: [String], $prices: prices) {
    attributeSortCount (attr: $attr, prices: $prices)
  }
`;