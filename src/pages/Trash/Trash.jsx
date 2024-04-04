import { Button, ModalBody, ModalHeader, useDisclosure } from '@nextui-org/react'
import React from 'react'
import ModalPopup from '../Collections/ModalPopup';

const Trash = () => {

  const { isOpen: isTrashOpen, onOpen: onTrashOpen, onOpenChange: onOpenTrashChange } = useDisclosure();

  const ModalBodyData = () => {
    return <>
    <ModalHeader className="flex flex-col gap-1">Empty trash</ModalHeader>
    <ModalBody className='gap-0'></ModalBody>
    </>
  }

  const footerCreate = () => {
    return <></>
  }


  return (
    <div>
      <div className='text-3xl font-medium flex items-center gap-8 '>
        Trash
        <Button onPress={onTrashOpen} size='sm' className='bg-black text-slate-50'>
          Empty Trash
        </Button>
        </div>
      <div className='mt-4 leading-relaxed'>
        Items in trash will be permanently deleted after 30 days.

      </div>
     <ModalPopup
     size="md"
     isOpen={isTrashOpen}
     onOpenChange={onOpenTrashChange}
     ModalBodyData={ModalBodyData}
     footer={footerCreate}
     />
    </div>
  )
}

export default Trash