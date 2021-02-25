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

import ButtonF from "../Common/ButtonF";
import ButtonU from "../Common/ButtonU";
import Input from "../Common/Input";

function AddOrgModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();

    const [orgID, setOrgID] = useState("");
    const [orgName, setOrgName] = useState("");

    const { AddNewOrg } = props;

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
                    <ModalHeader>Org</ModalHeader>
                    <hr />
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
                    </ModalBody>
                    <ModalFooter>
                        <hr />
                        <ButtonU onClick={onClose}>Cancel</ButtonU>
                        &nbsp;
                        <ButtonF
                            onClick={() => {
                                AddNewOrg({
                                    org_id: orgID,
                                    org_name: orgName,
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

export default AddOrgModal;
