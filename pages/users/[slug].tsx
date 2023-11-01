/* eslint-disable react-hooks/rules-of-hooks */
import FormUser from "@/components/elements/Form/FormUser";
import { useEntityDetails } from "@/components/utils/context";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const modifyUser = () => {
	const { query } = useRouter();
	const { selectedUser } = useEntityDetails();
	const type = query.slug === "create" ? "create" : "update"

	return (
		<>
			<Head>
				<title>Blog App | Users</title>
			</Head>
			<FormUser type={type} oldData={selectedUser} />
		</>
	);
};

export default modifyUser;
