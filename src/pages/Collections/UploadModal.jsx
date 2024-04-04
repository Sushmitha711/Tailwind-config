import { Button, useDisclosure, Input, ModalBody, Modal, ModalHeader, ModalContent, ModalFooter, Textarea } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const ModalPopup = (props) => {
   const Theme=localStorage.getItem("Theme");

    return (
      <div className='h-full z-100 transform-null'>
        <NextThemesProvider defaultTheme={Theme}>
        <Modal
          size={props.size}
          scrollBehavior={props.scrollBehavior && props.scrollBehavior}
          isOpen={props.isOpen}
          onOpenChange={props.onOpenChange}
          placement="center"
          radius='sm'
          className={props.scrollBehavior ? 'light t-120 -mt-40 transform-null text-foreground bg-content1 border border-content4 max-h-96' : 'light t-120 -mt-40 transform-null text-foreground bg-content1 border border-content4'}
        >
          <ModalContent>
            {(onClose) => (
              <>
                {props.ModalBodyData && props.ModalBodyData()}
                <ModalFooter className={props.className}>
                  {props.footer && props.footer(onClose)}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        </NextThemesProvider>
      </div>
    )
  }

export default ModalPopup