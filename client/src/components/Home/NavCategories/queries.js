import { gql } from "apollo-boost";

export const categoriesQuery = gql`
  query categoriesQuery {
    categories {
      _id,
      name,
      meta_description,
      parent_id
    }
  }
`;
