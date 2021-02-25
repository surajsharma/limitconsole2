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

import ButtonF from "../Common/ButtonF";
import ButtonU from "../Common/ButtonU";
import Input from "../Common/Input";

function EditOrgModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { org, deleteOrg, updateOrg } = props;
    const [orgID, setOrgID] = useState(org.org_id);
    const [orgName, setOrgName] = useState(org.org_name);
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
                        <ModalHeader>Org</ModalHeader>
                        <hr />
                        <br />
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <Input
                                    value={orgName}
                                    ref={initialRef}
                                    placeholder="Org Name"
                                    onChange={(e) => setOrgName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <Input
                                    value={orgID}
                                    placeholder="Org Id"
                                    onChange={(e) => setOrgID(e.target.value)}
                                />
                            </FormControl>
                            <br />
                            <Text fontSize="sm">
                                Created: {org.createdAt.split("T")[0]}
                            </Text>
                            <Text fontSize="sm">
                                Updated: {org.updatedAt.split("T")[0]}
                            </Text>
                        </ModalBody>
                        <ModalFooter>
                            <hr />
                            <ButtonU
                                onClick={() => {
                                    deleteOrg(org);
                                    onClose();
                                }}
                            >
                                Delete
                            </ButtonU>
                            <Spacer />
                            <ButtonU onClick={onClose}>Cancel</ButtonU>
                            &nbsp;
                            <ButtonF
                                onClick={() => {
                                    updateOrg({
                                        ...org,
                                        org_id: orgID,
                                        org_name: orgName,
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

export default EditOrgModal;
