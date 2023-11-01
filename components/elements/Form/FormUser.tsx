import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Select,
	useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { INIT_USER_DATA } from "./constant";
import { createUser } from "@/pages/api";
import { useRouter } from "next/router";

const FormUser = () => {
	const [data, setData] = useState(INIT_USER_DATA);
	const toast = useToast();
	const { push } = useRouter();

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setData((prev) => ({ ...prev, [name]: value }));
	};
  
	const handleSubmit = async (e: any) => {
    e.preventDefault();
		const result = await createUser(data);
		if (result?.status === 201) {
      push({ pathname: "/users", query: { page: 1 } });
      setData(INIT_USER_DATA)
			return toast({
				title: "Successfully created a new user!",
				status: "success",
				duration: 1500,
				position: "top",
			});
		}

    setData(INIT_USER_DATA)
		return toast({
			title: "Error while creating a new user!",
			status: "error",
			duration: 2000,
			position: "top",
		});
    
	};

	return (
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
					Create New User Form
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
	);
};

export default FormUser;
