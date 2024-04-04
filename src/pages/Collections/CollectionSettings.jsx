import { Tooltip, Dropdown, DropdownTrigger, User, DropdownItem, DropdownMenu, Avatar, Chip, Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, useDisclosure, Input, ModalBody, Modal, ModalHeader, ModalContent, ModalFooter, Textarea, Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Tab, Tabs } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ModalPopup from './ModalPopup'
import Continue from '../../Images/Continue';
import { useParams } from 'react-router-dom';
import { getOneData, uploadFile } from '../../controllers/strapiController';
import Loading from '../../components/Loader/Loading';

const CollectionSettings = () => {
  const { isOpen: isOpen, onOpen: onOpen, onOpenChange: onOpenChange } = useDisclosure();
  const [tagInput, setTagInput] = useState('')
  const [Collection, setCollection] = useState(null);
  const [SelectedFile, setSelectedFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [Loader, setLoader] = useState(true);
  const [FileUpload, setFileUpload] = useState();
  const fileInputRef = useRef();
  const CollectionName = "collections";
  const params = useParams();
  console.log("params", params)
  const navigate = useNavigate();
  const Theme=localStorage.getItem("Theme");

  useEffect(() => {
    getOneData(CollectionName, params._id)
      .then((data) => { setLoader(false); setCollection(data.data) })
      .catch((error) => console.log(error))
  }, [])

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files; // Access the files property of the event object
    console.log("files:", files);
  }

  const Colors = [
    'secondary',
    'success',
    'warning',
    'danger',
    'default',
    'primary',
  ]


  const numColors = Colors.length;
  const colorIndex = Collection && Collection.id % numColors;

  return (
    <div>
      {Loader ? <div className={`absolute z-[100]  inset-0 h-screen w-screen ${Theme==="dark"?'bg-black':'bg-slate-50'}`}>
        <Loading />
      </div> : ""}
      <div className='text-3xl font-medium flex gap-4 items-center'>
        <Avatar isBordered radius="full" name={Collection && Collection.attributes.Name && Collection.attributes.Name.slice(0, 1).toUpperCase()} size="md" color={Colors[colorIndex]} />
        {Collection && Collection.attributes.Name}

      </div>
      <div className='text-xl font-medium pt-12 flex justify-between'>
        Settings
      </div>
      <Divider className='mt-2' />
      <div className='mt-8'>
        <Card className='w-400 card-color border border-grey-500 p-2' shadow='none'>
          <div className='p-4'>
            <Input
              key="outside"
              type="text"
              radius="sm"
              className='border rounded-lg border-content4 w-1/2'
              label='Name'
              labelPlacement="outside"
              placeholder=' '
            />
            <div className='mt-4'>

              <Textarea
                radius='sm'
                minRows={6}
                className=' border-content4 w-1/2'
                labelPlacement="outside"
                label='Description
              '/>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default CollectionSettings