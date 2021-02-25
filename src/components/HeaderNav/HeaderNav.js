import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import {
    Flex,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";
import ButtonF from "../Common/ButtonF";

import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({
    crumbs,
    loadedOrg,
    loading,
    loadedSku,
    loadedCustomer,
}) => {
    // Don't render a single breadcrumb.
    if (crumbs.length <= 1) {
        return (
            <Breadcrumb
                spacing="18px"
                colorScheme="orange"
                separator={<ChevronRightIcon color="gray.500" />}
                sx={{
                    fontSize: "14px",
                    fontFamily: '"Noto Sans KR", sans-serif',
                    ml: "20px",
                }}
            >
                <BreadcrumbItem m="5px">
                    <BreadcrumbLink as={Link} to="/">
                        {"Orgs"}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        );
    }
    return (
        <Breadcrumb
            spacing="18px"
            colorScheme="orange"
            separator={<ChevronRightIcon color="gray.500" />}
            sx={{
                fontSize: "14px",
                fontFamily: '"Noto Sans KR", sans-serif',
                ml: "20px",
            }}
        >
            {/* Link back to any previous steps of the breadcrumb. */}
            {crumbs.map(({ name, path }, key) =>
                key + 1 === crumbs.length ? (
                    <React.Fragment key={key}>
                        {loading
                            ? "loading..."
                            : {
                                  Orgs: "Orgs",
                                  Org: loadedOrg.org_name,
                                  Sku: loadedSku ? loadedSku.sku_id : "",
                                  Customer: loadedCustomer
                                      ? loadedCustomer.customer_id
                                      : null,
                              }[name]}
                    </React.Fragment>
                ) : (
                    <BreadcrumbItem m="5px" key={key}>
                        <BreadcrumbLink as={Link} to={path}>
                            {
                                {
                                    Orgs: "Orgs",
                                    Org: loadedOrg.org_name,
                                    Sku: loadedSku ? loadedSku.sku_id : "",
                                    Customer: loadedCustomer
                                        ? loadedCustomer.customer_id
                                        : "",
                                }[name]
                            }
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )
            )}
        </Breadcrumb>
    );
};

const HeaderNav = ({
    crumbs,
    loadedOrg,
    loading,
    loadedSku,
    loadedCustomer,
}) => {
    return (
        <Flex w="100%" align="center">
            <ButtonF
                onClick={() => {
                    Auth.signOut();
                    window.location.reload();
                }}
            >
                Logout
            </ButtonF>
            <Breadcrumbs
                crumbs={crumbs}
                loadedOrg={loadedOrg}
                loading={loading}
                loadedSku={loadedSku}
                loadedCustomer={loadedCustomer}
            />
        </Flex>
    );
};

const mapStateToProps = (state) => ({
    loadedCustomer: state.orgs.loadedCustomer,
    loadedOrg: state.orgs.loadedOrg,
    loadedSku: state.orgs.loadedSku,
    loading: state.orgs.loading,
});

export default connect(mapStateToProps, {})(HeaderNav);
