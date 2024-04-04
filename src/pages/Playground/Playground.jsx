import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Input, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, useDisclosure, TableRow, Textarea, Tooltip, ModalHeader, ModalBody } from '@nextui-org/react'
import React, { useState } from 'react'
import llamauthLogo from "../../Images/haya-logo.png";
import ModalPopup from "../Collections/ModalPopup";


const Playground = () => {
  const [number, setNumber] = useState(0);
  const [addrow, setAddrow] = useState([]);
  const [JsonSchema, setJsonschema] = useState([]);
  const { isOpen: isGenerateOpen, onOpen: onGenerateOpen, onOpenChange: onOpenGenerateChange } = useDisclosure();
  const { isOpen: isContextOpen, onOpen: onContextOpen, onOpenChange: onOpenContextChange } = useDisclosure();
  const theme=localStorage.getItem("Theme");

  const [Schema, setSchema] = useState({
    id: '',
    VariableKey: '',
    FieldName: ''
  })

  const addVariableHandler = (index) => {
    setNumber(index + 1);
    setJsonschema([...JsonSchema, { id: index + 1, VariableKey: "", FieldName: '' }])
    setAddrow([...addrow, index + 1])
  }


  const removeVariableHandler = (index) => {
    const results = addrow && addrow.filter((data) => data !== index);
    const jsonResult = JsonSchema && JsonSchema.filter((data) => data.id !== index)
    setJsonschema(jsonResult)
    setAddrow(results)
  }

  const HandleChange = (event, dataId, field) => {
    const { value } = event.target;
    console.log("dataId", dataId)
    // Update the JsonSchema state based on the field and index
    setJsonschema(prevSchema => {
      const updatedSchema = prevSchema.map(item => {
        if (item.id === dataId) {
          return {
            ...item,
            [field]: value
          };
        }
        return item;
      });
      return updatedSchema;
    });
  };

  console.log("JsonSchema", JsonSchema)

  const ModalBodyData = () => {
    return <>
      <ModalHeader className="flex flex-col  gap-1"> Haya Generate</ModalHeader>
      <ModalBody className='gap-0'>
      </ModalBody>
    </>
  }

  const footerCreate = () => {
    return <></>
  }

  const ModalContextBody=()=>{
    return  <>
    <ModalHeader className="flex flex-col  gap-1"> Context Documents</ModalHeader>
    <ModalBody className='gap-0'>
    </ModalBody>
  </>
  }

  const FooterContextCreate=()=>{
    return <></>
  }

  return (
    <>
      <div>
        <div className='text-3xl font-medium'>Playground</div>
        <div className='mt-4 leading-relaxed'>
          You can tweak haya to give you the desired outputs for each Haya tool. You can always reset the tool to bring it back to its original behaviour.
        </div>
        <div className='text-xl font-medium pt-8 flex justify-between items-center'>
          <div>
            Haya Search
          </div>
          <div className='flex items-center gap-4'>
            <Button size='sm' variant='bordered' color='danger'>Reset</Button>
            <Button size='sm' color='danger'>Save</Button>
          </div>
        </div>
        <Divider className='mt-2' />

        {/* Playground */}
        <div className='flex justify-between pt-4 gap-8'>
          {/* Left side */}
          <div className='w-1/2'>
            <Card className='mt-8 w-400 card-color border border-grey-500 p-2' shadow='none'>
              <CardHeader className='flex justify-between items-center'>
                <div className='flex items-center gap-2 justify-between font-semibold'>
                  Prefix Prompt
                  <Tooltip
                    size='sm'
                    placement='right'
                    content='Use variables in a form to automatically replace the variables in the prompt'
                    classNames={{
                      base: [
                        // arrow color
                        "before:bg-neutral-400 dark:before:bg-white",
                      ],
                      content: [
                        "w-44",
                        "p-3"
                      ],
                    }}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/yxczfiyc.json"
                      colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                      style={{ width: "14px", height: "14px" }}>
                    </lord-icon>
                  </Tooltip>
                </div>

                <Button size='sm' color='secondary' onPress={onGenerateOpen}>
                  Haya Generate
                </Button>
              </CardHeader>
              <CardBody>
                <Textarea
                  variant='bordered'
                  color='secondary' />
              </CardBody>
            </Card>

            <Card className='mt-8 w-400 card-color border border-grey-500 p-2' shadow='none'>

              <CardHeader className='flex justify-between items-center'>

                <div className='flex items-center gap-2 justify-between font-semibold'>

                  Variables
                  <Tooltip
                    size='sm'
                    placement='right'
                    content='Use variables in a form to automatically replace the variables in the prompt'
                    classNames={{
                      base: [
                        // arrow color
                        "before:bg-neutral-400 dark:before:bg-white",
                      ],
                      content: [
                        "w-44",
                        "p-3"
                      ],
                    }}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/yxczfiyc.json"
                      colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                      style={{ width: "14px", height: "14px" }}>
                    </lord-icon>
                  </Tooltip>
                </div>
                <div>

                  <Button size='sm' variant='light' onClick={() => addVariableHandler(number)} color='default'>
                    <div className='font-bold'>
                      + Add
                    </div>
                  </Button>

                </div>
              </CardHeader>
              <CardBody>
                {addrow && addrow.length > 0 ?
                  <Table removeWrapper aria-label="Example static collection table" isStriped>
                    <TableHeader>
                      <TableColumn>VARIABLE KEY</TableColumn>
                      <TableColumn>USER INPUT FIELD NAME</TableColumn>
                      <TableColumn>OPTIONAL</TableColumn>
                      <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {addrow && addrow.map((data, index) => {
                        return <TableRow key={data}>
                          <TableCell><Input classNames="border-none" size='sm' onChange={(event) => HandleChange(event, data, "VariableKey")} variant="bordered" placeholder='Enter variable key' /></TableCell>
                          <TableCell><Input size='sm' onChange={(event) => HandleChange(event, data, "FieldName")} variant="bordered" placeholder='Enter field name' /></TableCell>
                          <TableCell> <Switch
                            size='sm'
                            color='danger'
                          ></Switch></TableCell>
                          <TableCell>
                            <div className='flex justify-around'>
                              <lord-icon
                                src="https://cdn.lordicon.com/lecprnjb.json"
                                trigger="hover"
                                state="morph-home-2"
                                colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                                style={{ width: "20px", height: "20px" }}>
                              </lord-icon>
                              <lord-icon
                                onClick={() => removeVariableHandler(data)}
                                src="https://cdn.lordicon.com/wpyrrmcq.json"
                                trigger="hover"
                                target="#trash"
                                state="morph-home-2"
                                colors="primary:#e1426c"
                                style={{ width: "20px", height: "20px" }}>
                              </lord-icon>
                            </div>
                          </TableCell>
                        </TableRow>
                      })}

                    </TableBody>
                  </Table>
                  : <p className="text-xs text-coolGray-500">Variables allow users to introduce prompt words or opening remarks when filling out forms. You can try entering {"{{input}}"} in the prompt words.</p>}
              </CardBody>
            </Card>
            <Card className={`mt-8 w-400 card-color ${theme==="dark"?"":"bg-card-color"} p-2`} shadow='none'>
              <CardHeader className='flex justify-between items-center'>
                <div className='flex items-center gap-2 justify-between font-semibold'>
                  Context Documents
                  <Tooltip
                    size='sm'
                    placement='right'
                    content='Use variables in a form to automatically replace the variables in the prompt'
                    classNames={{
                      base: [
                        // arrow color
                        "before:bg-neutral-400 dark:before:bg-white",
                      ],
                      content: [
                        "w-44",
                        "p-3"
                      ],
                    }}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/yxczfiyc.json"
                      colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                      style={{ width: "14px", height: "14px" }}>
                    </lord-icon>
                  </Tooltip>
                </div>
                <div>

                  <Button size='sm' variant='light' color='default' onPress={onContextOpen}>
                    <div className='font-bold'>
                      + Add
                    </div>
                  </Button>

                </div>
              </CardHeader>
              <CardBody>
                <div className='text-xs text-coolGray-500'>
                  You can import knowledge as content or not import any documents to use the existing knowledge base
                </div>
              </CardBody>
            </Card>
          </div>

          {/* right side */}
          <div className='w-1/2'>
            <Card className='mt-8 w-400 card-color border border-grey-500 p-2' shadow='none'>
              <CardHeader className='flex justify-between items-center'>

                <div className='flex items-center gap-2 justify-between font-semibold'>

                  Debug and preivew
                  <Tooltip
                    size='sm'
                    placement='right'
                    content='Use variables in a form to automatically replace the variables in the prompt'
                    classNames={{
                      base: [
                        // arrow color
                        "before:bg-neutral-400 dark:before:bg-white",
                      ],
                      content: [
                        "w-44",
                        "p-3"
                      ],
                    }}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/yxczfiyc.json"
                      colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                      style={{ width: "14px", height: "14px" }}>
                    </lord-icon>
                  </Tooltip>
                </div>

              </CardHeader>
              <CardBody>
                <div className='text-small'>
                  Fill in the value of the variable, which will be automatically replaced in the prompt words every time a question is submitted.
                </div>
                <Textarea
                  variant='bordered'
                  labelPlacement='outside'
                  className='mt-4'
                  label="Query"
                />
                <div className='flex justify-between mt-4'>
                  <Button variant='light' color='secondary' size='sm'>
                    Cancel
                  </Button>
                  <Button color='secondary' size='sm'>
                    <lord-icon
                      src="https://cdn.lordicon.com/aklfruoc.json"
                      trigger="hover"
                      colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                      style={{ width: "16px", height: "16px" }}>

                    </lord-icon>
                    RUN
                  </Button>
                </div>
                <div className='text-xs font-semibold text-coolGray-500 mt-10'>
                  OUTPUT TEXT
                </div>

                {/* Output */}
                <div className='mt-6 flex gap-4 items-start'>
                  <Image
                    width={100}
                    alt="NextUI hero Image"
                    src={llamauthLogo}
                  />

                  <div className='text-xs text-coolGray-600 pl-4'>
                    The question "What is the sound of one hand clapping?" is a classic Zen koan, a paradoxical riddle used in Zen Buddhism to provoke contemplation and insight into the nature of reality, consciousness, and perception.
                    <br></br>
                    <br></br>
                    The question challenges the assumption that sound is necessarily produced by two hands clapping together. By contemplating this question deeply, one may come to realize that the answer lies beyond conventional logic and requires a deeper understanding or enlightenment.
                    <br></br>
                    <br></br>

                    Different interpretations and responses to this koan exist, and it's ultimately up to the individual to ponder and explore its meaning in their own practice of Zen or philosophical inquiry.
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <ModalPopup
      size="5xl"
        isOpen={isGenerateOpen}
        onOpenChange={onOpenGenerateChange}
        ModalBodyData={ModalBodyData}
        footer={footerCreate}
      />
      <ModalPopup
      size="md"
        isOpen={isContextOpen}
        onOpenChange={onOpenContextChange}
        ModalBodyData={ModalContextBody}
        footer={FooterContextCreate}
      />
    </>
  )
}

export default Playground