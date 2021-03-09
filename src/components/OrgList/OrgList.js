import React, { useEffect, useState } from "react";
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
import Defaults from "./Defaults";

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

    const [activeTab, setActiveTab] = useState(0);

    const Tabs = () => {
        return (
            <TabBar>
                {["Org List", "Defaults"].map((t, index) =>
                    index === activeTab ? (
                        <TabBarElement
                            active
                            onClick={() => setActiveTab(index)}
                            key={index}
                        >
                            {t}
                        </TabBarElement>
                    ) : (
                        <TabBarElement
                            key={index}
                            onClick={() => setActiveTab(index)}
                        >
                            {t}
                        </TabBarElement>
                    )
                )}
            </TabBar>
        );
    };

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

    const Orgs = (orgs) => {
        if (orgs.orgs.length) {
            return (
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
                        {orgs.orgs &&
                            orgs.orgs.map((org) => (
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
            );
        } else {
            return (
                <Center>
                    <Text fontSize="sm" m="20px">
                        No Orgs exist, please create one by clicking on 'Add'.
                    </Text>
                </Center>
            );
        }
    };

    return (
        <Container>
            <Flex justify={"space-between"}>
                <TopContainer>
                    <Tabs>
                        {
                            {
                                0: (
                                    <TabBarElement active>
                                        Org List
                                    </TabBarElement>
                                ),
                                1: (
                                    <TabBarElement active>
                                        Defaults
                                    </TabBarElement>
                                ),
                            }[activeTab]
                        }
                    </Tabs>
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
            ) : (
                <>
                    {
                        {
                            0: <Orgs orgs={orgs} />,
                            1: <></>,
                        }[activeTab]
                    }
                </>
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
