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
import {
    onUpdateDefault,
    onCreateDefault,
    onDeleteDefault,
} from "../../graphql/subscriptions";

function Defaults(props) {
    // let location = useLocation();

    const { fetchDefault, fetchDefaults, defaults, loading, error } = props;

    // const org_id = location.pathname.split("/")[2];
    // const sku_id = location.pathname.split("/")[3];
    // const cus_id = location.pathname.split("/")[4];

    useEffect(() => {
        fetchDefaults();

        const subscriptionCreate = API.graphql({
            query: onCreateDefault,
        }).subscribe({
            next: (orgData) => {
                fetchDefaults();
            },
        });
        const subscriptionUpdate = API.graphql({
            query: onUpdateDefault,
        }).subscribe({
            next: (orgData) => {
                fetchDefaults();
            },
        });
        const subscriptionDelete = API.graphql({
            query: onDeleteDefault,
        }).subscribe({
            next: (orgData) => {
                fetchDefaults();
            },
        });

        return () => {
            subscriptionCreate.unsubscribe();
            subscriptionUpdate.unsubscribe();
            subscriptionDelete.unsubscribe();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const EditDefault = (orgObject, condition) => {
        // return editCondition(
        //     orgObject,
        //     condition,
        //     loadedCustomer,
        //     loadedSku,
        //     loadedOrg
        // );
    };

    const DeleteDefault = (orgObject) => {
        // return delCondition(orgObject, loadedCustomer, loadedSku, loadedOrg);
    };

    const DefaultsRow = ({ c }) => {
        return (
            <Tr
                key={c.condition_id + "con"}
                _hover={{
                    background: "purple.100",
                    color: "purple.500",
                    cursor: "pointer",
                }}
            >
                <Td>{c.default_condition}</Td>
                <Td>{c.default_high}</Td>
                <Td>{c.default_low}</Td>
                <Td>{c.default_value}</Td>
                <Td>{c.default_message}</Td>
                <Td>{c.default_last_updated.split("T")[0]}</Td>
                <EditDefaultConditionModal
                    editCondition={EditDefault}
                    deleteCondition={DeleteDefault}
                    condition={c}
                />
            </Tr>
        );
    };

    const Defaults = ({ defaults }) => {
        return (
            <Table size="sm">
                <Thead>
                    <Tr>
                        <Th>Condition</Th>
                        <Th>High</Th>
                        <Th>Low</Th>
                        <Th>Value</Th>
                        <Th>Message</Th>
                        <Th>Updated</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {defaults &&
                        defaults.map((c) => <DefaultsRow key={c.id} c={c} />)}
                </Tbody>
            </Table>
        );
    };

    return loading ? (
        <>
            <Center>
                <CircularProgress isIndeterminate color="purple.300" />
            </Center>
            <br />
        </>
    ) : defaults && defaults.length ? (
        <Defaults defaults={defaults} />
    ) : (
        <Center>
            <Text fontSize="sm" m="20px">
                No defaults exist, please create one by clicking on 'Add'.
            </Text>
        </Center>
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
