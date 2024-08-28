import sanityClient from "./sanity";
let sanityQuery = (query, params) => sanityClient.fetch(query, params);

export const getFeaturedRestaurants = () => {
  return sanityQuery(`
        *[_type == 'featured'] {
            ...,
            restaurants[]->{
            ...,
            type->{
                name
            },
            dishes[]->
            }
        }
    `);
};


// Define the getCategories function
export const getCategories = async () => {
    return sanityQuery(`
      *[_type == 'category']
    `);
  };
 
