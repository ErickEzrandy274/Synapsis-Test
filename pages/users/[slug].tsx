import FormUser from "@/components/elements/Form/FormUser";
import { useEntityDetails } from "@/components/utils/context";
import { useRouter } from "next/router";
import React from "react";

const modifyUser = () => {
	const { query } = useRouter();
	const { selectedUser } = useEntityDetails();

	return <FormUser type={query.slug} oldData={selectedUser} />;
};

export default modifyUser;
