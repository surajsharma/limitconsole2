import React, { useRef, useState } from "react";
import {
    Td,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    Spacer,
    Text,
} from "@chakra-ui/react";

import ButtonF from "../../Common/ButtonF";
import ButtonU from "../../Common/ButtonU";
import Input from "../../Common/Input";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function EditCustomerModal({ editCustomer, deleteCustomer, customer }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [customerId, setCustomerId] = useState(customer.customer_id);
    const [customerName, setCustomerName] = useState(customer.customer_name);

    const initialRef = useRef();

    return (
        <>
            <Td sx={{ color: "#979797", fontSize: "20px" }} onClick={onOpen}>
                •••
                <Modal
                    initialFocusRef={initialRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Customer</ModalHeader>
                        <hr />
                        <br />
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <Input
                                    value={customerId}
                                    ref={initialRef}
                                    placeholder="Customer Id"
                                    onChange={(e) =>
                                        setCustomerId(e.target.value)
                                    }
                                />
                            </FormControl>
                            &nbsp;
                            <FormControl mt={4}>
                                <Input
                                    value={customerName}
                                    placeholder="Name"
                                    onChange={(e) =>
                                        setCustomerName(e.target.value)
                                    }
                                />
                            </FormControl>
                            <br />
                            <Text fontSize="sm">
                                Created:
                                {" " + customer.customer_created.split("T")[0]}
                            </Text>
                            <Text fontSize="sm">
                                Updated:
                                {" " +
                                    customer.customer_last_updated.split(
                                        "T"
                                    )[0]}
                            </Text>
                        </ModalBody>
                        <ModalFooter>
                            <hr />
                            <ButtonU
                                onClick={() => {
                                    deleteCustomer(customer);
                                    onClose();
                                }}
                            >
                                Delete
                            </ButtonU>
                            <Spacer />
                            &nbsp;
                            <ButtonU onClick={onClose}>Cancel</ButtonU>&nbsp;
                            <ButtonF
                                onClick={() => {
                                    editCustomer(customer, {
                                        customer_id: customerId,
                                        customer_name: customerName,
                                    });
                                    onClose();
                                }}
                            >
                                Update
                            </ButtonF>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Td>
        </>
    );
}

export default EditCustomerModal;
