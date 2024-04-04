import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react'
import React, { useState } from 'react'
import { DeleteSingleAttribute } from '../controllers/strapiController';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const DeleteModal = ({isOpen,onOpenChange,deleteData,setDeleteData,Collectionname,setLoader,DeleteHandler}) => {
    const [inputData, setInputData] = useState(null);

    const Theme=localStorage.getItem("Theme")

    return (
        <div className='h-full z-100 transform-null'>
             <NextThemesProvider defaultTheme={Theme}>
            <Modal
                size="lg"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                radius='sm'
                className='py-4'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className='gap-0'>
                                <span className=' block text-sm font-normal'>Are you sure you want to delete the <strong className='font-bold text-slate-12 text-default-900'>Onboarding</strong> collection?</span>
                                <span className='text-sm text-danger mb-4 font-bold'>This can not be undone.</span>
                                <Input
                                    key="outside"
                                    type="text"
                                    radius="sm"
                                    className='border rounded-lg border-content4'
                                    label={<p className=''>Type <strong>DELETE</strong> to confirm.</p>}
                                    labelPlacement="outside"
                                    placeholder=' '
                                    onChange={(e) => setInputData(e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter >
                                <Button className='text-bold' isDisabled={inputData !== "DELETE"} color="danger" variant="flat" onClick={()=>DeleteHandler(onClose)}>
                                    Delete collection
                                </Button>
                                <Button onClick={() => { setDeleteData(null); setInputData(null); onClose() }} variant="light" >
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            </NextThemesProvider>
        </div>
    )
}

export default DeleteModal