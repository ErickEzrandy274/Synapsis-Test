import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Select,
	Text,
	useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { INIT_USER_DATA } from "./constant";
import { createUser, updateUser } from "@/pages/api";
import { useRouter } from "next/router";
import { FormUserProps, NewUserType, UserType } from "./interface";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { isEqual } from "lodash";

const FormUser: React.FC<FormUserProps> = ({ type, oldData }) => {
	const [data, setData] = useState<NewUserType | UserType>(type === "update" ? oldData! : INIT_USER_DATA);
	const toast = useToast();
	const { push, back } = useRouter();

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setData((prev: UserType | NewUserType) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (type === "create") {
			const result = await createUser(data);
			if (result?.status === 201) {
				push({ pathname: "/users", query: { page: 1 } });
				setData(INIT_USER_DATA);
				return toast({
					title: "Successfully created a new user!",
					status: "success",
					duration: 1500,
					position: "top",
				});
			}

			setData(INIT_USER_DATA);
			return toast({
				title: "Error while creating a new user!",
				status: "error",
				duration: 2000,
				position: "top",
			});
		}

    if(type === "update") {
      if(isEqual(oldData, data)){
        return toast({
					title: "Nothing has changed!",
					status: "warning",
					duration: 1500,
					position: "top",
				});
      }

      const result = await updateUser(data, oldData!.id);
      if (result?.status === 200) {
				push({ pathname: "/users", query: { page: 1 } });
				setData(INIT_USER_DATA);
				return toast({
					title: "Successfully updated a user!",
					status: "success",
					duration: 1500,
					position: "top",
				});
			}
    }
	};

	return (
		<Flex flexDir="column" gap={3}>
			<Flex cursor="pointer" alignItems="center" w="fit-content">
				<ArrowBackIcon />
				<Text fontSize="md" fontWeight="semibold" onClick={() => back()}>
					Back
				</Text>
			</Flex>

			<form onSubmit={handleSubmit}>
				<Flex
					w={{ base: "full", md: "50%" }}
					gap={3}
					bg="gray.300"
					p={3}
					rounded="md"
					flexDir="column"
					mx="auto"
				>
					<Heading textAlign="center" color="gray.600">
						{type === "create" ? "Create New" : "Update"} User Form
					</Heading>
					<FormControl>
						<FormLabel>Name</FormLabel>
						<Input
							required
							type="text"
							name="name"
							value={data.name}
							onChange={handleChange}
						/>
					</FormControl>

					<FormControl>
						<FormLabel>Email address</FormLabel>
						<Input
							required
							type="email"
							name="email"
							value={data.email}
							onChange={handleChange}
						/>
					</FormControl>

					<FormControl>
						<FormLabel>Gender</FormLabel>
						<Select
							required
							placeholder="Select gender"
							name="gender"
							value={data.gender}
							onChange={handleChange}
						>
							<option value="male">male</option>
							<option value="female">female</option>
						</Select>
					</FormControl>

					<FormControl>
						<FormLabel>Status</FormLabel>
						<Select
							required
							placeholder="Select status"
							name="status"
							value={data.status}
							onChange={handleChange}
						>
							<option value="active">Active</option>
							<option value="inactive">Inactive</option>
						</Select>
					</FormControl>

					<Button type="submit" colorScheme="linkedin">
						Save
					</Button>
				</Flex>
			</form>
		</Flex>
	);
};

export default FormUser;
