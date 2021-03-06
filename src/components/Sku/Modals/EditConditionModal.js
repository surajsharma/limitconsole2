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
import TextArea from "../../Common/TextArea";

function EditConditionModal({ editCondition, deleteCondition, condition }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();

    const [_condition, setCondition] = useState(condition.condition_condition);
    const [highValue, setHighValue] = useState(condition.condition_high);
    const [lowValue, setLowValue] = useState(condition.condition_low);
    const [value, setValue] = useState(condition.condition_value);
    const [message, setMessage] = useState(condition.condition_message);
    const [order, setOrder] = useState(condition.condition_order);

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
                        <ModalHeader>Condition</ModalHeader>
                        <hr />
                        <br />
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <Input
                                    value={_condition}
                                    ref={initialRef}
                                    placeholder="Condition"
                                    onChange={(e) =>
                                        setCondition(e.target.value)
                                    }
                                />
                            </FormControl>
                            &nbsp;
                            <FormControl mt={4}>
                                <Input
                                    value={highValue}
                                    placeholder="High Value"
                                    onChange={(e) =>
                                        setHighValue(e.target.value)
                                    }
                                />
                            </FormControl>
                            &nbsp;
                            <FormControl mt={4}>
                                <Input
                                    value={lowValue}
                                    placeholder="Low Value"
                                    onChange={(e) =>
                                        setLowValue(e.target.value)
                                    }
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
                            <br />
                            <Text fontSize="sm">
                                Created:{" "}
                                {condition.condition_created.split("T")[0]}
                            </Text>
                            <Text fontSize="sm">
                                Updated:{" "}
                                {condition.condition_last_updated.split("T")[0]}
                            </Text>
                        </ModalBody>
                        <ModalFooter>
                            <hr />
                            <ButtonU
                                onClick={() => {
                                    deleteCondition(condition);
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
                                    editCondition(
                                        {
                                            condition_condition: _condition,
                                            condition_high: highValue,
                                            condition_low: lowValue,
                                            condition_value: value,
                                            condition_message: message,
                                        },
                                        condition
                                    );
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

export default EditConditionModal;
