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
    Switch,
    HStack,
} from "@chakra-ui/react";

import ButtonF from "../../Common/ButtonF";
import ButtonU from "../../Common/ButtonU";
import Input from "../../Common/Input";

function EditInsightModal({ insight, deleteInsight, updateInsight }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [insightInsight, setInsight] = useState(insight.insight_insight);
    const [insightActive, setInsightActive] = useState(insight.insight_active);

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
                        <ModalHeader>Insight</ModalHeader>
                        <hr />
                        <br />
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <HStack spacing="24px">
                                    <Input
                                        value={insightInsight}
                                        ref={initialRef}
                                        placeholder="Insight"
                                        onChange={(e) =>
                                            setInsight(e.target.value)
                                        }
                                    />
                                    <Switch
                                        size="lg"
                                        colorScheme="purple"
                                        onChange={() => {
                                            setInsightActive(!insightActive);
                                        }}
                                        isChecked={insightActive}
                                    />
                                </HStack>
                            </FormControl>
                            <br />
                            <Text fontSize="sm">
                                Created:
                                {" " + insight.insight_created.split("T")[0]}
                            </Text>
                            <Text fontSize="sm">
                                Updated:
                                {" " +
                                    insight.insight_last_updated.split("T")[0]}
                            </Text>
                        </ModalBody>
                        <ModalFooter>
                            <hr />
                            <ButtonU
                                onClick={() => {
                                    deleteInsight(insight);
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
                                    updateInsight(insight, {
                                        insight_active: insightActive,
                                        insight_insight: insightInsight,
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

export default EditInsightModal;
