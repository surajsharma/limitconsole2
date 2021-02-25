import React from "react";

import {
    Center,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from "@chakra-ui/react";

import EditUpdateModal from "./Modals/EditUpdateModal";

function Updates({ updates, DeleteUpdate, UpdateUpdate }) {
    return (
        <div>
            {updates && updates.length ? (
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th>Active</Th>
                            <Th>Update</Th>
                            <Th>URL</Th>
                            <Th>SKU</Th>
                            <Th>SKU Description</Th>
                            <Th>Customer</Th>
                            <Th>Updated</Th>
                            <Th>{}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {updates &&
                            updates.map((u) => (
                                <Tr
                                    key={u.update_id}
                                    _hover={{
                                        background: "purple.100",
                                        color: "purple.500",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Td onClick={() => console.log(u)}>
                                        {u.update_active
                                            ? "Active"
                                            : "Inactive"}
                                    </Td>
                                    <Td onClick={() => console.log(u)}>
                                        {u.update_update}
                                    </Td>
                                    <Td onClick={() => console.log(u)}>
                                        {u.update_url}
                                    </Td>
                                    <Td onClick={() => console.log(u)}>
                                        {u.update_sku_number}
                                    </Td>
                                    <Td onClick={() => console.log(u)}>
                                        {u.update_sku_description}
                                    </Td>
                                    <Td onClick={() => console.log(u)}>
                                        {u.update_customer_name}
                                    </Td>
                                    <Td onClick={() => console.log(u)}>
                                        {u.update_last_updated.split("T")[0]}
                                    </Td>
                                    <EditUpdateModal
                                        update={u}
                                        deleteUpdate={DeleteUpdate}
                                        updateUpdate={UpdateUpdate}
                                    />
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            ) : (
                <Center>
                    <Text fontSize="sm" m="20px">
                        No Updates exist for this Org, please create one by
                        clicking on 'Add'.
                    </Text>
                </Center>
            )}
        </div>
    );
}

export default Updates;
