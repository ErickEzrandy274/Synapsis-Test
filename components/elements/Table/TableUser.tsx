import React, { useEffect, useMemo, useState } from "react";
import { TableDataProps } from "./interface";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Button,
	Flex,
	Box,
	InputGroup,
	InputLeftElement,
	Input,
	FormControl,
	useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { USER_COLUMNS } from "./columns";
import Badge from "../Badge";
import { SearchIcon } from "@chakra-ui/icons";
import { deleteUser } from "@/pages/api";

const TableUser: React.FC<TableDataProps> = ({ data }) => {
	const [cloneData, setCloneData] = useState(data.slice());
	const toast = useToast();
	const [searchVal, setSearchVal] = useState("");
	const [deletedUserId, setDeletedUserId] = useState<number | null>(null);
	const { push, query } = useRouter();
	const handleDelete = async (id: number) => {
		setDeletedUserId(id);
		const result = await deleteUser(id);
		if (result?.status === 204) {
			toast({
				title: "Successfully deleted user!",
				status: "success",
				duration: 1500,
				position: "top",
			});
		}
	};
	const header = useMemo(() => USER_COLUMNS, []);

	const handlePageChange = (page: number) => {
		push({ pathname: "/users", query: { page } });
	};

	const handleSearch = (e: any) => {
		setSearchVal(e.target.value);
	};

	useEffect(() => {
		setCloneData(
			data.slice().filter((item) => item.name.toLowerCase().includes(searchVal))
		);
	}, [searchVal]);

	return (
		<Flex flexDir="column" gap={3}>
			<Flex gap={3} flexDir={{ base: "column", md: "row" }}>
				<Box w={{ base: "full", md: "25%" }}>
					<InputGroup>
						<InputLeftElement pointerEvents="none">
							<SearchIcon color="gray.500" />
						</InputLeftElement>
						<Input
							type="text"
							onChange={handleSearch}
							placeholder="Search user name"
							value={searchVal}
						/>
					</InputGroup>
				</Box>

				<Button colorScheme="linkedin" onClick={() => push("/users/create")}>Create New User</Button>
			</Flex>

			<TableContainer>
				<Table variant="striped" colorScheme="messenger">
					<Thead>
						<Tr>
							{header.map((item) => (
								<Th key={item} textAlign="center" fontSize="lg">
									{item}
								</Th>
							))}
						</Tr>
					</Thead>
					<Tbody>
						{cloneData.map((dataItem) => (
							<Tr
								key={dataItem.id}
								display={dataItem.id === deletedUserId ? "none" : ""}
							>
								{header.map((headerItem) => {
									if (headerItem !== "action") {
										const props = {
											gender:
												headerItem === "gender" ? dataItem.gender : undefined,
											status:
												headerItem === "status" ? dataItem.status : undefined,
										};
										return (
											<Td key={headerItem} p={1} textAlign="center">
												{headerItem === "gender" || headerItem === "status" ? (
													<Badge type={headerItem} {...props} />
												) : (
													dataItem[headerItem]
												)}
											</Td>
										);
									}
								})}
								<Td p={1} textAlign="center">
									<Button
										my={1}
										size="sm"
										colorScheme="red"
										onClick={() => handleDelete(dataItem.id)}
									>
										Delete
									</Button>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>

			<Flex gap={2} justifyContent="center" flexWrap="wrap">
				{Array(20)
					.fill(null)
					.map((_, i) => {
						const isActive = +query.page! === i + 1;
						return (
							<Box
								key={i + 1}
								rounded="md"
								bg={isActive ? "gray.600" : ""}
								color={isActive ? "white" : "black"}
								px={2}
								fontWeight={isActive ? "semibold" : "normal"}
								_hover={{
									bg: "gray.600",
									color: "white",
									fontWeight: "semibold",
								}}
								cursor="pointer"
								onClick={() => handlePageChange(i + 1)}
							>
								{i + 1}
							</Box>
						);
					})}
			</Flex>
		</Flex>
	);
};

export default TableUser;
