import { Tooltip, Dropdown, DropdownTrigger, User, DropdownItem, DropdownMenu, Avatar, Chip, Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, useDisclosure, Input, ModalBody, Modal, ModalHeader, ModalContent, ModalFooter, Textarea, Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Tab, Tabs } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ModalPopup from './ModalPopup'
import { useParams } from 'react-router-dom';
import { UpdateData, getAllData, getOneData, uploadFile } from '../../controllers/strapiController';
import Loading from '../../components/Loader/Loading';
import SearchIcon from '../../Images/Search';
import DeleteModal from "../../components/DeleteModal";
import UpdateCollection from './UpdateCollection';
import NotFound from '../../components/NotFound';
import ServerIssue from '../../components/ServerIssue';

const SingleCollection = () => {
  const { isOpen: isModalOpen, onOpen: onModalOpen, onOpenChange: onModalOpenChange } = useDisclosure();
  const { isOpen: isSingleOpen, onOpen: onSingleOpen, onOpenChange: onSingleOpenChange } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange } = useDisclosure();
  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onOpenChange: onSettingsOpenChange } = useDisclosure();
  const [tagInput, setTagInput] = useState('');
  const [AllUsers, setAllUsers] = useState(null);
  const [textValue, setTextValue] = useState('');
  const [Collection, setCollection] = useState(null);
  const [SelectedFile, setSelectedFile] = useState(null);
  const [NewData, setNewData] = useState([]);
  const [SelectedId, setSelectedId] = useState('');
  const [deleteData, setDeleteData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [ButtonLoader, setButtonLoader] = useState(false);
  const [tags, setTags] = useState([]);
  const [Loader, setLoader] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState(null)
  const [Response, setResponse] = useState('');
  const [FileUpload, setFileUpload] = useState();
  const fileInputRef = useRef();
  const CollectionName = "collections";
  const params = useParams();
  const navigate = useNavigate();
  const [EmailValidate,setEmailValidate]=useState('');
  const [notFound,setNotFound] =useState(false);
  const [Forbidden,setForbidden] =useState(false);
  const [serverIssue,setServerIssue] =useState(false);
  const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const theme=localStorage.getItem("Theme");

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  console.log("params",params)

  useEffect(() => {
    getOneData(CollectionName, params._id)
      .then((data) => {
        setLoader(false);
        if(data.error){
          if(data.error.status!==404&&data.error.status!==403){
            setServerIssue(true)
          }
          if(data.error.status===404){
          setNotFound(true)
          }
          if(data.error.status===403){
            setForbidden(true);
          }
        }else {
        console.log("data",data)
        setCollection(data.data)
        setTimeout(() => { setButtonLoader(false) }, 200)
        }
      })
      .catch((error) => console.log(error))

    getAllData("users")
      .then((data) => setAllUsers(data))
      .catch((error) => alert(error))
  }, [Response])


  const InvitedUsers = Collection && Collection.attributes && Collection.attributes.inviteds && Collection.attributes.inviteds.data;
  const ViewdUsers = Collection && Collection.attributes && Collection.attributes.viewed && Collection.attributes.viewed.data;
  const requestedUser = Collection && Collection.attributes && Collection.attributes.requests && Collection.attributes.requests.data;
  const MergeUsers = InvitedUsers && InvitedUsers.concat(ViewdUsers && ViewdUsers);

  useEffect(() => {
    const fetchData = async () => {
      if (InvitedUsers) {
        const newDataArray = await Promise.all(
          InvitedUsers && InvitedUsers.map(async (data) => {
            const response = await getOneData("users", data.id);
            return response;
          })
        );
        setNewData(newDataArray);
      }
    };

    fetchData();
  }, [Collection, InvitedUsers]);


  const handleKeyPress = (e) => {

  }

  useEffect(() => {
    setSearchResults(AllUsers)
  }, [AllUsers])

  const HandleChange = (event) => {
    const TextValue = event.target.value;
    setTextValue(TextValue);
    const Filterdata = AllUsers && AllUsers.filter((data) => data && data.email.toLowerCase().includes(TextValue.toLowerCase()))
    setSearchResults(Filterdata);
    if (Filterdata && Filterdata.length === 0) {

    }
  }

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files; // Access the files property of the event object
    console.log("files:", files);

    if (files && files[0]) {
      const file = files[0];
      console.log("file:", file);
      setFileUpload(file);
      setSelectedFile(file.name);
    } else {
      setFileUpload(null);
      setSelectedFile(null);
    }
  }


  const SubmitHandler = async (onClose) => {
    setLoader(true);
    let formData = new FormData();
    formData.append("files", FileUpload)
    const response = await uploadFile(formData)
    if (response) {
      const URLresponse = response && response[0].url

      //-------------------------- STRAPI FILE URL------------------------------
      const strapi_URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}${URLresponse}`
      setLoader(false);
      onClose()
    }
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

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  const [formData, setFormdata] = useState({
    Name: '',
    Description: ''
  });

  const renderTags = () => {
    return tags.map((tag, index) => (
      <Chip
        key={index}
        className="mr-2 mb-2"
        size='md'
        color={[
          'secondary',
          'success',
          'warning',
          'danger',
          'primary',
          'default'
        ][index % 6]}
        variant="flat"
        onClose={() => handleTagRemove(tag)}
      >
        {tag}
      </Chip>
    ));
  };

  const InvitedHandler = async (id) => {
    const payload = {
      requests: {
        disconnect: [],
        connect: [{
          id: id,
          position: {
            end: true
          }
        }]
      },
    }

    const response = await UpdateData(CollectionName, params._id, payload)
    if (response) {
      setResponse(response)
      setSelectedId(id)
      setButtonLoader(true)
    }
  }

  const RemoveRequestHandler = async (id) => {

    const payload = {
      requests: {
        disconnect: [{
          id: id,
          position: {
            end: true
          }
        }],
        connect: []
      },
    }

    const response = await UpdateData(CollectionName, params._id, payload)
    if (response) {
      setResponse(response)
      setSelectedId(id)
      setButtonLoader(true)
    }
  }



  const DropDownHandler = async (data, Selecteddata, id) => {

    if (data !== Selecteddata) {
      if (data === "Upload & View") {
        // invited
        const payload = {
          inviteds: {
            disconnect: [],
            connect: [{
              id: id,
              position: {
                end: true
              }
            }]
          },
          viewed: {
            disconnect: [{
              id: id
            }],
            connect: []
          }
        }

        const response = await UpdateData(CollectionName, params._id, payload)
        if (response) {
          setResponse(response)
        }

      } else if (data === "View only") {
        // view
        const payload = {
          inviteds: {
            disconnect: [{
              id: id,
            }],
            connect: []
          },
          viewed: {
            disconnect: [],
            connect: [{
              id: id,
              position: {
                end: true
              }
            }]
          }
        }
        const response = await UpdateData(CollectionName, params._id, payload)
        if (response) {

          setResponse(response)
        }

      }
    } else {
      console.log("---------------->same data selected")
    }

  }


  useEffect(()=>{

    if(textValue!==''&&searchResults.length===0){
        if(!EmailRegex.test(textValue)){
          setEmailValidate("Please enter a valid email.")
        }else{
          setEmailValidate(null)
        }
    }
  },[textValue])

  console.log("Validate",EmailValidate)

  const DeleteWarningHandle = (data) => {
    setDeleteData(data);
    onDeleteOpen();
  }

  const DeleteHandler = async (onClose) => {
    setLoader(true)

    const payload = {
      inviteds: {
        disconnect: [{
          id: deleteData,
        }],
        connect: []
      },
    }
    const response = await UpdateData(CollectionName, params._id, payload);
    if (response) {
      setResponse(response)
      onClose();
      setTimeout(() => {
        setLoader(false);
      }, 300)
    }
  }

  const ModalBodyData = () => {
    return <>
      <ModalHeader className="flex flex-col  gap-1">Upload a Document</ModalHeader>
      <ModalBody className='gap-0'>
        <Input
          isRequired
          key="outside"
          type="text"
          label="Document Title"
          labelPlacement="outside"
          placeholder="Enter your collection folder name"
        />
        <div className='flex flex-col  pt-4'>
          <Button onClick={handleButtonClick} size='sm' className='pr'>
            Upload a document
          </Button>
          <label className='text-xs'>{SelectedFile}</label>
          <input ref={fileInputRef} onChange={handleFileChange} type='file' className='hidden' />
        </div>
        <Input
          radius="sm"
          className='border-slate-6 pt-4'
          key={"outside"}
          type="text"
          label="Tags"
          variant={"faded"}
          labelPlacement={"outside"}
          placeholder="Press Enter to add multiple tags"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyPress={handleTagInputKeyPress}
        />
        <div className="flex flex-wrap pt-8">
          {renderTags()}
        </div>
      </ModalBody>

    </>
  }

  const footerCreate = (onClose) => {
    return <><Button color="default" variant="flat" onClick={() => { setFormdata({}); onClose() }}>
      Cancel
    </Button>
      <Button color="secondary" isDisabled={SelectedFile === null} onClick={() => { SubmitHandler(onClose) }}>
        Create
      </Button></>
  }

  const invitedUsers = [];
  const remainingUsers = [];


  searchResults && searchResults.forEach((data) => {
    const colorIndex = Collection && data.id % numColors;
    const InvitedTest = MergeUsers && MergeUsers.find((item) => item.id === data.id);
    const request = requestedUser && requestedUser.find((item) => item.id === data.id);
    const ViewedTest = ViewdUsers && ViewdUsers.find((item) => item.id === data.id);
    const Newtest = ViewedTest ? "View only" : "Upload & View";


    if (InvitedTest) {
      invitedUsers.push(
        <div key={data.id} className='flex flex-row items-center justify-between py-2'>
          <div className='flex flex-row items-center gap-4  w-full'>
            <Avatar src={`${data.Picture && data.Picture.data !== null ? `${process.env.REACT_APP_STRAPI_IP_ADDRESS}${data.Picture.url}` : ""}`}
              color={Colors[colorIndex]} name={data && data.email && data.email.slice(0, 1).toUpperCase()} size="sm" />
            <div className='flex flex-col'>
              <p className=''>{data.email && data.email.split('@')[0]}</p>
              <p className='text-slate-400'>{data.username}</p>
            </div>
          </div>
          <div className='w-full  text-center'>
            <Chip size='sm' color="success" variant='flat'>Invited</Chip>
          </div>
          <div className='w-full text-end flex justify-end gap-2'>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <div>
                  <Tooltip placement='bottom' size='sm' content='Manage role' delay={1000}>
                    <lord-icon
                      src="https://cdn.lordicon.com/lecprnjb.json"
                      trigger="hover"
                      target="#settings"
                      state="morph-home-2"
                      colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                      style={{ width: "20px", height: "20px" }}>
                    </lord-icon>
                  </Tooltip>
                </div>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={[Newtest]}
                onSelectionChange={setSelectedKeys}
                aria-label="Profile Actions">
                <DropdownItem onClick={() => DropDownHandler("Upload & View", Newtest, data.id)} key="Upload & View" >Upload & View</DropdownItem>
                <DropdownItem onClick={() => DropDownHandler("View only", Newtest, data.id)} key="View only">View only</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Tooltip placement='bottom' size='sm' content='Remove user from collection' delay={1000}>
              <lord-icon
                src="https://cdn.lordicon.com/wpyrrmcq.json"
                colors="primary:#e1426c"
                trigger="hover"
                onClick={() => DeleteWarningHandle(data.id)}
                style={{ width: "20px", height: "20px" }}>
              </lord-icon>
            </Tooltip>
          </div>
        </div>
      );
    } else {
      remainingUsers.push(
        <div key={data.id} className='flex flex-row items-center justify-between py-2'>
          <div className='flex flex-row items-center gap-4'>
            <Avatar src={`${data.Picture && data.Picture.data !== null ? `${process.env.REACT_APP_STRAPI_IP_ADDRESS}${data.Picture.url}` : ""}`}
              color={Colors[colorIndex]} name={data && data.email && data.email.slice(0, 1).toUpperCase()} size="sm" />
            <div className='flex flex-col '>
              <p className=''>{data.email && data.email.split('@')[0]}</p>
              <p className='text-slate-400'>{data.username}</p>
            </div>
          </div>
          <div>
            {!request ? <Button onClick={() => InvitedHandler(data.id)} isLoading={SelectedId === data.id ? ButtonLoader : false} size='sm' color="secondary">
              Invite
            </Button> :
              <Button onClick={() => RemoveRequestHandler(data.id)} className='gap-1' id='CancelBtn' size='sm' color="secondary" variant="light">
                <lord-icon
                  src="https://cdn.lordicon.com/nqtddedc.json"
                  trigger="hover"
                  target="#CancelBtn"
                  colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                  style={{ width: "16px", height: "16px" }}>
                </lord-icon>
                <span> Cancel request</span>
              </Button>}
          </div>
        </div>
      );
    }
  });


  const UserModal = () => {
    return <>
      <ModalHeader className="flex flex-col  gap-1">
        <p>Manage users</p>
        <div className='pt-2'>
          <Input
            classNames=""
            onChange={HandleChange}
            value={textValue}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleKeyPress(event);
              }
            }}
            placeholder='Search by user content...'
            startContent={<SearchIcon className="text-large text-default-400 pointer-events-none flex-shrink-0" />}
          />
        </div>
      </ModalHeader>
      <ModalBody className='gap-0'>
        <div>
          <div className='divide-y divide-slate-300'>

            {searchResults && searchResults.length > 0 ? <>
              {invitedUsers}
              {remainingUsers}
            </>
              :<>{EmailValidate!==null?
             <p className='text-red-500'>{EmailValidate}</p> :
              <div className='flex flex-row justify-between items-center'> 
              <div className='flex flex-row items-center gap-4'>
              <Avatar 
                color={Colors[colorIndex]} name={textValue.slice(0, 1).toUpperCase()} size="sm" />
              <div className='flex flex-col '>
                {/* <p className=''>{textValue.split('@')[0]}</p> */}
                <p className=''>{textValue}</p>
              </div>
            </div>
            <div>
              <p className='text-xs text-slate-400'>This email does not exists in the space.</p>
            </div>
            <div>
             <Button variant='flat' color='success'>Invite to space</Button>
            </div>
            </div>}</> }
          </div>

        </div>

      </ModalBody>
    </>
  }

  const UserFooterModal = () => {
    return <></>
  }

  return (
    <div>
      {Loader ? <div className={`absolute z-[100]  inset-0 h-screen w-screen ${theme==="dark"?'bg-black':'bg-slate-50'}`}>
        <Loading />
      </div> : ""}
      {serverIssue?<ServerIssue/>:
      <>
      {notFound ?<NotFound/>:<>
      <div className='text-3xl font-medium flex gap-4 items-center'>
        <Avatar isBordered radius="full" name={Collection && Collection.attributes.Name && Collection.attributes.Name.slice(0, 1).toUpperCase()} size="md" color={Colors[colorIndex]} />

        {Collection && Collection.attributes.Name}
        <div className='cursor-pointer' onClick={onSettingsOpen}>

          <Tooltip placement='bottom' size='sm' content='Settings' delay={1000}>

            <lord-icon
              src="https://cdn.lordicon.com/lecprnjb.json"
              trigger="hover"
              target="#settings"
              state="morph-home-2"
              colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
              style={{ width: "20px", height: "20px" }}>
            </lord-icon>
          </Tooltip>
        </div>
        <div id='User' onClick={onSingleOpen}>
          <Tooltip placement='bottom' size='sm' content='Invite users to collection' delay={500}>
            <lord-icon
              src="https://cdn.lordicon.com/kthelypq.json"
              trigger="hover"
              target="#User"
              state="morph-home-2"
              colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
              style={{ width: "20px", height: "20px" }}>
            </lord-icon>
          </Tooltip>
        </div>
      </div>

      <div className='mt-4 leading-relaxed'>
        {Collection && Collection.attributes.Description}
      </div>
      <div className='pt-4 gap-2 flex'>


        {/* Render tags if Collection and Collection.attributes exist */}
        {Collection && Collection.attributes && Collection.attributes.Tags && Collection.attributes.Tags.tags.map((tag, index) => (
          <Chip key={index} color={Colors[colorIndex]} variant='flat' size='sm'>
            {tag}
          </Chip>
        ))}
      </div>
      <div>

        <div className='pt-4 flex justify-end'>
          <Button color='secondary' onPress={onModalOpen}>
            Upload a file
          </Button>
        </div>
        <div className='pt-8'>
          <Card className="max-w-[400px] border border-grey-500 " shadow='none'>
            <CardHeader className="flex gap-3 justify-between px-4">
              <div className='flex justify-between gap-3'>
                <Image
                  alt="nextui logo"
                  height={40}
                  radius="sm"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Adobe_Acrobat_DC_logo_2020.svg/768px-Adobe_Acrobat_DC_logo_2020.svg.png"
                  width={40}
                />
                <div className="flex flex-col">
                  <p className="text-md">TimeGPT</p>
                  <p className="text-small text-default-500">PDF</p>
                </div>
              </div>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <div className='flex items-center justify-evenly cursor-pointer'>
                    <span className='text-md font-bold text-slate-500'>...</span>
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="edit">
                    <div className='flex items-center gap-2'>
                      <lord-icon
                        src="https://cdn.lordicon.com/pflszboa.json"
                        colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                        style={{ width: "16px", height: "16px" }}>
                      </lord-icon>
                      Edit
                    </div>
                  </DropdownItem>

                  <DropdownItem key="system">
                    <div className='flex items-center gap-2'>
                      <lord-icon
                        src="https://cdn.lordicon.com/vuiggmtc.json"
                        colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                        trigger="hover"
                        style={{ width: "16px", height: "16px" }}>
                      </lord-icon>
                      Archive
                    </div>
                  </DropdownItem>
                  <DropdownItem key="configurations" className='text-danger' color="danger">
                    <div className='flex items-center gap-2'>
                      <lord-icon
                        src="https://cdn.lordicon.com/wpyrrmcq.json"
                        colors="primary:#e1426c"
                        style={{ width: "16px", height: "16px" }}>
                      </lord-icon>
                      Delete
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Uncertainty is an intrinsic aspect of life, a constant element that humans have...</p>
              <div className='flex gap-4 pt-6'>
                <Chip
                  color='default'
                  variant="flat"
                >
                  LLM, Langchain, Qdrant +3
                </Chip>
              </div>
            </CardBody>
            <Divider />
            <CardFooter>
              <Link
                isExternal
                showAnchorIcon
                href="https://github.com/nextui-org/nextui"
              >
                Visit source document
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
      </>}
</>}
      <ModalPopup
        isOpen={isModalOpen}
        onOpenChange={onModalOpenChange}
        ModalBodyData={ModalBodyData}
        footer={footerCreate}
      // onClose={handleModalClose}
      />
      <ModalPopup
        isOpen={isSingleOpen}
        size="5xl"
        onOpenChange={onSingleOpenChange}
        ModalBodyData={UserModal}
        footer={UserFooterModal}
        scrollBehavior="inside"
      // onClose={handleModalClose}
      />
      <UpdateCollection
        isWarningOpen={isSettingsOpen}
        onWarningOpenChange={onSettingsOpenChange}
        SelectCollection={Collection}
        setLoader={setLoader}
      />

      <DeleteModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        deleteData={deleteData}
        setDeleteData={setDeleteData}
        Collectionname={CollectionName}
        DeleteHandler={DeleteHandler}
        setLoader={setLoader} />
        
    </div >
  )
}

export default SingleCollection;