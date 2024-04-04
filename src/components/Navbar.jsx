import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

import Header from './Header';
import { Avatar, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Divider, Image, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, User, useDisclosure, Textarea, NextUIProvider } from '@nextui-org/react';
import Continue from '../Images/Continue';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import llamauthLogo from "../Images/haya-logo.png"
import { getOneData } from '../controllers/strapiController';
const Navbar = () => {
  const [IsActive, setActive] = useState(false);
  const [UserDetails, setUserDetails] = useState(null);
  const JWT_Testing = JSON.parse(sessionStorage.getItem("userData"));
  const [Theme,setTheme]=useState(() => localStorage.getItem('theme') || 'light');
  const [ThemeSelecter,setThemeSelecter]=useState(false);
  const email = JWT_Testing && JWT_Testing.user.email;
  const truncatedEmail = email && email.length > 17 ? `${email.slice(0, 17)}...` : email;
  const Location = useLocation();
  const Navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const URLPath = Location.pathname.split("/");
  // const theme=localStorage.getItem("Theme");

  useEffect(() => {
    if (JWT_Testing === null) {
      Navigate('/sign-in');
    }
  }, [Navigate])

  const ThemeHandler = () => {
    const newTheme = Theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('Theme', newTheme);
    window.location.reload();
  };



  useEffect(() => {
    const storedTheme = localStorage.getItem('Theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    getOneData("users", JWT_Testing && JWT_Testing.user.id)
      .then((data) => setUserDetails(data))
      .catch((error) => error)
  }, [])

  console.log("Theme+++++++++",Theme)


  const Colors = [
    'secondary',
    'success',
    'warning',
    'danger',
    'primary',
  ]

  const numColors = Colors.length;
  const colorIndex = UserDetails && UserDetails.id % numColors;
  const theme=localStorage.getItem("Theme");

  const NavItems = [
    {
      icon: <lord-icon
        src="https://cdn.lordicon.com/zyzoecaw.json"
        trigger="hover"
        state="morph-book"
        target="#Knowledge"
        colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
        style={{ width: "16px", height: "16px" }}>
      </lord-icon>,
      title: "Knowledge Base",
      path: "/",
      id: "Knowledge"
    },
    {
      icon: <lord-icon
        src="https://cdn.lordicon.com/jkzgajyr.json"
        trigger="hover"
        target="#Collections"
        state="morph-home-2"
        colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
        style={{ width: "16px", height: "16px" }}>
      </lord-icon>,
      title: "Collections",
      path: "/collections",
      id: "Collections"
    },
    {
      icon: <lord-icon
        src="https://cdn.lordicon.com/jzjtyyqx.json"
        trigger="hover"
        target="#Connectors"
        state="morph-home-2"
        colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
        style={{ width: "16px", height: "16px" }}>
      </lord-icon>,
      title: "Connectors",
      path: "/connectors",
      id: "Connectors"
    },

    {
      icon: <lord-icon
        src="https://cdn.lordicon.com/prjooket.json"
        trigger="hover"
        target="#Tags"
        state="morph-home-2"
        colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
        style={{ width: "16px", height: "16px" }}>
      </lord-icon>,
      title: "Tags",
      path: "/tags",
      id: "Tags"
    }
  ]
  const nav2 = [
    {
      icon: <lord-icon
        src="https://cdn.lordicon.com/fdxqrdfe.json"
        trigger="hover"
        target="#Haya"
        state="morph-home-2"
        colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
        style={{ width: "16px", height: "16px" }}>
      </lord-icon>,
      title: "Haya",
      path: "/haya",
      id: "Haya"
    },
    {
      icon: <lord-icon
        src="https://cdn.lordicon.com/ercyvufy.json"
        trigger="hover"
        target="#Knowledge-tree"
        state="morph-home-2"
        colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
        style={{ width: "16px", height: "16px" }}>
      </lord-icon>,
      title: "Knowledge Tree",
      path: "/knowledge-tree",
      id: "Knowledge-tree"
    },
    {
      icon: <lord-icon
        src="https://cdn.lordicon.com/jfwzwlls.json"
        trigger="hover"
        target="#Analytics"
        state="morph-home-2"
        colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
        style={{ width: "16px", height: "16px" }}>
      </lord-icon>,
      title: "Analytics",
      path: "/analytics",
      id: "Analytics"
    },
  ]

  const nav3 = [
    {
      icon: <lord-icon
        src="https://cdn.lordicon.com/kthelypq.json"
        trigger="hover"
        target="#members"
        state="morph-home-2"
        colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
        style={{ width: "16px", height: "16px" }}>
      </lord-icon>,
      title: "Members",
      path: "/members",
      id: "members"
    },
    {
      icon: <lord-icon
        src="https://cdn.lordicon.com/vuiggmtc.json"
        trigger="hover"
        target="#Archive"
        state="morph-home-2"
        colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
        style={{ width: "16px", height: "16px" }}>
      </lord-icon>,
      title: "Archive",
      path: "/archive",
      id: "Archive"
    },
    {
      icon: <lord-icon
        src="https://cdn.lordicon.com/wpyrrmcq.json"
        trigger="hover"
        target="#trash"
        state="morph-home-2"
        colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
        style={{ width: "16px", height: "16px" }}>
      </lord-icon>,
      title: "Trash",
      path: "/trash",
      id: "trash"
    },
    {
      icon: <lord-icon
        src="https://cdn.lordicon.com/hqymfzvj.json"
        trigger="hover"
        target="#playground"
        state="hover"
        colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
        style={{ width: "16px", height: "16px" }}>
      </lord-icon>,
      title: "Playground",
      path: "/playground",
      id: "playground"
    },

    {
      icon: <lord-icon
        src="https://cdn.lordicon.com/lecprnjb.json"
        trigger="hover"
        target="#settings"
        state="morph-home-2"
        colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
        style={{ width: "16px", height: "16px" }}>
      </lord-icon>,
      title: "Settings",
      path: "/settings",
      id: "settings"
    }
  ]

  return (
    <div className='flex flex-row w-full'>
      <nav>
        <div className='flex flex-col justify-between w-64 dark:bg-root h-screen flex-shrink-0 border-r border-divider bg-inherit px-4 dark:border-gray-600 md:flex'>
          <div>
          <NextUIProvider>
          
            <Dropdown placement='bottom-start'>
              <DropdownTrigger>
                <div className='flex items-center h-14 pt-4 gap-2 cursor-pointer'>
                  <Image
                    width={30}
                    alt="NextUI hero Image"
                    src={llamauthLogo}
                  />
                  <a className='font-bold'>Haya Knowledge</a>
                </div>
              </DropdownTrigger>
              <NextThemesProvider defaultTheme={theme}>
              <DropdownMenu className='-mx-4'>
                <DropdownItem variant='light'>
                  <p className='text-slate-400 cursor-default'>Switch to...</p>
                </DropdownItem>
                <DropdownItem variant='faded'>
                  {email && email}
                </DropdownItem>
                <DropdownItem variant='faded' className='mb-2'>
                  Playbook Community
                </DropdownItem>
                <DropdownItem className='px-0 py-0'>
                  <Button size='sm' className='bg-gray-dark text-slate-50 w-full'>
                    Create new Playbook
                  </Button>
                </DropdownItem>
              </DropdownMenu>
            </NextThemesProvider>
            </Dropdown>
            </NextUIProvider>
            <nav className='mt-6 flex-1'>
              <ul className='flex flex-col gap-1'>
                {NavItems && NavItems.map((data, index) => {
                  const Verified = `/${URLPath[1]}` === data.path
                  return <li>
                    <NavLink className=' rounded-md' to={data.path} id={data.id}>
                      <span className={`flex p-1  items-center gap-2 rounded-md px-2 text-md hover:bg-grey-200 hover:text-foreground ${Verified ? 'text-foreground bg-grey-200 ' : 'light:text-black dark:text-slate-50'
                        }`}>
                        <div>{data.icon}</div>
                        {data.title}
                      </span>
                    </NavLink>
                  </li>
                })}
              </ul>
            </nav>
          </div>
          <Divider className='mt-8' />
          <nav className='mt-6 flex-1'>
            <ul className='flex flex-col gap-1'>
              {nav2 && nav2.map((data, index) => {
                const Verified = `/${URLPath[1]}` === data.path
                return <li>
                  <NavLink className=' rounded-md' to={data.path} id={data.id}>
                    <span className={`flex p-1 items-center gap-2 rounded-md px-2 text-md hover:bg-grey-200 hover:text-foreground ${Verified ? 'text-foreground bg-grey-200 ' : 'light:text-black dark:text-slate-50'
                      }`}>
                      <div >{data.icon}</div>
                      {data.title}
                    </span>
                  </NavLink>
                </li>
              })}
            </ul>
          </nav>

          <Divider className='mt-8' />
          <nav className='mt-6 mb-4 flex-1'>
            <ul className='flex flex-col gap-1'>
              {nav3 && nav3.map((data, index) => {
                const Verified = `/${URLPath[1]}` === data.path
                return <li>
                  <NavLink className=' rounded-md' to={data.path} id={data.id}>
                    <span className={`flex p-1 items-center gap-2 rounded-md px-2 text-md hover:bg-grey-200 hover:text-foreground ${Verified ? 'text-foreground bg-grey-200 ' : 'light:text-black dark:text-slate-50'
                      }`}>
                      <div className='opacity-80' >{data.icon}</div>
                      {data.title}
                    </span>
                  </NavLink>
                </li>
              })}
            </ul>
          </nav>

          {/* ..... */}
         
            <Dropdown
              // showArrow
              radius="sm"
              size='lg'
              classNames={{
                base: "before:bg-default-200", // change arrow background
                content: "p-0 border-small border-divider bg-background",
              }}
            >
              <DropdownTrigger>
                <div className='flex items-center pb-4 justify-evenly cursor-pointer'>
                  <Avatar className='h-6 w-6' color={Colors[colorIndex]} name={UserDetails && UserDetails.email && UserDetails.email.toUpperCase().slice(0, 1)} src={UserDetails && UserDetails.Picture !== null && `${process.env.REACT_APP_STRAPI_IP_ADDRESS}${UserDetails && UserDetails.Picture && UserDetails.Picture.url}`} isBordered />
                  <span className='text-xs font-bold'>{truncatedEmail}</span>
                  <Continue />
                </div>
              </DropdownTrigger>
              <NextThemesProvider defaultTheme={theme}>
              <DropdownMenu
                aria-label="Custom item styles"
                className="p-2 -mb-1"
                itemClasses={{
                  base: [
                    "rounded-md",
                    "text-default-500",
                    "transition-opacity",
                    "data-[hover=true]:text-foreground",
                    "data-[hover=true]:bg-default-100",
                    "dark:data-[hover=true]:bg-default-50",
                    "data-[selectable=true]:focus:bg-default-50",
                    "data-[pressed=true]:opacity-70",
                    "data-[focus-visible=true]:ring-default-500",
                  ],
                }}
              >
                <DropdownSection aria-label="Profile & Actions">
                  <DropdownItem
                  onClick={ThemeHandler}
                    id='dashboard'
                    shortcut="M"
                    startContent={<lord-icon
                      src="https://cdn.lordicon.com/ktsahwvc.json"
                      trigger="hover"
                      target="#dashboard"
                      colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                      style={{ width: "20px", height: "20px" }}>
                    </lord-icon>} key="dashboard">
                    <span className='font-bold'  > Toggle theme &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </DropdownItem>
                  <DropdownItem
                    id='Onboarding'
                    onPress={onOpen}
                    startContent={<lord-icon
                      src="https://cdn.lordicon.com/zrtfxghu.json"
                      trigger="hover"
                      target="#Onboarding"
                      colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                      style={{ width: "20px", height: "20px" }}>
                    </lord-icon>}>
                    <span className='font-bold'> Feedback </span>
                  </DropdownItem>

                  <DropdownItem
                    id='Profile'
                    onClick={() => Navigate("/profile")}
                    key="settings"
                    startContent={<lord-icon
                      src="https://cdn.lordicon.com/kthelypq.json"
                      trigger="hover"
                      target="#Profile"
                      colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                      style={{ width: "20px", height: "20px" }}>
                    </lord-icon>}
                  >
                    <span className='font-bold'  >Profile</span>
                  </DropdownItem>
                  <DropdownItem
                    id='Logout'
                    onClick={() => { sessionStorage.removeItem("userData"); Navigate("/sign-in") }}
                    startContent={<lord-icon
                      src="https://cdn.lordicon.com/vduvxizq.json"
                      trigger="hover"
                      target="#Logout"
                      colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                      style={{ width: "20px", height: "20px" }}>
                    </lord-icon>}>
                    <span className='font-bold' >Logout</span>
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
          </NextThemesProvider>
            </Dropdown>
        </div>
      </nav>
      <div className='w-full flex flex-col'>
        <Header />
        <div className='h-[calc(100vh-60px)] overflow-auto '>
          <div className='flex flex-col gap-2 mx-auto max-w-6xl py-8'>
            <Outlet />
          </div>
        </div>
      </div>
      <NextThemesProvider defaultTheme={Theme}>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Feedback</ModalHeader>
              <ModalBody className='gap-0'>
                <p>We value your input!</p>
                <p>Whether it's a suggestion for improvement, a bug you've encountered, or simply your thoughts on how we can make our product better, we're all ears.</p>
                <Textarea
                  autoFocus
                  isRequired
                  label="Share your feedback"
                  variant='faded'
                  minRows={10}
                  className='pt-16'
                  labelPlacement='outside'
                />
              </ModalBody>
              {/* Your buttons for submitting or canceling feedback can go here */}


              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={onClose}>
                  Submit Feedback
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

export default Navbar