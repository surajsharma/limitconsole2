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

function EditDefaultConditionModal({
    editCondition,
    deleteCondition,
    condition,
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();

    const [_condition, setCondition] = useState(condition.default_condition);
    const [highValue, setHighValue] = useState(condition.default_high);
    const [lowValue, setLowValue] = useState(condition.default_low);
    const [value, setValue] = useState(condition.default_value);
    const [message, setMessage] = useState(condition.default_message);
    const [order, setOrder] = useState(condition.default_order);

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
                                {condition.default_created.split("T")[0]}
                            </Text>
                            <Text fontSize="sm">
                                Updated:{" "}
                                {condition.default_last_updated.split("T")[0]}
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
                                            default_condition: _condition,
                                            default_high: highValue,
                                            default_low: lowValue,
                                            default_value: value,
                                            default_message: message,
                                            default_order: order,
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

export default EditDefaultConditionModal;
