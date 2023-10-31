import React, { useEffect, useState } from "react";
import { getPost } from "../api";
import { Text } from "@chakra-ui/react";
import { TablePost } from "@/components/elements/Table";
import { useRouter } from "next/router";

const blogs = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [data, setData] = useState([] as any[]);
	const {
		query: { page },
	} = useRouter();

	useEffect(() => {
		setIsLoading(true);
		const fetchPost = async () => {
			if(page){
				const data = await getPost(page);
				setData(data);
			}
			setIsLoading(false);
		};

		fetchPost();
	}, [page]);

	return isLoading ? (
		<Text size="xl">Loading...</Text>
	) : (
		<TablePost data={data} />
	);
};

export default blogs;
