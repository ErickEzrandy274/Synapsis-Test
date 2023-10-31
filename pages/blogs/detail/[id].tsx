import { BlogDetails } from "@/components/modules/Blog";
import { usePostDetails } from "@/components/utils/context";
import { getPostComments, getPostUser } from "@/pages/api";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const detailBlog = () => {
	const { postDetails } = usePostDetails();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [commentsData, setCommentsData] = useState([] as any[]);
	const [userData, setUserData] = useState({});
	const {
		query: { id },
	} = useRouter();

	useEffect(() => {
		setIsLoading(true);
		const fetchPostDetails = async () => {
			const commentsData = await getPostComments(id);
			const userData = await getPostUser(postDetails?.user_id);
			setCommentsData(commentsData);
			setUserData(userData);
			setIsLoading(false);
		};

		fetchPostDetails();
	}, []);

	const props = {
		isLoading,
		commentsData,
		userData,
		postDetails,
	};

	return <BlogDetails {...props} />;
};

export default detailBlog;
