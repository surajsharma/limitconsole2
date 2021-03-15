import React, { useRef, useState } from "react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
} from "@chakra-ui/react";

import ButtonF from "../../Common/ButtonF";
import ButtonU from "../../Common/ButtonU";
import Input from "../../Common/Input";

function AddCustomerModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();

    const { AddCustomer } = props;

    const [customerId, setCustomerId] = useState("");
    const [customerName, setCustomerName] = useState("");

    return (
        <>
            <ButtonF onClick={onOpen}>Add</ButtonF>
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
                        <FormControl mt={4}>
                            <Input
                                value={customerId}
                                ref={initialRef}
                                placeholder="Customer Id"
                                onChange={(e) => setCustomerId(e.target.value)}
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
                    </ModalBody>
                    <ModalFooter>
                        <hr />
                        <ButtonU onClick={onClose}>Cancel</ButtonU>&nbsp;
                        <ButtonF
                            onClick={() => {
                                AddCustomer({
                                    customer_id: customerId,
                                    customer_name: customerName,
                                    customer_conditions: [],
                                    customer_promotions: [],
                                });
                                onClose();
                            }}
                        >
                            Add
                        </ButtonF>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddCustomerModal;
