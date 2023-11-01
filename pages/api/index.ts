import axios from "axios";
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`;

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

export const getUsers = async (page: any) => {
	if(isNaN(page)) return []
	try {
		const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users?page=${page}&per_page=20`);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteUser = async (userId: any) => {
	try {
		return await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`);
	} catch (error) {
		console.log(error);
	}
};

export const createUser = async (body: any) => {
	try {
		const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, body);
		
		return result
	} catch (error) {
		console.log(error);
	}
};

export const updateUser = async (body: any, userId: number) => {
	try {
		const result = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, body);
		
		return result
	} catch (error) {
		console.log(error);
	}
};
