import React, { useEffect } from "react";
import { connect } from "react-redux";

import { API } from "aws-amplify";

import {
    fetchOrgs,
    createNewOrg,
    updateAnOrg,
    deleteAnOrg,
} from "../../actions/orgActions";

import {
    onCreateOrg,
    onUpdateOrg,
    onDeleteOrg,
} from "../../graphql/subscriptions";

import {
    Flex,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    CircularProgress,
    Center,
    Text,
} from "@chakra-ui/react";

import EditOrgModal from "./EditOrgModal";
import AddOrgModal from "./AddOrgModal";

import Container from "../Common/Container";
import TabBar from "../Common/TabBar";
import TabBarElement from "../Common/TabBarElement";
import TopContainer from "../Common/TopContainer";

function OrgList(props) {
    const {
        fetchOrgs,
        createNewOrg,
        orgs,
        updateAnOrg,
        deleteAnOrg,
        loading,
        history,
    } = props;

    useEffect(() => {
        fetchOrgs();

        const subscriptionCreate = API.graphql({
            query: onCreateOrg,
        }).subscribe({
            next: (orgData) => {
                fetchOrgs();
            },
        });

        const subscriptionUpdate = API.graphql({
            query: onUpdateOrg,
        }).subscribe({
            next: (orgData) => {
                fetchOrgs();
            },
        });

        const subscriptionDelete = API.graphql({
            query: onDeleteOrg,
        }).subscribe({
            next: (orgData) => {
                fetchOrgs();
            },
        });

        return () => {
            subscriptionCreate.unsubscribe();
            subscriptionUpdate.unsubscribe();
            subscriptionDelete.unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const AddNewOrg = (orgObject) => {
        createNewOrg(orgObject);
    };

    const UpdateOrg = (orgObject) => {
        const index = orgs.findIndex((n) => n.id === orgObject.id);
        let orgToUpdate = orgs[index];

        orgToUpdate.org_name = orgObject.org_name;
        orgToUpdate.org_id = orgObject.org_id;

        updateAnOrg(orgToUpdate);
    };

    const DeleteOrg = (org) => {
        const index = orgs.findIndex((n) => n.id === org.id);
        let orgToDelete = orgs[index];
        deleteAnOrg(orgToDelete);
    };

    const gotoOrg = (org) => {
        history.push(`/org/${org.id}`);
    };

    return (
        <Container>
            <Flex justify={"space-between"}>
                <TopContainer>
                    <TabBar>
                        <TabBarElement active>Org List</TabBarElement>
                    </TabBar>
                    <AddOrgModal AddNewOrg={AddNewOrg} />
                </TopContainer>
            </Flex>
            <br />
            {loading ? (
                <>
                    <Center>
                        <CircularProgress isIndeterminate color="purple.300" />
                    </Center>
                    <br />
                </>
            ) : orgs.length ? (
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th>Org Name</Th>
                            <Th>Org ID</Th>
                            <Th>Updated</Th>
                            <Th>{}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orgs &&
                            orgs.map((org) => (
                                <Tr
                                    key={org.id}
                                    _hover={{
                                        background: "purple.100",
                                        color: "purple.500",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Td onClick={() => gotoOrg(org)}>
                                        {org.org_name}
                                    </Td>
                                    <Td onClick={() => gotoOrg(org)}>
                                        {org.org_id}
                                    </Td>
                                    <Td onClick={() => gotoOrg(org)}>
                                        {org.updatedAt.split("T")[0]}
                                    </Td>
                                    <EditOrgModal
                                        org={org}
                                        deleteOrg={DeleteOrg}
                                        updateOrg={UpdateOrg}
                                    />
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            ) : (
                <Center>
                    <Text fontSize="sm" m="20px">
                        No Orgs exist, please create one by clicking on 'Add'.
                    </Text>
                </Center>
            )}
        </Container>
    );
}

const mapStateToProps = (state) => ({
    orgs: state.orgs.orgs,
    org: state.orgs.org,
    loading: state.orgs.loading,
    error: state.orgs.error,
});

export default connect(mapStateToProps, {
    fetchOrgs,
    createNewOrg,
    updateAnOrg,
    deleteAnOrg,
})(OrgList);
