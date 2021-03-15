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

import "react-datepicker/dist/react-datepicker.css";

import ButtonF from "../../Common/ButtonF";
import ButtonU from "../../Common/ButtonU";
import Input from "../../Common/Input";
import TextArea from "../../Common/TextArea";

function AddConditionModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { AddCondition } = props;

    const [condition, setCondition] = useState("");
    const [highValue, setHighValue] = useState("");
    const [lowValue, setLowValue] = useState("");
    const [value, setValue] = useState("");
    const [message, setMessage] = useState("");
    const [order, setOrder] = useState("");

    const initialRef = useRef();

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
                    <ModalHeader>Condition</ModalHeader>
                    <hr />
                    <br />
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input
                                value={condition}
                                ref={initialRef}
                                placeholder="Condition"
                                onChange={(e) => setCondition(e.target.value)}
                            />
                        </FormControl>
                        &nbsp;
                        <FormControl mt={4}>
                            <Input
                                value={highValue}
                                placeholder="High Value"
                                onChange={(e) => setHighValue(e.target.value)}
                            />
                        </FormControl>
                        &nbsp;
                        <FormControl mt={4}>
                            <Input
                                value={lowValue}
                                placeholder="Low Value"
                                onChange={(e) => setLowValue(e.target.value)}
                            />
                        </FormControl>
                        &nbsp;
                        <FormControl mt={4}>
                            <Input
                                value={value}
                                placeholder="Value"
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </FormControl>
                        &nbsp;
                        <FormControl mt={4}>
                            <Input
                                value={order}
                                placeholder="Order"
                                onChange={(e) => setOrder(e.target.value)}
                            />
                        </FormControl>
                        &nbsp;
                        <FormControl mt={4}>
                            <TextArea
                                value={message}
                                placeholder="Message"
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <hr />
                        <ButtonU onClick={onClose}>Cancel</ButtonU>&nbsp;
                        <ButtonF
                            onClick={() => {
                                AddCondition({
                                    condition_condition: condition,
                                    condition_high: highValue,
                                    condition_low: lowValue,
                                    condition_value: value,
                                    condition_message: message,
                                    condition_order: order,
                                });

                                setCondition("");
                                setHighValue("");
                                setLowValue("");
                                setValue("");
                                setMessage("");
                                setOrder("");
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

export default AddConditionModal;
