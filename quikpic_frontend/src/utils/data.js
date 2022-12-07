// Utility functions: functinos we are going to use across our entire code base, but inside one specific place
export const userQuery = (userId) => {
   // get document of type user and userid
	const query = `*[_type == "user" && _id == "${userId}"]`;
   
   return query
};
