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

function AddParamModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();

    const { AddParam } = props;

    const [paramName, setParamName] = useState("");
    const [paramValue, setParamValue] = useState("");

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
                    <ModalHeader>Parameter</ModalHeader>
                    <hr />
                    <br />
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input
                                value={paramName}
                                ref={initialRef}
                                placeholder="Parameter"
                                onChange={(e) => setParamName(e.target.value)}
                            />
                        </FormControl>
                        &nbsp;
                        <FormControl mt={4}>
                            <Input
                                value={paramValue}
                                placeholder="Value"
                                onChange={(e) => setParamValue(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <hr />
                        <ButtonU onClick={onClose}>Cancel</ButtonU>&nbsp;
                        <ButtonF
                            onClick={() => {
                                AddParam({
                                    param_value: paramValue,
                                    param_name: paramName,
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

export default AddParamModal;
