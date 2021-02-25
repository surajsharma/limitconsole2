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

import EditInsightModal from "./Modals/EditInsightModal";

function Insights({ insights, DeleteInsight, UpdateInsight }) {
    return (
        <div>
            {insights && insights.length ? (
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th>Active</Th>
                            <Th>Insight</Th>
                            <Th>Updated</Th>
                            <Th>{}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {insights &&
                            insights.map((i) => (
                                <Tr
                                    key={i.insight_id}
                                    _hover={{
                                        background: "purple.100",
                                        color: "purple.500",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Td onClick={() => console.log(i)}>
                                        {i.insight_active
                                            ? "Active"
                                            : "Inactive"}
                                    </Td>
                                    <Td onClick={() => console.log(i)}>
                                        {i.insight_insight}
                                    </Td>
                                    <Td onClick={() => console.log(i)}>
                                        {i.insight_last_updated.split("T")[0]}
                                    </Td>
                                    <EditInsightModal
                                        insight={i}
                                        deleteInsight={DeleteInsight}
                                        updateInsight={UpdateInsight}
                                    />
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            ) : (
                <Center>
                    <Text fontSize="sm" m="20px">
                        No Insights exist for this Org, please create one by
                        clicking on 'Add'.
                    </Text>
                </Center>
            )}
        </div>
    );
}

export default Insights;
