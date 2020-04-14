import { gql } from "apollo-boost";

export const getOneProducts = gql`
  query getOneProducts($id: ID) {
    product(id: $id){
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
