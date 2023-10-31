import React from "react";
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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { usePostDetails } from "@/components/utils/context";

const TablePost: React.FC<TableDataProps> = ({ data }) => {
	const { push, query } = useRouter();
	const { setPostDetails } = usePostDetails();
	const handleClick = (item: any) => {
		push(`/blogs/detail/${item.id}`);
		setPostDetails(item);
	};

	const handlePageChange = (page: number) => {
		push({ pathname: "blogs", query: { page } });
		// setPage(page);
	};

	return (
		<Flex flexDir="column" gap={3}>
			<TableContainer>
				<Table variant="striped" colorScheme="messenger">
					<Thead>
						<Tr>
							<Th textAlign="center" fontSize="lg">
								Post ID
							</Th>
							<Th textAlign="center" fontSize="lg">
								User ID
							</Th>
							<Th textAlign="center" fontSize="lg">
								Title
							</Th>
							<Th textAlign="center" fontSize="lg">
								Action
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{data.map((item) => (
							<Tr key={item.id}>
								<Td p={1} textAlign="center">
									{item.id}
								</Td>
								<Td p={1} textAlign="center">
									{item.user_id}
								</Td>
								<Td p={1} textAlign="center">
									{item.title}
								</Td>
								<Td p={1} textAlign="center">
									<Button
										my={1}
										size="sm"
										colorScheme="green"
										onClick={() => handleClick(item)}
									>
										Detail
									</Button>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>

			<Flex gap={2} justifyContent="center">
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

export default TablePost;
