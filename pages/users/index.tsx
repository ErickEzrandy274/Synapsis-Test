import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getUsers } from "../api";
import Loader from "@/components/elements/Loader";
import { TableUser } from "@/components/elements/Table";
import Head from "next/head";

const users = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [data, setData] = useState([] as any[]);
	const {
		query: { page },
	} = useRouter();

	useEffect(() => {
		setIsLoading(true);
		const fetchPost = async () => {
			if (page) {
				const data = await getUsers(page);
				setData(data);
			}
			setIsLoading(false);
		};

		fetchPost();
	}, [page]);

	return (
		<>
			<Head>
				<title>Blog App | Users</title>
			</Head>
			{isLoading ? <Loader /> : <TableUser data={data} />}
		</>
	);
};

export default users;
