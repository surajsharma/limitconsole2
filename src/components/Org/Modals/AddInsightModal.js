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
} from "@chakra-ui/react";

import ButtonF from "../../Common/ButtonF";
import ButtonU from "../../Common/ButtonU";
import Input from "../../Common/Input";

function AddInsightModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();

    const { AddInsight } = props;

    const [insight, setInsight] = useState("");
    const [insightActive, setInsightActive] = useState(false);

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
                    <ModalHeader>Insight</ModalHeader>
                    <hr />
                    <br />
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <HStack spacing="24px">
                                <Input
                                    value={insight}
                                    ref={initialRef}
                                    placeholder="Insight"
                                    onChange={(e) => setInsight(e.target.value)}
                                />
                                <Switch
                                    size="lg"
                                    colorScheme="purple"
                                    onChange={() => {
                                        setInsightActive(!insightActive);
                                    }}
                                />
                            </HStack>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <hr />
                        <ButtonU onClick={onClose}>Cancel</ButtonU>&nbsp;
                        <ButtonF
                            onClick={() => {
                                AddInsight({
                                    insight_insight: insight,
                                    insight_active: insightActive,
                                });
                                setInsight("");
                                setInsightActive("");
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

export default AddInsightModal;
