import { AvatarGroup, Avatar, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu, Link, CardFooter, Chip, Button, Card, CardBody, CardHeader, Divider, Image, useDisclosure, ModalHeader, ModalBody, Input, Textarea, Tooltip, Switch } from '@nextui-org/react'
import React, { useEffect, useState } from 'react';
import ModalPopup from './ModalPopup';
import { CreateData, DeleteSingleAttribute, StringLimit, getAllData, getOneData, timeDifference } from '../../controllers/strapiController';
import { useNavigate } from 'react-router-dom';
import UpdateCollection from './UpdateCollection';
import DeleteModal from '../../components/DeleteModal';
import FetchUserDataAndRenderAvatar from './FetchUserDataAndRenderAvatar';
import Loading from '../../components/Loader/Loading';

const Collections = () => {
  const { isOpen: isOpen, onOpen: onOpen, onOpenChange: onOpenChange } = useDisclosure();
  const { isOpen: isWarningOpen, onOpen: onWarningOpen, onOpenChange: onWarningOpenChange } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange } = useDisclosure();
  const [tagInput, setTagInput] = useState('');
  const [AllCollections, setAllCollections] = useState(null);
  const [Loader, setLoader] = useState(true);
  const [SelectCollection, setSelectCollection] = useState(null);
  const [tags, setTags] = useState([]);
  const [deleteData, setDeleteData] = useState(null);
  const Collectionname = "collections";
  const Navigate = useNavigate();
  const [validationCondition, setValidationCondition] = useState(false);
  const UserDetails = JSON.parse(sessionStorage.getItem("userData"));
  const UserID = UserDetails && UserDetails.user && UserDetails.user.id;
  const theme=localStorage.getItem("Theme")
  const [formData, setFormdata] = useState({
    Name: '',
    Description: '',
    Tags: [],
    isPublic: false
  });
  const [formError, setFormError] = useState({
    NameError: '',
    DescriptionError: '',
  });

  const Theme=localStorage.getItem("Theme");

  const Colors = [
    'secondary',
    'success',
    'warning',
    'default',
    'danger',
    'primary',
  ]

  const numColors = Colors.length;
  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
    setFormdata(() => ({ ...formData, Tags: tags.filter(tag => tag !== tagToRemove) }))
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setFormdata(() => ({ ...formData, Tags: [...tags, tagInput.trim()] }))
      setTagInput('');
    }
  };

  useEffect(() => {
    setLoader(true)
    getAllData(Collectionname)
      .then((data) => {
        setAllCollections(data.data)
        setTimeout(()=>{  setLoader(false)},300)
      
      })
      .catch((error) => console.log(error))

  }, [])


  const SortedData = AllCollections && AllCollections.sort((a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt))
  const MyCollections = SortedData && SortedData.filter((data) => data && data.attributes.author.data && data.attributes.author.data.id === UserID);
  const PublicCollections = SortedData && SortedData.filter((data) => data && data.attributes.Public && data.attributes.Public === true);
  const sharedCollections = SortedData && SortedData.map((data) => {
    const InvitedData = data.attributes.inviteds && data.attributes.inviteds.data && data.attributes.inviteds.data;
    const myData = InvitedData && InvitedData.filter((datafilter) => datafilter.id === UserID);
    return myData.length > 0 ? data : null;
  }).filter(item => item !== null);


  const Validation = () => {
    let IsValid = true;

    if (!formData.Name) {
      IsValid = false;
      setFormError((previous) => ({ ...previous, NameError: "Name is required." }));
    } else {
      setFormError((previous) => ({ ...previous, NameError: null }))
    }

    if (!formData.Description) {
      IsValid = false;
      setFormError((previous) => ({ ...previous, DescriptionError: "Description is required." }))
    } else {
      setFormError((previous) => ({ ...previous, DescriptionError: null }))
    }
    return IsValid;
  }

  const SubmitHandler = async (onClose) => {

    const Validate = Validation();
    const payload = {
      Name: formData.Name,
      Description: formData.Description,
      author: {
        disconnect: [],
        connect: [{
          id: UserID,
          position: {
            end: true
          }
        }]
      },
      Public: false,
      color: "",
      Tags: {
        "tags": formData.Tags
      },
    }
    if (Validate) {
      setLoader(true)
      setValidationCondition(false);
      const response = await CreateData(Collectionname, payload)
      if (response) {
        onClose();
        setTimeout(() => {
          setLoader(false);
          window.location.reload();
        }, 500)
      }
    } else {
      setValidationCondition(true);
    }
  }



  const DeleteWarningHandle = (data) => {
    setDeleteData(data);
    onDeleteOpen();
  }

  const EditOpen = (SelectedCollection) => {
    onWarningOpen();
    setSelectCollection(SelectedCollection)
  }


  const Disabled = formData.Name === "" && formData.Description === "" && (formData.Tags && formData.Tags.length === 0) && formData.isPublic === false ? true : false;

  const renderTags = () => {
    return tags && tags.map((tag, index) => (
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

  const ModalBodyData = () => {
    return <> <ModalHeader className="flex flex-col  gap-1">Create a new Collection</ModalHeader>
      <ModalBody className='gap-0'>
        <Input
          isRequired
          key="outside"
          type="text"
          value={formData.Name}
          onChange={(e) => { setFormdata({ ...formData, Name: e.target.value }) }}
          isInvalid={!formData.Name && validationCondition ? !formData.Name || validationCondition : ''}
          errorMessage={!formData.Name && validationCondition ? formError.NameError : ""}
          label="Collection Name"
          labelPlacement="outside"
          placeholder="Enter your collection folder name"
        />
        <Textarea
          className='pt-4'
          key={"outside"}
          isRequired
          type="text"
          value={formData.Description}
          onChange={(e) => { setFormdata({ ...formData, Description: e.target.value }) }}
          isInvalid={!formData.Description && validationCondition ? !formData.Description || validationCondition : ''}
          errorMessage={!formData.Description && validationCondition ? formError.DescriptionError : ""}
          label="Decription"
          labelPlacement={"outside"}
          placeholder="Enter your collection's Description"
        />
        <div className='flex flex-col gap-1 pt-4'>
          <div className='flex gap-2 flex-col'>
            <p className='text-sm'>Make collection public</p>
            <Switch isSelected={formData.isPublic} onChange={(e) => { setFormdata({ ...formData, isPublic: !formData.isPublic }) }} size='sm' color="secondary"></Switch>
          </div>
          {formData.isPublic ? <p className='text-xs text-slate-400'>By making your collection public anyone inside the space can view and upload your documents.</p> : <></>}
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
      <Button isDisabled={Disabled} color="secondary" onClick={() => { SubmitHandler(onClose) }}>
        Create
      </Button></>
  }


  const DeleteHandler = async (onClose) => {
    setLoader(true)
    const response = await DeleteSingleAttribute(Collectionname, deleteData.id)
    if (response) {
      onClose();
      setTimeout(() => {
        setLoader(false)
        window.location.reload();
      }, 300)
    }
  }



  return (
    <div>
      {Loader ? <div className={`absolute z-[100]  inset-0 h-screen w-screen ${Theme==="dark"?'bg-black':'bg-slate-50'}`}>
        <Loading />
      </div> : ""}
      <div className='text-3xl font-medium'>Collections</div>
      {/* <TmeCalculate InputDate={""} prefix={"days"}/> */}
      <div>
        <div className='text-xl font-medium items-center pt-8 flex justify-between'>
          My Collections
          <Button color='secondary' onPress={onOpen}>Create a new Collection</Button>
        </div>
        <Divider className='mt-2' />
        {MyCollections && MyCollections.length > 0 ? (
          <div className='grid md:grid-cols-2 gap-8 pt-8 sm:grid-cols-1 lg:grid-cols-3' >

            {MyCollections.map((data, index) => {
              const InvitedUsers = data.attributes && data.attributes.inviteds && data.attributes.inviteds.data.length > 0 ? data.attributes.inviteds.data : [];
              const ViewedUsers = data.attributes && data.attributes.viewed && data.attributes.viewed.data.length > 0 ? data.attributes.viewed.data : [];
              const MurgedUsers = ViewedUsers && ViewedUsers.concat(InvitedUsers && InvitedUsers)
              const colorIndex = data.id % numColors;

              return <div key={index} className=' ' onClick={() => Navigate(`/collections/${data.id}`)}>
                <Card className="max-w-[340px] min-w-[340px] min-h-[240px] h-full p-2 border border-grey-500 cursor-pointer" shadow='none'>
                  <CardHeader className="justify-between flex items-center">
                    <div className="flex gap-5">
                      <Avatar isBordered radius="full" name={data && data.attributes.Name && data.attributes.Name.slice(0, 1).toUpperCase()} size="md" color={Colors[colorIndex]} />
                      <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">{data && data.attributes.Name && data.attributes.Name}</h4>
                        <h5 className="text-small tracking-tight text-default-400">updated {timeDifference(data.attributes.createdAt)}</h5>
                      </div>
                    </div>
                    {/* Dropdown */}
                    <Dropdown placement="bottom-end">
                      <DropdownTrigger>
                        <div className='flex items-center justify-evenly cursor-pointer'>
                          <span className='text-md font-bold text-slate-500' variant='light'>
                            ...
                          </span>
                        </div>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="edit" onPress={() => EditOpen(data)}>
                          <div className='flex items-center gap-2'>
                            <lord-icon
                              src="https://cdn.lordicon.com/pflszboa.json"
                              colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                              style={{ width: "16px", height: "16px" }}
                              >
                            </lord-icon>
                            Edit
                          </div>
                        </DropdownItem>

                        <DropdownItem key="system">
                          <div className='flex items-center gap-2'>
                            <lord-icon
                              src="https://cdn.lordicon.com/vuiggmtc.json"
                              trigger="hover"
                              colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                              style={{ width: "16px", height: "16px" }}>
                            </lord-icon>
                            Archive
                          </div>
                        </DropdownItem>
                        <DropdownItem onPress={() => DeleteWarningHandle(data)} key="configurations" className='text-danger' color="danger">
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
                  <CardBody className="px-3 py-0 pb-4 text-small flex flex-col justify-between text-default-500">
                    <p className='pb-4'>
                      {data.attributes.Description && StringLimit(data.attributes.Description, 120)}
                    </p>
                    <div className='flex pt-2 gap-3'>

                      {data.attributes.Tags && data.attributes.Tags.tags.slice(0, 3).map((tag, index) => (
                        <Chip key={index} size='sm' color={Colors[colorIndex]} variant='flat'>
                          {tag}
                        </Chip>
                      ))}

                      {/* Render remaining tags count in a tooltip */}
                      {data.attributes.Tags && data.attributes.Tags.tags.length > 3 && (
                        <Tooltip
                          content={
                            <>
                              {data.attributes.Tags.tags.slice(3).map((tag, index) => (
                                <div key={index}>{tag}</div>
                              ))}
                            </>
                          }
                          placement='bottom'
                          size='sm'
                          closeDelay={10}
                        >
                          <Chip size='sm' color={Colors[colorIndex]} variant="solid">
                            + {data.attributes.Tags.tags.length - 3} more
                          </Chip>
                        </Tooltip>
                      )}
                    </div>
                  </CardBody>
                  <CardFooter className="gap-8 h-12 flex items-center justify-between">
                    <AvatarGroup
                      size='sm'
                      isBordered
                      max={3}
                      total={MurgedUsers.length}
                      renderCount={(count) => (
                        <p className="text-xs text-foreground font-medium ms-2">{count > 3 ? `+${count - 3}` : ""}</p>
                      )}
                    >
                      {MurgedUsers && MurgedUsers.map((user, idx) => {
                        return (
                          <FetchUserDataAndRenderAvatar key={idx} userId={user.id} />
                        );
                      })}
                    </AvatarGroup>

                    <div className='flex items-center gap-2'>

                      <div className='flex items-center'>
                        <lord-icon
                          src="https://cdn.lordicon.com/prjooket.json"
                          colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                          trigger="hover"
                          style={{ width: "20px", height: "20px" }}>
                        </lord-icon>
                        {/* Render the length of the data.attributes.Tags.tags array */}
                        <p className="text-xs text-foreground font-medium">
                          {data && data.attributes && data.attributes.Tags && data.attributes.Tags.tags ? data.attributes.Tags.tags.length : 0}
                        </p>

                      </div>

                      <div className='flex items-center'>

                        <lord-icon
                          src="https://cdn.lordicon.com/rbbnmpcf.json"
                          trigger="hover"
                          colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                          style={{ width: "20px", height: "20px" }}>
                        </lord-icon>
                        <p className="text-xs text-foreground font-medium">10</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            })}</div>) :
          <div className='italic font-medium pt-8 flex justify-center text-coolGray-400'>
            You currently do not have any collections.
          </div>}
      </div>

      <div className='text-xl font-medium pt-8'>
        Public Collections
      </div>

      <Divider className='mt-2' />

      {PublicCollections && PublicCollections.length > 0 ? (
        <div className='grid md:grid-cols-2 gap-8 pt-8 sm:grid-cols-1 lg:grid-cols-3'>
          {PublicCollections.map((data, index) => {
            const InvitedUsers = data.attributes && data.attributes.inviteds && data.attributes.inviteds.data.length > 0 ? data.attributes.inviteds.data : [];
            const ViewedUsers = data.attributes && data.attributes.viewed && data.attributes.viewed.data.length > 0 ? data.attributes.viewed.data : [];
            const MurgedUsers = ViewedUsers && ViewedUsers.concat(InvitedUsers && InvitedUsers)
            const colorIndex = data.id % numColors;
            return <div key={index} className='flow gap-8' onClick={() => Navigate(`/collections/${data.id}`)}> 
            <Card className="max-w-[340px] min-w-[340px] min-h-[240px] h-full p-2 border border-grey-500 cursor-pointer" shadow='none' onClick={() => Navigate(`/collections/${data.id}`)}>
              <CardHeader className="justify-between flex items-center">
                <div className="flex gap-5">
                  <Avatar isBordered radius="full" name={data && data.attributes.Name && data.attributes.Name.slice(0, 1).toUpperCase()} size="md" color={Colors[colorIndex]} />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">{data && data.attributes.Name}</h4>
                    <h5 className="text-small tracking-tight text-default-400">updated {timeDifference(data.attributes.createdAt)}</h5>
                  </div>
                </div>
                {/* Dropdown */}
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <div className='flex items-center justify-evenly cursor-pointer'>
                      <span className='text-md font-bold text-slate-500'>...</span>
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="edit" onClick={() => EditOpen(data)}>
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
                          trigger="hover"
                          colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
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
              <CardBody className="px-3 py-0 pb-4 text-small flex flex-col justify-between text-default-500">
                <p className='pb-4'>
                  {data.attributes.Description && StringLimit(data.attributes.Description, 120)}
                </p>
                <div className='flex pt-2 gap-3'>
                  {data.attributes.Tags && data.attributes.Tags.tags.slice(0, 3).map((tag, index) => (
                    <Chip key={index} size='sm' color={Colors[colorIndex]} variant='flat'>
                      {tag}
                    </Chip>
                  ))}

                  {/* Render remaining tags count in a tooltip */}
                  {data.attributes.Tags && data.attributes.Tags.tags.length > 3 && (
                    <Tooltip
                      content={
                        <>
                          {data.attributes.Tags.tags.slice(3).map((tag, index) => (
                            <div key={index}>{tag}</div>
                          ))}
                        </>
                      }
                      placement='bottom'
                      size='sm'
                      closeDelay={10}
                    >
                      <Chip size='sm' color={Colors[colorIndex]} variant="solid">
                        + {data.attributes.Tags.tags.length - 3} more
                      </Chip>
                    </Tooltip>
                  )}
                </div>
              </CardBody>
              <CardFooter className="gap-8 h-12 flex items-center justify-between">
                <AvatarGroup
                  size='sm'
                  isBordered
                  max={3}
                  total={MurgedUsers.length}
                  renderCount={(count) => (
                    <p className="text-xs text-foreground font-medium ms-2">{count > 3 ? `+${count - 3}` : ""}</p>
                  )}
                >
                  {MurgedUsers && MurgedUsers.map((user, idx) => {
                    return (
                      <FetchUserDataAndRenderAvatar key={idx} userId={user.id} />
                    );
                  })}
                </AvatarGroup>


                <div className='flex items-center gap-2'>

                  <div className='flex items-center'>
                    <lord-icon
                      src="https://cdn.lordicon.com/prjooket.json"
                      colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                      trigger="hover"
                      style={{ width: "20px", height: "20px" }}>
                    </lord-icon>
                    {/* Render the length of the data.attributes.Tags.tags array */}
                    <p className="text-xs text-foreground font-medium">
                      {data && data.attributes && data.attributes.Tags && data.attributes.Tags.tags ? data.attributes.Tags.tags.length : 0}
                    </p>

                  </div>

                  <div className='flex items-center'>

                    <lord-icon
                      src="https://cdn.lordicon.com/rbbnmpcf.json"
                      trigger="hover"
                      colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                      style={{ width: "20px", height: "20px" }}>
                    </lord-icon>
                    <p className="text-xs text-foreground font-medium">10</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
            </div>
          })}</div>) : <div className='italic font-medium pt-8 flex justify-center text-coolGray-400'>
        You currently do not have any public collections
      </div>}

      <div className='text-xl font-medium pt-8'>
        Shared Collections
      </div>
      <Divider className='mt-2' />
      {sharedCollections && sharedCollections.length > 0 ? (
        <div className='grid md:grid-cols-2 gap-8 pt-8 sm:grid-cols-1 lg:grid-cols-3' >

          {sharedCollections && sharedCollections !== null && sharedCollections.map((data, index) => {
            const InvitedUsers = data.attributes && data.attributes.inviteds && data.attributes.inviteds.data.length > 0 ? data.attributes.inviteds.data : [];
            const ViewedUsers = data.attributes && data.attributes.viewed && data.attributes.viewed.data.length > 0 ? data.attributes.viewed.data : [];
            const MurgedUsers = ViewedUsers && ViewedUsers.concat(InvitedUsers && InvitedUsers)
            const colorIndex = data.id % numColors;
            return <div key={index} className='flow gap-8' onClick={() => Navigate(`/collections/${data.id}`)}>
              <Card className="max-w-[340px] min-w-[340px] min-h-[240px] h-full p-2 border border-grey-500 cursor-pointer" shadow='none'>
                <CardHeader className="justify-between flex items-center">
                  <div className="flex gap-5">
                    <Avatar isBordered radius="full" name={data && data.attributes.Name && data.attributes.Name.slice(0, 1).toUpperCase()} size="md" color={Colors[colorIndex]} />
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-600">{data && data.attributes.Name && data.attributes.Name}</h4>
                      <h5 className="text-small tracking-tight text-default-400">updated {timeDifference(data.attributes.createdAt)}</h5>
                    </div>
                  </div>
                  {/* Dropdown */}
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <div className='flex items-center justify-evenly cursor-pointer'>
                        <span className='text-md font-bold text-slate-500' variant='light'>
                          ...
                        </span>
                      </div>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                      <DropdownItem key="edit" onPress={() => EditOpen(data)}>
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
                            trigger="hover"
                            colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                            style={{ width: "16px", height: "16px" }}>
                          </lord-icon>
                          Archive
                        </div>
                      </DropdownItem>
                      <DropdownItem onPress={() => DeleteWarningHandle(data)} key="configurations" className='text-danger' color="danger">
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
                <CardBody className="px-3 py-0 pb-4 text-small flex flex-col justify-between text-default-500">
                  <p className='pb-4'>
                    {data.attributes.Description && StringLimit(data.attributes.Description, 120)}
                  </p>
                  <div className='flex pt-2 gap-3'>

                    {data.attributes.Tags && data.attributes.Tags.tags.slice(0, 3).map((tag, index) => (
                      <Chip key={index} size='sm' color={Colors[colorIndex]} variant='flat'>
                        {tag}
                      </Chip>
                    ))}

                    {/* Render remaining tags count in a tooltip */}
                    {data.attributes.Tags && data.attributes.Tags.tags.length > 3 && (
                      <Tooltip
                        content={
                          <>
                            {data.attributes.Tags.tags.slice(3).map((tag, index) => (
                              <div key={index}>{tag}</div>
                            ))}
                          </>
                        }
                        placement='bottom'
                        size='sm'
                        closeDelay={10}
                      >
                        <Chip size='sm' color={Colors[colorIndex]} variant="solid">
                          + {data.attributes.Tags.tags.length - 3} more
                        </Chip>
                      </Tooltip>
                    )}
                  </div>
                </CardBody>
                <CardFooter className="gap-8 h-12 flex items-center justify-between">
                  <AvatarGroup
                    size='sm'
                    isBordered
                    max={3}
                    total={MurgedUsers.length}
                    renderCount={(count) => (
                      <p className="text-xs text-foreground font-medium ms-2">{count > 3 ? `+${count - 3}` : ""}</p>
                    )}
                  >
                    {MurgedUsers && MurgedUsers.map((user, idx) => {
                      return (
                        <FetchUserDataAndRenderAvatar key={idx} userId={user.id} />
                      );
                    })}
                  </AvatarGroup>

                  <div className='flex items-center gap-2'>

                    <div className='flex items-center'>
                      <lord-icon
                        src="https://cdn.lordicon.com/prjooket.json"
                        colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                        trigger="hover"
                        style={{ width: "20px", height: "20px" }}>
                      </lord-icon>
                      {/* Render the length of the data.attributes.Tags.tags array */}
                      <p className="text-xs text-foreground font-medium">
                        {data && data.attributes && data.attributes.Tags && data.attributes.Tags.tags ? data.attributes.Tags.tags.length : 0}
                      </p>

                    </div>

                    <div className='flex items-center'>

                      <lord-icon
                        src="https://cdn.lordicon.com/rbbnmpcf.json"
                        trigger="hover"
                        colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                        style={{ width: "20px", height: "20px" }}>
                      </lord-icon>
                      <p className="text-xs text-foreground font-medium">10</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          })}</div>) :
        <div className='italic font-medium pt-8 flex justify-center text-coolGray-400'>
          You currently do not have any collections.
        </div>}
      <ModalPopup
        size="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        ModalBodyData={ModalBodyData}
        footer={footerCreate}
      />
      <UpdateCollection
        isWarningOpen={isWarningOpen}
        onWarningOpenChange={onWarningOpenChange}
        SelectCollection={SelectCollection}
        setLoader={setLoader}
      />
      <DeleteModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        deleteData={deleteData}
        setDeleteData={setDeleteData}
        Collectionname={Collectionname}
        setLoader={setLoader}
        DeleteHandler={DeleteHandler}

      />

    </div >
  )
}

export default Collections
