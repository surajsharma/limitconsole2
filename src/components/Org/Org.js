import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import { API } from "aws-amplify";

import Container from "../Common/Container";
import TabBar from "../Common/TabBar";
import TabBarElement from "../Common/TabBarElement";
import TopContainer from "../Common/TopContainer";

import { Flex, CircularProgress, Center } from "@chakra-ui/react";

import {
    fetchOrg,
    fetchOrgs,
    addSku,
    delSku,
    updateSku,
    addParam,
    delParam,
    updateParam,
    addInsight,
    delInsight,
    updateInsight,
    addUpdate,
    updateUpdate,
    delUpdate,
} from "../../actions/orgActions";

import AddSkuModal from "./Modals/AddSkuModal";
import AddParamModal from "./Modals/AddParamModal";
import AddInsightModal from "./Modals/AddInsightModal";
import AddUpdateModal from "./Modals/AddUpdateModal";

import Skus from "./Skus";
import Params from "./Params";
import Insights from "./Insights";
import Updates from "./Updates";

import { onUpdateOrg } from "../../graphql/subscriptions";

function Org(props) {
    let location = useLocation();

    const {
        addSku,
        fetchOrg,
        loadedOrg,
        loading,
        history,
        updateUpdate,
        delUpdate,
        addUpdate,
        updateInsight,
        delInsight,
        addInsight,
        delParam,
        updateParam,
        addParam,
        delSku,
        updateSku,
    } = props;
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const id = location.pathname.split("/")[2];
        fetchOrg(id);

        const subscriptionUpdate = API.graphql({
            query: onUpdateOrg,
        }).subscribe({
            next: (orgData) => {
                fetchOrg(id);
            },
        });

        return () => {
            subscriptionUpdate.unsubscribe();
        };
    }, [location, fetchOrg]);

    const AddSku = (orgObject) => {
        addSku(orgObject, loadedOrg);
    };

    const DeleteSku = (orgObject) => {
        return delSku(orgObject, loadedOrg);
    };

    const UpdateSku = (sku, orgObject) => {
        return updateSku(sku, orgObject, loadedOrg);
    };

    const AddParam = (orgObject) => {
        return addParam(orgObject, loadedOrg);
    };

    const UpdateParam = (param, orgObject) => {
        return updateParam(param, orgObject, loadedOrg);
    };

    const DeleteParam = (orgObject) => {
        return delParam(orgObject, loadedOrg);
    };

    const AddInsight = (orgObject) => {
        return addInsight(orgObject, loadedOrg);
    };

    const UpdateInsight = (param, orgObject) => {
        return updateInsight(param, orgObject, loadedOrg);
    };

    const DeleteInsight = (orgObject) => {
        return delInsight(orgObject, loadedOrg);
    };

    const AddUpdate = (orgObject) => {
        return addUpdate(orgObject, loadedOrg);
    };

    const DeleteUpdate = (orgObject) => {
        return delUpdate(orgObject, loadedOrg);
    };

    const UpdateUpdate = (update, orgObject) => {
        return updateUpdate(update, orgObject, loadedOrg);
    };

    const gotoSku = (sku) => {
        history.push(`/org/${loadedOrg.id}/${sku.sku_id}`);
    };

    const Tabs = () => {
        return (
            <TabBar>
                {["SKUs", "Params", "Insights", "Updates"].map((t, index) =>
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

    return (
        <Container>
            <Flex justify={"space-between"}>
                <TopContainer>
                    <Tabs />
                    {
                        {
                            0: <AddSkuModal org={loadedOrg} addSku={AddSku} />,
                            1: (
                                <AddParamModal
                                    org={loadedOrg}
                                    AddParam={AddParam}
                                />
                            ),
                            2: (
                                <AddInsightModal
                                    org={loadedOrg}
                                    AddInsight={AddInsight}
                                />
                            ),
                            3: (
                                <AddUpdateModal
                                    org={loadedOrg}
                                    AddUpdate={AddUpdate}
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
                <>
                    {
                        {
                            0: (
                                <Skus
                                    skus={loadedOrg.org_skus}
                                    DeleteSku={DeleteSku}
                                    UpdateSku={UpdateSku}
                                    GotoSku={gotoSku}
                                />
                            ),
                            1: (
                                <Params
                                    params={loadedOrg.org_params}
                                    DeleteParam={DeleteParam}
                                    UpdateParam={UpdateParam}
                                />
                            ),
                            2: (
                                <Insights
                                    insights={loadedOrg.org_insights}
                                    DeleteInsight={DeleteInsight}
                                    UpdateInsight={UpdateInsight}
                                />
                            ),
                            3: (
                                <Updates
                                    updates={loadedOrg.org_updates}
                                    DeleteUpdate={DeleteUpdate}
                                    UpdateUpdate={UpdateUpdate}
                                />
                            ),
                        }[activeTab]
                    }
                </>
            )}
        </Container>
    );
}

const mapStateToProps = (state) => ({
    loadedOrg: state.orgs.loadedOrg,
    loading: state.orgs.loading,
    error: state.orgs.error,
});

export default connect(mapStateToProps, {
    fetchOrg,
    fetchOrgs,
    addSku,
    updateUpdate,
    delUpdate,
    addUpdate,
    updateInsight,
    delInsight,
    addInsight,
    delParam,
    updateParam,
    addParam,
    delSku,
    updateSku,
})(Org);
