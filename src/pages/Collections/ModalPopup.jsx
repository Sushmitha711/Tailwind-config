import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';


const ModalPopup = (props) => {
  const Theme=localStorage.getItem("Theme")

  return (
    <div className='h-full z-100 transform-null'>
      <NextThemesProvider defaultTheme={Theme}>
      <Modal
      size={props.size}
      scrollBehavior={props.scrollBehavior&&props.scrollBehavior}
        isOpen={props.isOpen}
        onOpenChange={props.onOpenChange}
        placement="center"
        radius='sm'
        style={{marginTop:"0",marginBottom:"0"}}
        className='py-4 my-0'
      >
        <ModalContent>
          {(onClose) => (
            <>
             {props.ModalBodyData&&props.ModalBodyData()}
              <ModalFooter className={props.className}>
                {props.footer&&props.footer(onClose)}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </NextThemesProvider>
      </div>
  )
}

export default ModalPopup;