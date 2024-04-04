import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Link, Modal, ModalBody, ModalContent, ModalHeader, Textarea, useDisclosure } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import SearchIcon from '../Images/Search';
import SearchModal from './searchModal/SearchModal';
import { StringLimit, getAllData } from '../controllers/strapiController';
import ModalPopup from '../pages/Collections/ModalPopup';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const Header = () => {

    const [value, setValue] = useState("");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isSearchOpen, onOpen: onSearchOpen, onOpenChange: onOpenSearchChange } = useDisclosure();
    const { isOpen: isNotificationOpen, onOpen: onNotificationOpen, onOpenChange: onOpenNotificationChange } = useDisclosure();
    const [InputText, setInputText] = useState('');
    const [IsOpen, setIsOpen] = useState(false);
    const [showResults, setShowResults] = useState(true);
    const collectionName = 'collections';
    const [AllCollections, setAllCollections] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const Navigate = useNavigate();
    const theme=localStorage.getItem("Theme")

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && InputText.trim() !== '') {
            onSearchOpen();
            Navigate(`/search/${InputText}`);
            setInputText('');
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        getAllData(collectionName)
            .then((data) => setAllCollections(data.data))
            .catch((err) => err)
    }, [])

    const HandleChange = (event) => {
        const TextValue = event.target.value;
        setInputText(TextValue);
        const Filterdata = AllCollections && AllCollections.filter((data) => data.attributes && data.attributes.Name.toLowerCase().includes(TextValue.toLowerCase()))
        setSearchResults(Filterdata);
    }

    const resultsRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (resultsRef.current && !resultsRef.current.contains(event.target)) {
                setShowResults(!showResults);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [resultsRef]);

    useEffect(() => {
        setShowResults(true)
    }, [InputText])


    const ModalBodyData = () => {
        return <>
        <ModalHeader className="flex flex-col gap-1">Notification</ModalHeader>
        <ModalBody className='gap-0'></ModalBody>
        </>
    }

    const footerCreate = () => {
        return <></>
    }

    return (
        <div>
            <div className='flex h-[60px] items-center justify-end border-b border-divider px-6'>
                <div className='relative w-full '>
                    <div className='w-full relative'>
                        <Input
                            classNames=""
                            onChange={HandleChange}
                            value={InputText}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    handleKeyPress(event);
                                }
                            }}
                            placeholder='Search by files, tags, content...' className='px-8'
                            startContent={<SearchIcon  className={`text-large text- pointer-events-none flex-shrink-0  ${theme==="dark"?"foreground":"foreground"}`} />}
                        />
                    </div>
                    {InputText !== "" ? <> {showResults && (
                         
                        <div className='transition ease-in-out delay-200 absolute z-50 w-full px-8 pt-2 '>
                            <div ref={resultsRef} className={`rounded-xl border border-slate-300 divide-y divide-slate-300 overflow-y-auto min-h-16 ${theme==="dark"?"bg-black":"bg-slate-50"}`} style={{ maxHeight: "325px" }} >
                                <div className='p-4' onClick={() => { Navigate(`search/${InputText}`); setInputText('') }}>
                                    <p id='File' className='flex flex-row items-center text-foreground gap-2'>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/kkvxgpti.json"
                                            trigger="hover"
                                            colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                                            style={{ width: "20px", height: "20px" }}>
                                        </lord-icon>  Search for "{InputText}"
                                    </p>
                                </div>
                                {searchResults.length > 0 ?
                                    <>
                                        {searchResults && searchResults.map((data, index) => {

                                            const name = data.attributes.Name;
                                            const regex = new RegExp(`(${InputText})`, 'i');
                                            const parts = name.split(regex);
                                            const highlightedIndex = parts.findIndex(part => part.toLowerCase() === InputText.toLowerCase());

                                            return (
                                                <div className='p-4' onClick={() => { Navigate(`search/${data.attributes.Name}`); setInputText('') }}>
                                                    <p id='File' className='flex flex-row items-center gap-1'>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/jkzgajyr.json"
                                                            trigger="hover"
                                                            target="#File"
                                                            colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                                                            style={{ width: "20px", height: "20px", paddingRight: "8px" }}>
                                                        </lord-icon>
                                                        <p>
                                                            {parts.map((part, i) => {
                                                                const NewFormatData = part.endsWith(" ") && `${part} `
                                                                return <span key={i}>
                                                                    {i === highlightedIndex ?
                                                                        <span className='bg-indigo-200'>{part}</span>
                                                                        : <span className='whitespace-nowrap'>{NewFormatData ? (<>{part.trim()}<span className='invisible'>_</span></>) : part}</span>
                                                                    }
                                                                </span>
                                                            })}
                                                        </p>
                                                    </p>
                                                    <p className='text-slate-400 text-sm' >{data.attributes.Description && StringLimit(data.attributes.Description, 250)}</p>
                                                </div>
                                            );
                                        })}</>
                                    : ""
                                }
                            </div>
                        </div>)}</> : ""}
                </div>
                <div className='flex flex-row items-center gap-3  h-14'>
                    <span className='flex h-8 items-center gap-2 rounded-md px-2 text-sm text-grey-black hover:bg-grey-200 active:bg-grey-200 pt-4'>
                        <div className='h-8 rounded-md' onClick={onNotificationOpen} >
                            <lord-icon
                                src="https://cdn.lordicon.com/vspbqszr.json"
                                trigger="hover"
                                colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                                style={{ width: "20px", height: "20px" }}>
                            </lord-icon>
                        </div>
                    </span>
                    <span className='flex h-8 items-center gap-2 rounded-md px-2 text-sm text-foreground hover:bg-grey-200 active:bg-grey-200 pt-4'>
                        <NavLink className='h-8 rounded-md' to="/help">
                            Docs
                        </NavLink>
                    </span>
                </div>
            </div >
            <NextThemesProvider defaultTheme={theme}>
            <Modal
                backdrop="opaque"
                placement="center"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
                className='justify-center -top-24 dark t-120 transform-null text-foreground border rounded-lg border-content4'
                classNames={{
                    body: "py-6",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "text-[#19172c] hidden",
                }}
            >
                <ModalContent className='p-6'>
                    {(onClose) => (
                        <>
                            <div className=''>
                                <Textarea
                                    radius='sm'
                                    className='border rounded-lg z-50 border-content4'
                                    minRows={6}
                                    value={value}
                                    onValueChange={setValue}
                                    placeholder='Ideas to improve this page...' />
                            </div>
                            <div className='flex flex-row items-center pt-4 justify-between'>
                                <p className='text-sm text-grey-300 font-normal'>Need help? <Link className='text-foreground' underline="hover">Contact us</Link> or <Link className='text-foreground' underline="hover"> see docs.</Link> </p>
                                <Button size='sm' color='primaty' className="bg-default-800 font-medium text-sm text-black" isDisabled={value !== '' ? false : true} onClick={onClose}>Send</Button>
                            </div>
                        </>
                    )}
                </ModalContent>
            </Modal>
            </NextThemesProvider>
            <ModalPopup
             size="lg"
             isOpen={isNotificationOpen}
             onOpenChange={onOpenNotificationChange}
             ModalBodyData={ModalBodyData}
             footer={footerCreate}/>
        </div>
    );
}

export default Header;