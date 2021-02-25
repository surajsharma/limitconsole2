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
} from "@chakra-ui/react";

import ButtonF from "../../Common/ButtonF";
import ButtonU from "../../Common/ButtonU";
import Input from "../../Common/Input";

function EditPromotionModal({ editPromotion, deletePromotion, promotion }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();

    const [_promotion, setPromotion] = useState(promotion.promotion_promotion);
    const [startDate, setStartDate] = useState(promotion.promotion_start_date);
    const [endDate, setEndDate] = useState(promotion.promotion_end_date);

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
                        <ModalHeader>Promotion</ModalHeader>
                        <hr />
                        <br />
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <Input
                                    value={_promotion}
                                    ref={initialRef}
                                    placeholder="Promotion"
                                    onChange={(e) =>
                                        setPromotion(e.target.value)
                                    }
                                />
                            </FormControl>
                            &nbsp;
                            <FormControl mt={4}>
                                <Input
                                    value={startDate}
                                    placeholder="Start Date"
                                    onChange={(e) =>
                                        setStartDate(e.target.value)
                                    }
                                />
                            </FormControl>
                            &nbsp;
                            <FormControl mt={4}>
                                <Input
                                    value={endDate}
                                    placeholder="Low Value"
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </FormControl>
                            &nbsp;
                        </ModalBody>
                        <ModalFooter>
                            <hr />
                            <ButtonU
                                onClick={() => {
                                    deletePromotion(promotion);
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
                                    editPromotion(promotion, {
                                        promotion_promotion: _promotion,
                                        promotion_start_date: startDate,
                                        promotion_end_date: endDate,
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

export default EditPromotionModal;
