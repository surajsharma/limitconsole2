// AWS STUFF
import Amplify from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";

// REACT-REDUX
import { Provider } from "react-redux";
import store from "./store";

import { Router } from "react-router-dom";

// CHAKRA/UI STUFF
import { VStack, Flex, Box } from "@chakra-ui/react";

import { Routes } from "./components/Common/utils";

import "./App.css";
import history from "./history";

// CONFIGURE AMPLIFY
Amplify.configure(awsconfig);

function App() {
    return (
        <Provider store={store}>
            <Box w="100%" p="20px">
                <Flex justify={"flex-start"}>
                    <VStack direction={["column", "row"]}>
                        <Router history={history}>
                            <Routes />
                        </Router>
                    </VStack>
                </Flex>
            </Box>
        </Provider>
    );
}

export default withAuthenticator(App);
