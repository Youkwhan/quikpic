// Utility functions: functinos we are going to use across our entire code base, but inside one specific place
// Sanity query language uses GROQ(graph-relational-object-queries)!

export const userQuery = (userId) => {
	// get document of type user and userid
	const query = `*[_type == "user" && _id == "${userId}"]`;

	return query;
};

export const searchQuery = (searchTerm) => {
	// [in each pin it will search for matching title, category, about] {get_back image (which contains an asset ref and we only need URL), id, destination, postedBy, save[all the people who saved this pin] }
	const query = `*[_type == "pin" && title match "${searchTerm}*" {}|| category match "${searchTerm}*" {}|| about match "${searchTerm}*"]{
      image{
         asset -> {
            url
         }
      },
      _id,
      destination,
      postedBy -> {
         _id,
         userName,
         image
      },
      save[] {
         _key,
         postedBy -> {
            _id,
            userName,
            image
         },
      },
   }`;
	return query;
};

// get all pins,| in decending creation order, {specify what data we need}
export const feedQuery = `*[_type == "pin"] | order(_createAt desc) {
   image{
      asset -> {
         url
      }
   },
   _id,
   destination,
   postedBy -> {
      _id,
      userName,
      image
   },
   save[] {
      _key,
      postedBy -> {
         _id,
         userName,
         image
      },
   },
}`;
