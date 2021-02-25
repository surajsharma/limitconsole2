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

function AddPromotionModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { AddPromotion } = props;

    const [promotion, setPromotion] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

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
                    <ModalHeader>Promotion</ModalHeader>
                    <hr />
                    <br />
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input
                                value={promotion}
                                ref={initialRef}
                                placeholder="Promotion"
                                onChange={(e) => setPromotion(e.target.value)}
                            />
                        </FormControl>
                        &nbsp;
                        <FormControl mt={4}>
                            <Input
                                value={startDate}
                                placeholder="Start Date"
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </FormControl>
                        &nbsp;
                        <FormControl mt={4}>
                            <Input
                                value={endDate}
                                placeholder="End Date"
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </FormControl>
                        &nbsp;
                    </ModalBody>
                    <ModalFooter>
                        <hr />
                        <ButtonU onClick={onClose}>Cancel</ButtonU>&nbsp;
                        <ButtonF
                            onClick={() => {
                                AddPromotion({
                                    promotion_promotion: promotion,
                                    promotion_start_date: startDate,
                                    promotion_end_date: endDate,
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

export default AddPromotionModal;
