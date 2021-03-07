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
    fetchAnSku,
    fetchCustomer,
    addCondition,
    editCondition,
    delCondition,
    editPromotion,
    addPromotion,
    delPromotion,
} from "../../actions/orgActions";

import AddConditionModal from "./Modals/AddConditionModal";
import EditConditionModal from "./Modals/EditConditionModal";

import AddPromotionModal from "./Modals/AddPromotionModal";
import EditPromotionModal from "./Modals/EditPromotionModal";

import { onUpdateOrg } from "../../graphql/subscriptions";

function Customers(props) {
    let location = useLocation();
    let conditions = [];
    let promotions = [];

    const {
        loadedOrg,
        fetchOrg,
        loading,
        history,
        loadedSku,
        loadedCustomer,
        fetchCustomer,
        addCondition,
    } = props;

    const [activeTab, setActiveTab] = useState(0);

    const org_id = location.pathname.split("/")[2];
    const sku_id = location.pathname.split("/")[3];
    const cus_id = location.pathname.split("/")[4];

    useEffect(() => {
        fetchOrg(org_id);
        if (loadedOrg.id) {
            const sku_index = loadedOrg.org_skus.findIndex(
                (i) => i.sku_id === sku_id
            );
            // customer
            // fetchAnSku(sku_index, loadedOrg);
            fetchCustomer(sku_index, cus_id, loadedOrg);
        } else {
            history.push("/");
        }
        const subscriptionUpdate = API.graphql({
            query: onUpdateOrg,
        }).subscribe({
            next: (orgData) => {
                // fetchOrg(org_id);
                if (loadedOrg.id) {
                    const sku_index = loadedOrg.org_skus.findIndex(
                        (i) => i.sku_id === sku_id
                    );
                    // customer
                    // fetchAnSku(sku_index, loadedOrg);
                    fetchCustomer(sku_index, cus_id, loadedOrg);
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
                {["Conditions", "Promotions"].map((t, index) =>
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

    const EditCondition = (condition, orgObject) => {
        editCondition(
            orgObject,
            condition,
            loadedCustomer,
            loadedSku,
            loadedOrg
        );
    };

    const DeleteCondition = (orgObject) => {
        delCondition(orgObject, loadedCustomer, loadedSku, loadedOrg);
    };

    const AddCondition = (orgObject) => {
        return addCondition(orgObject, loadedCustomer, loadedSku, loadedOrg);
    };

    const EditPromotion = (promo, orgObject) => {
        editPromotion(orgObject, promo, loadedCustomer, loadedSku, loadedOrg);
    };

    const AddPromotion = (promo) => {
        addPromotion(promo, loadedCustomer, loadedSku, loadedOrg);
    };

    const DeletePromotion = (promo) => {
        delPromotion(promo, loadedCustomer, loadedSku, loadedOrg);
    };

    const PromotionRow = ({ p }) => {
        return (
            <Tr
                key={p.promotion_id + "row"}
                _hover={{
                    background: "purple.100",
                    color: "purple.500",
                    cursor: "pointer",
                }}
            >
                <Td>{p.promotion_promotion}</Td>
                <Td>{p.promotion_start_date}</Td>
                <Td>{p.promotion_end_date}</Td>
                <Td>{p.promotion_last_updated.split("T")[0]}</Td>
                <EditPromotionModal
                    editPromotion={EditPromotion}
                    deletePromotion={DeletePromotion}
                    promotion={p}
                />
            </Tr>
        );
    };

    const Promotions = ({ promotions }) => {
        return (
            <React.Fragment>
                <Thead>
                    <Tr>
                        <Th>Promotion</Th>
                        <Th>Start Date</Th>
                        <Th>End Date</Th>
                        <Th>Updated</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {promotions &&
                        promotions.map((p) => (
                            <PromotionRow key={p.promotion_id} p={p} />
                        ))}
                </Tbody>
            </React.Fragment>
        );
    };

    const ConditionRow = ({ c }) => {
        return (
            <Tr
                key={c.condition_id + "con"}
                _hover={{
                    background: "purple.100",
                    color: "purple.500",
                    cursor: "pointer",
                }}
            >
                <Td>{c.condition_condition}</Td>
                <Td>{c.condition_high}</Td>
                <Td>{c.condition_low}</Td>
                <Td>{c.condition_value}</Td>
                <Td>{c.condition_message}</Td>
                <Td>{c.condition_last_updated.split("T")[0]}</Td>
                <EditConditionModal
                    editCondition={EditCondition}
                    deleteCondition={DeleteCondition}
                    condition={c}
                />
            </Tr>
        );
    };

    const Conditions = ({ conditions }) => {
        return (
            <React.Fragment>
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
                    {conditions &&
                        conditions.map((c) => (
                            <ConditionRow key={c.condition_id} c={c} />
                        ))}
                </Tbody>
            </React.Fragment>
        );
    };

    if (loadedOrg.id) {
        const sku_index = loadedOrg.org_skus.findIndex(
            (i) => i.sku_id === sku_id
        );

        const cus_index = loadedOrg.org_skus[sku_index].sku_customer.findIndex(
            (c) => c.customer_id === cus_id
        );

        conditions =
            loadedOrg.org_skus[sku_index].sku_customer[cus_index]
                .customer_conditions;

        promotions =
            loadedOrg.org_skus[sku_index].sku_customer[cus_index]
                .customer_promotions;

        console.log(
            "",
            conditions,
            promotions,
            sku_index,
            cus_index,
            loadedOrg.org_skus[sku_index].sku_customer[cus_index]
        );
    }

    return (
        <Container>
            <Flex justify={"space-between"}>
                <TopContainer>
                    <Tabs />
                    {
                        {
                            0: (
                                <AddConditionModal
                                    AddCondition={AddCondition}
                                />
                            ),
                            1: (
                                <AddPromotionModal
                                    AddPromotion={AddPromotion}
                                />
                            ),
                        }[activeTab]
                    }
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
                <Table size="sm">
                    {
                        {
                            0:
                                conditions && conditions.length ? (
                                    <Conditions conditions={conditions} />
                                ) : (
                                    <Center>
                                        <Text fontSize="sm" m="20px">
                                            No{" "}
                                            {activeTab
                                                ? "Promotions"
                                                : "Conditions"}{" "}
                                            exist for{" "}
                                            {loadedCustomer.customer_name},
                                            please create one by clicking on
                                            'Add'.
                                        </Text>
                                    </Center>
                                ),
                            1:
                                promotions && promotions.length ? (
                                    <Promotions promotions={promotions} />
                                ) : (
                                    <Center>
                                        <Text fontSize="sm" m="20px">
                                            No{" "}
                                            {activeTab
                                                ? "Promotions"
                                                : "Conditions"}{" "}
                                            exist for{" "}
                                            {loadedCustomer.customer_name},
                                            please create one by clicking on
                                            'Add'.
                                        </Text>
                                    </Center>
                                ),
                        }[activeTab]
                    }
                </Table>
            )}
        </Container>
    );
}

const mapStateToProps = (state) => ({
    loadedCustomer: state.orgs.loadedCustomer,
    loadedSku: state.orgs.loadedSku,
    loadedOrg: state.orgs.loadedOrg,
    loading: state.orgs.loading,
    error: state.orgs.error,
});

export default connect(mapStateToProps, {
    fetchOrg,
    fetchOrgs,
    fetchAnSku,
    fetchCustomer,
    addCondition,
})(Customers);
