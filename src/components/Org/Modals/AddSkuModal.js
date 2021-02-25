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

function AddSkuModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();
    const { org, addSku } = props;
    const [skuId, setSkuId] = useState("");
    const [skuNumber, setSkuNumber] = useState("");
    const [skuDesc, setSkuDesc] = useState("");

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
                    <ModalHeader>SKU</ModalHeader>
                    <hr />
                    <br />
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input
                                value={skuId}
                                ref={initialRef}
                                placeholder="SKU ID"
                                onChange={(e) => setSkuId(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <Input
                                value={skuNumber}
                                placeholder="SKU Number"
                                onChange={(e) => setSkuNumber(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <Input
                                value={skuDesc}
                                placeholder="SKU Description"
                                onChange={(e) => setSkuDesc(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <hr />
                        <ButtonU onClick={onClose}>Cancel</ButtonU>
                        &nbsp;
                        <ButtonF
                            onClick={() => {
                                addSku({
                                    sku_id: skuId,
                                    sku_number: skuNumber,
                                    sku_description: skuDesc,
                                    sku_org_id: org.id,
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

export default AddSkuModal;
