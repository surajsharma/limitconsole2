import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import { API } from "aws-amplify";

import {
    Flex,
    CircularProgress,
    Center,
    Table,
    Th,
    Tr,
    Td,
    Thead,
    Text,
    Tbody,
} from "@chakra-ui/react";

import { fetchDefault, fetchDefaults } from "../../actions/defaultsActions";
import EditDefaultConditionModal from "./Modals/EditDefaultConditionModal";
import { onUpdateDefault } from "../../graphql/subscriptions";

function Defaults(props) {
    let location = useLocation();
    let conditions = [];

    const { fetchDefault, fetchDefaults } = props;

    // const org_id = location.pathname.split("/")[2];
    // const sku_id = location.pathname.split("/")[3];
    // const cus_id = location.pathname.split("/")[4];

    useEffect(() => {
        fetchDefaults();
        // fetchOrg(org_id);
        // if (loadedOrg.id) {
        //     const sku_index = loadedOrg.org_skus.findIndex(
        //         (i) => i.sku_id === sku_id
        //     );
        //     // customer
        //     // fetchAnSku(sku_index, loadedOrg);
        //     fetchCustomer(sku_index, cus_id, loadedOrg);
        // } else {
        //     history.push("/");
        // }
        // const subscriptionUpdate = API.graphql({
        //     query: onUpdateOrg,
        // }).subscribe({
        //     next: (orgData) => {
        //         // fetchOrg(org_id);
        //         if (loadedOrg.id) {
        //             const sku_index = loadedOrg.org_skus.findIndex(
        //                 (i) => i.sku_id === sku_id
        //             );
        //             // customer
        //             fetchAnSku(sku_index, loadedOrg);
        //             fetchCustomer(sku_index, cus_id, loadedOrg);
        //         }
        //     },
        // });
        // return () => {
        //     subscriptionUpdate.unsubscribe();
        // };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // const EditCondition = (orgObject, condition) => {
    //     return editCondition(
    //         orgObject,
    //         condition,
    //         loadedCustomer,
    //         loadedSku,
    //         loadedOrg
    //     );
    // };

    // const DeleteCondition = (orgObject) => {
    //     return delCondition(orgObject, loadedCustomer, loadedSku, loadedOrg);
    // };

    // const AddCondition = (orgObject) => {
    //     return addCondition(orgObject, loadedCustomer, loadedSku, loadedOrg);
    // };

    // const ConditionRow = ({ c }) => {
    //     return (
    //         <Tr
    //             key={c.condition_id + "con"}
    //             _hover={{
    //                 background: "purple.100",
    //                 color: "purple.500",
    //                 cursor: "pointer",
    //             }}
    //         >
    //             <Td>{c.condition_condition}</Td>
    //             <Td>{c.condition_high}</Td>
    //             <Td>{c.condition_low}</Td>
    //             <Td>{c.condition_value}</Td>
    //             <Td>{c.condition_message}</Td>
    //             <Td>{c.condition_last_updated.split("T")[0]}</Td>
    //             <EditDefaultConditionModal
    //                 editCondition={EditCondition}
    //                 deleteCondition={DeleteCondition}
    //                 condition={c}
    //             />
    //         </Tr>
    //     );
    // };

    // const Conditions = ({ conditions }) => {
    //     return (
    //         <React.Fragment>
    //             <Thead>
    //                 <Tr>
    //                     <Th>Condition</Th>
    //                     <Th>High</Th>
    //                     <Th>Low</Th>
    //                     <Th>Value</Th>
    //                     <Th>Message</Th>
    //                     <Th>Updated</Th>
    //                     <Th></Th>
    //                 </Tr>
    //             </Thead>
    //             <Tbody>
    //                 {conditions &&
    //                     conditions.map((c) => (
    //                         <ConditionRow key={c.condition_id} c={c} />
    //                     ))}
    //             </Tbody>
    //         </React.Fragment>
    //     );
    // };

    // if (loadedOrg.id) {
    //     const sku_index = loadedOrg.org_skus.findIndex(
    //         (i) => i.sku_id === sku_id
    //     );

    //     const cus_index = loadedOrg.org_skus[sku_index].sku_customer.findIndex(
    //         (c) => c.customer_id === cus_id
    //     );

    //     conditions =
    //         loadedOrg.org_skus[sku_index].sku_customer[cus_index]
    //             .customer_conditions;
    // }

    return (
        <Table size="sm">
            {conditions && conditions.length ? (
                <>Defaults Here</>
            ) : (
                <Center>
                    <Text fontSize="sm" m="20px">
                        No defaults exist, please create one by clicking on
                        'Add'.
                    </Text>
                </Center>
            )}
        </Table>
    );
}

const mapStateToProps = (state) => ({
    defaults: state.defaults.defaults,
    loading: state.defaults.loading,
    error: state.defaults.error,
});

export default connect(mapStateToProps, { fetchDefault, fetchDefaults })(
    Defaults
);
