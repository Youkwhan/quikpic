export default {
	name: "postedBy",
	title: "PostedBy",
	type: "reference",
	to: [{ type: "user" }],
	//postedBy references users which can be used to select a specific post from a user
};
