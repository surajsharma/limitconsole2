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

function EditSkuModal(props) {
    const { param, DeleteParam, UpdateParam } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [paramName, setParamName] = useState(param.param_name);
    const [paramValue, setParamValue] = useState(param.param_value);

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
                        <ModalHeader>SKU</ModalHeader>
                        <hr />
                        <br />
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <Input
                                    value={paramName}
                                    ref={initialRef}
                                    placeholder="Sku Id"
                                    onChange={(e) =>
                                        setParamName(e.target.value)
                                    }
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <Input
                                    value={paramValue}
                                    placeholder="Sku Number"
                                    onChange={(e) =>
                                        setParamValue(e.target.value)
                                    }
                                />
                            </FormControl>
                            <br />
                            <Text fontSize="sm">
                                Created:
                                {param.param_created.split("T")[0]}
                            </Text>
                            <Text fontSize="sm">
                                Updated:
                                {param.param_last_updated.split("T")[0]}
                            </Text>
                        </ModalBody>
                        <ModalFooter>
                            <hr />
                            <ButtonU
                                onClick={() => {
                                    DeleteParam(param);
                                    onClose();
                                }}
                            >
                                Delete
                            </ButtonU>
                            <Spacer />
                            &nbsp;
                            <ButtonU onClick={onClose}>Cancel</ButtonU>
                            &nbsp; &nbsp;
                            <ButtonF
                                onClick={() => {
                                    UpdateParam(param, {
                                        param_id: param.param_id,
                                        param_name: paramName,
                                        param_value: paramValue,
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

export default EditSkuModal;
