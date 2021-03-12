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
    Switch,
    HStack,
    VStack,
    Td,
    Spacer,
} from "@chakra-ui/react";

import ButtonF from "../../Common/ButtonF";
import ButtonU from "../../Common/ButtonU";
import Input from "../../Common/Input";

function EditUpdateModal({ update, deleteUpdate, updateUpdate }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = useRef();

    const [updateName, setUpdate] = useState(update.update_update);
    const [updateActive, setUpdateActive] = useState(update.update_active);
    const [url, setUrl] = useState(update.update_url);
    const [skuId, setSkuId] = useState(update.update_sku_number);
    const [skuNumber, setSkuNumber] = useState(update.update_sku_number);
    const [skuDesc, setSkuDesc] = useState(update.update_sku_description);
    const [customerId, setCustomerId] = useState(update.update_customer_id);
    const [customerName, setCustomerName] = useState(
        update.update_customer_name
    );
    const [brandId, setBrandId] = useState(update.update_brand_id);
    const [brandName, setBrandName] = useState(update.update_brand_name);

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
                        <ModalHeader>Update</ModalHeader>
                        <hr />
                        <br />
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <HStack spacing="100px" align="-moz-initial">
                                    <VStack spacing="10px">
                                        <Input
                                            value={updateName}
                                            ref={initialRef}
                                            placeholder="Update"
                                            onChange={(e) =>
                                                setUpdate(e.target.value)
                                            }
                                        />
                                        <Input
                                            value={url}
                                            placeholder="URL"
                                            onChange={(e) =>
                                                setUrl(e.target.value)
                                            }
                                        />
                                        <Input
                                            value={skuId}
                                            placeholder="SKU ID"
                                            onChange={(e) =>
                                                setSkuId(e.target.value)
                                            }
                                        />
                                        <Input
                                            value={skuNumber}
                                            placeholder="SKU Number"
                                            onChange={(e) =>
                                                setSkuNumber(e.target.value)
                                            }
                                        />
                                        <Input
                                            value={skuDesc}
                                            placeholder="SKU Description"
                                            onChange={(e) =>
                                                setSkuDesc(e.target.value)
                                            }
                                        />
                                        <Input
                                            value={customerId}
                                            placeholder="Customer ID"
                                            onChange={(e) =>
                                                setCustomerId(e.target.value)
                                            }
                                        />
                                        <Input
                                            value={customerName}
                                            placeholder="Customer Name"
                                            onChange={(e) =>
                                                setCustomerName(e.target.value)
                                            }
                                        />
                                        <Input
                                            value={brandId}
                                            placeholder="Brand ID"
                                            onChange={(e) =>
                                                setBrandId(e.target.value)
                                            }
                                        />
                                        <Input
                                            value={brandName}
                                            placeholder="Brand Name"
                                            onChange={(e) =>
                                                setBrandName(e.target.value)
                                            }
                                        />
                                    </VStack>
                                    <Switch
                                        size="lg"
                                        colorScheme="purple"
                                        onChange={() => {
                                            setUpdateActive(!updateActive);
                                        }}
                                        isChecked={updateActive}
                                    />
                                </HStack>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <hr />
                            <ButtonU
                                onClick={() => {
                                    deleteUpdate(update);
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
                                    updateUpdate(update, {
                                        update_sku_id: skuId,
                                        update_sku_number: skuNumber,
                                        update_sku_description: skuDesc,
                                        update_customer_id: customerId,
                                        update_customer_name: customerName,
                                        update_brand_id: brandId,
                                        update_brand_name: brandName,
                                        update_update: updateName,
                                        update_url: url,
                                        update_active: updateActive,
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

export default EditUpdateModal;
