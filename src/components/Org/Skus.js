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

import EditSkuModal from "./Modals/EditSkuModal";

function Skus({ skus, DeleteSku, UpdateSku, GotoSku }) {
    return (
        <React.Fragment>
            {skus && skus.length ? (
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th>SKU Number</Th>
                            <Th>Description</Th>
                            <Th>Updated</Th>
                            <Th>{}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {skus &&
                            skus.map((sku) => (
                                <Tr
                                    key={sku.sku_id}
                                    _hover={{
                                        background: "purple.100",
                                        color: "purple.500",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Td onClick={() => GotoSku(sku)}>
                                        {sku.sku_number}
                                    </Td>
                                    <Td onClick={() => GotoSku(sku)}>
                                        {sku.sku_description}
                                    </Td>
                                    <Td onClick={() => GotoSku(sku)}>
                                        {sku.sku_last_updated.split("T")[0]}
                                    </Td>

                                    <EditSkuModal
                                        sku={sku}
                                        deleteSku={DeleteSku}
                                        updateSku={UpdateSku}
                                    />
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            ) : (
                <Center>
                    <Text fontSize="sm" m="20px">
                        No SKUs exist for this Org, please create one by
                        clicking on 'Add'.
                    </Text>
                </Center>
            )}
        </React.Fragment>
    );
}

export default Skus;
