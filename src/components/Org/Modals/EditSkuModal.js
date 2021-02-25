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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { sku, deleteSku, updateSku } = props;
    const [skuID, setSkuID] = useState(sku.sku_id);
    const [skuNum, setSkuNum] = useState(sku.sku_number);
    const [skuDesc, setSkuDesc] = useState(sku.sku_description);
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
                                    value={skuID}
                                    ref={initialRef}
                                    placeholder="Sku Id"
                                    onChange={(e) => setSkuID(e.target.value)}
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <Input
                                    value={skuNum}
                                    placeholder="Sku Number"
                                    onChange={(e) => setSkuNum(e.target.value)}
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <Input
                                    value={skuDesc}
                                    placeholder="Sku Description"
                                    onChange={(e) => setSkuDesc(e.target.value)}
                                />
                            </FormControl>
                            <br />
                            <Text fontSize="sm">
                                Created: {sku.sku_last_updated.split("T")[0]}
                            </Text>
                            <Text fontSize="sm">
                                Updated: {sku.sku_last_updated.split("T")[0]}
                            </Text>
                        </ModalBody>
                        <ModalFooter>
                            <hr />
                            <ButtonU
                                onClick={() => {
                                    deleteSku(sku);
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
                                    updateSku(sku, {
                                        sku_id: skuID,
                                        sku_number: skuNum,
                                        sku_description: skuDesc,
                                        sku_last_updated: new Date().toISOString(),
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
