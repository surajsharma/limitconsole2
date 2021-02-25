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
} from "@chakra-ui/react";

import ButtonF from "../../Common/ButtonF";
import ButtonU from "../../Common/ButtonU";
import Input from "../../Common/Input";

function AddUpdateModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();

    const [update, setUpdate] = useState("");
    const [updateActive, setUpdateActive] = useState(false);
    const [url, setUrl] = useState("");
    const [skuId, setSkuId] = useState("");
    const [skuNumber, setSkuNumber] = useState("");
    const [skuDesc, setSkuDesc] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [brandId, setBrandId] = useState("");
    const [brandName, setBrandName] = useState("");

    const { AddUpdate } = props;

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
                    <ModalHeader>Update</ModalHeader>
                    <hr />
                    <br />
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <HStack spacing="150px" align="-moz-initial">
                                <VStack spacing="10px">
                                    <Input
                                        value={update}
                                        ref={initialRef}
                                        placeholder="Insight"
                                        onChange={(e) =>
                                            setUpdate(e.target.value)
                                        }
                                    />
                                    <Input
                                        value={url}
                                        ref={initialRef}
                                        placeholder="URL"
                                        onChange={(e) => setUrl(e.target.value)}
                                    />
                                    <Input
                                        value={skuId}
                                        ref={initialRef}
                                        placeholder="SKU ID"
                                        onChange={(e) =>
                                            setSkuId(e.target.value)
                                        }
                                    />
                                    <Input
                                        value={skuNumber}
                                        ref={initialRef}
                                        placeholder="SKU Number"
                                        onChange={(e) =>
                                            setSkuNumber(e.target.value)
                                        }
                                    />
                                    <Input
                                        value={skuDesc}
                                        ref={initialRef}
                                        placeholder="SKU Description"
                                        onChange={(e) =>
                                            setSkuDesc(e.target.value)
                                        }
                                    />
                                    <Input
                                        value={customerId}
                                        ref={initialRef}
                                        placeholder="Customer ID"
                                        onChange={(e) =>
                                            setCustomerId(e.target.value)
                                        }
                                    />
                                    <Input
                                        value={customerName}
                                        ref={initialRef}
                                        placeholder="Customer Name"
                                        onChange={(e) =>
                                            setCustomerName(e.target.value)
                                        }
                                    />
                                    <Input
                                        value={brandId}
                                        ref={initialRef}
                                        placeholder="Brand ID"
                                        onChange={(e) =>
                                            setBrandId(e.target.value)
                                        }
                                    />
                                    <Input
                                        value={brandName}
                                        ref={initialRef}
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
                        <ButtonU onClick={onClose}>Cancel</ButtonU>&nbsp;
                        <ButtonF
                            onClick={() => {
                                AddUpdate({
                                    update_sku_id: skuId,
                                    update_sku_number: skuNumber,
                                    update_sku_description: skuDesc,
                                    update_customer_id: customerId,
                                    update_customer_name: customerName,
                                    update_brand_id: brandId,
                                    update_brand_name: brandName,
                                    update_update: update,
                                    update_url: url,
                                    update_active: updateActive,
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

export default AddUpdateModal;
