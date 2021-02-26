import OrgList from "./components/OrgList/OrgList";
import Org from "./components/Org/Org";
import Sku from "./components/Sku/Sku";
import Customer from "./components/Sku/Customer";

const routes = [
    { path: "/", name: "Orgs", Component: OrgList },
    { path: "/org/:orgId", name: "Org", Component: Org },
    { path: "/org/:orgId/:skuId", name: "Sku", Component: Sku },
    {
        path: "/org/:orgId/:skuId/:customerId",
        name: "Customer",
        Component: Customer,
    },
];

export default routes;
