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
    FormLabel,
} from "@chakra-ui/react";

import ButtonF from "../../Common/ButtonF";
import ButtonU from "../../Common/ButtonU";
import Input from "../../Common/Input";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function AddPromotionModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { AddPromotion } = props;

    const [promotion, setPromotion] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

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
                        <FormControl mt={4} isRequired>
                            <FormLabel as="legend">Start Date</FormLabel>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                        </FormControl>
                        &nbsp;
                        <FormControl mt={4} isRequired>
                            <FormLabel as="legend">End Date</FormLabel>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
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
                                setPromotion("");
                                setStartDate(new Date());
                                setEndDate(new Date());
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
