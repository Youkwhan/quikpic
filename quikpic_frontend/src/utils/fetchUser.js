// fetch (Logged in) userInfo from localStorage which was saved during GoogleLogin
export const fetchUser = () => {
	const userInfo =
		localStorage.getItem("user") !== "undefined"
			? JSON.parse(localStorage.getItem("user"))
			: localStorage.clear();

	return userInfo;
};
