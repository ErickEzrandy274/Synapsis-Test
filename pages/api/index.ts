import axios from "axios";

export const getPost = async (page: any) => {
	if(isNaN(page)) return []
	try {
		const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts?page=${page}&per_page=20`);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getPostComments = async (postId: any) => {
  if(!postId) return []
	try {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/posts/${+postId}/comments`
		);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getPostUser = async (userId: number) => {
  if(!userId) return {}
	try {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/users/${+userId}`
		);

		return data;
	} catch (error) {
		console.log(error);
	}
};