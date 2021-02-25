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

import EditParamModal from "./Modals/EditParamModal";
function Params({ params, DeleteParam, UpdateParam }) {
    return (
        <div>
            {params && params.length ? (
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Value</Th>
                            <Th>Updated</Th>
                            <Th>{}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {params &&
                            params.map((param) => (
                                <Tr
                                    key={param.param_id}
                                    _hover={{
                                        background: "purple.100",
                                        color: "purple.500",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Td onClick={() => console.log(param)}>
                                        {param.param_name}
                                    </Td>
                                    <Td onClick={() => console.log(param)}>
                                        {param.param_value}
                                    </Td>
                                    <Td onClick={() => console.log(param)}>
                                        {param.param_last_updated.split("T")[0]}
                                    </Td>

                                    <EditParamModal
                                        param={param}
                                        DeleteParam={DeleteParam}
                                        UpdateParam={UpdateParam}
                                    />
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            ) : (
                <Center>
                    <Text fontSize="sm" m="20px">
                        No Params exist for this Org, please create one by
                        clicking on 'Add'.
                    </Text>
                </Center>
            )}
        </div>
    );
}

export default Params;
