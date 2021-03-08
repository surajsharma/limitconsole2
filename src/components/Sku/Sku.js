import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import { API } from "aws-amplify";

import Container from "../Common/Container";
import TabBar from "../Common/TabBar";
import TabBarElement from "../Common/TabBarElement";
import TopContainer from "../Common/TopContainer";

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

import {
    fetchOrg,
    fetchOrgs,
    addSku,
    fetchAnSku,
    addCustomer,
    editCustomer,
    delCustomer,
} from "../../actions/orgActions";

import AddCustomerModal from "./Modals/AddCustomerModal";
import EditCustomerModal from "./Modals/EditCustomerModal";
import AddRecModal from "./Modals/AddRecModal";

import { onUpdateOrg } from "../../graphql/subscriptions";

function Sku(props) {
    let location = useLocation();
    let customers = [];

    const {
        loadedOrg,
        loading,
        history,
        loadedSku,
        addCustomer,
        editCustomer,
        delCustomer,
        fetchAnSku,
    } = props;

    const [activeTab, setActiveTab] = useState(0);
    const sku_id = location.pathname.split("/")[3];

    useEffect(() => {
        if (loadedOrg.id) {
            const sku_index = loadedOrg.org_skus.findIndex(
                (i) => i.sku_id === sku_id
            );
            fetchAnSku(sku_index, loadedOrg);
        } else {
            history.push("/");
        }

        const subscriptionUpdate = API.graphql({
            query: onUpdateOrg,
        }).subscribe({
            next: (orgData) => {
                if (loadedOrg.id) {
                    const sku_index = loadedOrg.org_skus.findIndex(
                        (i) => i.sku_id === sku_id
                    );
                    fetchAnSku(sku_index, loadedOrg);
                }
            },
        });

        return () => {
            subscriptionUpdate.unsubscribe();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const Tabs = () => {
        return (
            <TabBar>
                {["Customer", "Recommends"].map((t, index) =>
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

    const AddCustomer = (orgObject) => {
        return addCustomer(orgObject, loadedSku, loadedOrg);
    };

    const EditCustomer = (customer, orgObject) => {
        return editCustomer(customer, orgObject, loadedSku, loadedOrg);
    };

    const DeleteCustomer = (customer) => {
        return delCustomer(customer, loadedSku, loadedOrg);
    };

    const gotoCustomer = (id) => {
        history.push(`/org/${loadedOrg.id}/${loadedSku.sku_id}/${id}`);
    };

    const CustomerRow = ({ c }) => {
        return (
            <Tr
                key={c.id + "cus"}
                _hover={{
                    background: "purple.100",
                    color: "purple.500",
                    cursor: "pointer",
                }}
            >
                <Td onClick={() => gotoCustomer(c.customer_id)}>
                    {c.customer_name}
                </Td>
                <Td onClick={() => gotoCustomer(c.customer_id)}>
                    {c.customer_last_updated.split("T")[0]}
                </Td>
                <EditCustomerModal
                    customer={c}
                    editCustomer={EditCustomer}
                    deleteCustomer={DeleteCustomer}
                />
            </Tr>
        );
    };

    const Customers = ({ customers }) => {
        return (
            <React.Fragment>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Updated</Th>
                        <Th>{}</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {customers &&
                        customers.map((c) => <CustomerRow key={c.id} c={c} />)}
                </Tbody>
            </React.Fragment>
        );
    };

    if (loadedOrg.id) {
        const sku_index = loadedOrg.org_skus.findIndex(
            (i) => i.sku_id === sku_id
        );

        customers = loadedOrg.org_skus[sku_index].sku_customer;
    }

    return (
        <Container>
            <Flex justify={"space-between"}>
                <TopContainer>
                    <Tabs />
                    {
                        {
                            0: <AddCustomerModal AddCustomer={AddCustomer} />,
                            1: <AddRecModal />,
                        }[activeTab]
                    }
                </TopContainer>
            </Flex>
            <br />
            {loading ? (
                <React.Fragment>
                    <Center>
                        <CircularProgress isIndeterminate color="purple.300" />
                    </Center>
                    <br />
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {customers && customers.length ? (
                        <Table size="sm">
                            {
                                {
                                    0: <Customers customers={customers} />,
                                    1: null,
                                }[activeTab]
                            }
                        </Table>
                    ) : (
                        <Center>
                            <Text fontSize="sm" m="20px">
                                No
                                {activeTab === 0
                                    ? " Customers"
                                    : " Recommendations"}{" "}
                                exist for {loadedSku.sku_id}, please create one
                                by clicking on 'Add'.
                            </Text>
                        </Center>
                    )}
                </React.Fragment>
            )}
        </Container>
    );
}

const mapStateToProps = (state) => ({
    loadedSku: state.orgs.loadedSku,
    loadedOrg: state.orgs.loadedOrg,
    loading: state.orgs.loading,
    error: state.orgs.error,
});

export default connect(mapStateToProps, {
    fetchOrg,
    fetchOrgs,
    fetchAnSku,
    addSku,
    addCustomer,
    delCustomer,
    editCustomer,
})(Sku);
