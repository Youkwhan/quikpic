// fetch (Logged in) userInfo from localStorage which was saved during GoogleLogin
// export const fetchUser = () => {
// 	const userInfo =
// 		localStorage.getItem("user") !== "undefined"
// 			? JSON.parse(localStorage.getItem("user"))
// 			: localStorage.clear();

// 	return userInfo;
// };

import jwt_decode from 'jwt-decode';
// getUserDataFromToken
export const fetchUser = (token) => {
  const jwtToken = token ?? localStorage.getItem('profile');
  if (jwtToken) {
    const tokenData = jwt_decode(jwtToken);
    return {
      name: tokenData?.name,
      imageUrl: tokenData?.picture,
      email: tokenData?.email,
      id: tokenData?.sub,
      exp: tokenData?.exp,
    };
  }
  return null;
};