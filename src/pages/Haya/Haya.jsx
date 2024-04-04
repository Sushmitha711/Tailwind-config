import React, { useEffect, useRef, useState } from 'react';
import { CircularProgress, Input, Image, Button, Card, CardHeader, Divider, CardBody, CardFooter, Link, Table, TableColumn, TableHeader, TableBody, TableRow, TableCell, User, Avatar } from '@nextui-org/react';
import SearchIcon from '../../Images/Search';
import { RightArrow } from '../../Images/RightArrow';
import { dummy_search, search } from '../../controllers/vectordbController';
import HayaTableRender from './HayaTableRender';
import { getOneData } from '../../controllers/strapiController';
import llamauthLogo from "../../Images/haya-logo.png"

const Haya = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [FinalResult, setFinalResult] = useState([]);
  const [UserData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const responseTable = [];
  const ref = useRef(null);
  const UserInfo = JSON.parse(sessionStorage.getItem("userData"));
  const UserId = UserInfo && UserInfo.user.id;
  const theme=localStorage.getItem("Theme");

  function apphend_table(props) {
    responseTable.push(props)
  }

  const Colors = [
    'secondary',
    'success',
    'warning',

    'danger',
    'primary',
  ]

  const numColors = Colors.length;
  const colorIndex = UserId % numColors;

  useEffect(() => {
    getOneData("users", UserId)
      .then((data) => setUserData(data))
      .catch((error) => error)
  }, [])



  const [IndexValue, setIndexvalue] = useState(1);

  const handleKeyPress = async (event, data) => {
    setIndexvalue((previous) => previous + 1)
    ref.current?.scrollIntoView({ behavior: "smooth" });
    if (event.key === 'Enter' && inputValue.trim() !== '') {

      setChatMessages([...chatMessages, inputValue.trim()]);
      const Value = inputValue.trim()
      setInputValue('');
      setLoading(true);

      const searchData = await dummy_search(IndexValue);
      // Scroll to the new question if it's visible
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      if (searchData && searchData.result) {
        setLoading(false);
        setFinalResult([...FinalResult,
        {
          Question: Value,
          response: {
            searchResult: searchData.result,
            similarQuestions: searchData.similar_questions,
            documents: searchData.documents
          }
        }])
      } else {
        console.error('No search results found.');
      }
    } else {
      setChatMessages([...chatMessages, data]);
      const Value = data
      setInputValue('');
      setLoading(true);

      const searchData = await dummy_search(inputValue.trim());
      // Scroll to the new question if it's visible
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      if (searchData && searchData.result) {
        setLoading(false);
        setFinalResult([...FinalResult,
        {
          Question: Value,
          response: {
            searchResult: searchData.result,
            similarQuestions: searchData.similar_questions,
            documents: searchData.documents
          }
        }])
      } else {
        console.error('No search results found.');
      }
    }
  };


  const renderBoldText = (text) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    return text.split(boldRegex).map((part, index) => {
      if (index % 2 === 0) {
        return <span key={index}>{part}</span>;
      } else {
        return <strong key={index}>{part}</strong>;
      }
    });
  };

  const cardClick = (link) => {
    window.open(link, '_blank');
  };


  return (
    <div className='flex flex-col justify-between h-[calc(100vh-130px)] overflow-y-hidden'>
      {chatMessages && chatMessages.length > 0 ? <>
        <div className='overflow-y-auto scroll-smooth'>
          {chatMessages && chatMessages.map((data, index) => {
            const USerProfiled = UserData && UserData.Picture !== null ? `${process.env.REACT_APP_STRAPI_IP_ADDRESS}${UserData && UserData.Picture && UserData.Picture.url}` : "";

            return <>
              <div key={index} className={index === chatMessages.length - 1 ? `mb-2 t-20` : "mb-2"}>
                <div className='flex flex-col'>
                  <div className='flex flex-row gap-4 items-center'>
                    <Avatar size='sm' src={USerProfiled} color={Colors[colorIndex]} name={UserData && UserData.email && UserData.email.slice(0, 1).toUpperCase()} />
                    <p className='font-semibold'>You</p>
                  </div>
                  <p className='pl-12'>{data}</p>
                </div>
              </div>
              <div className='mb-20' ref={index === chatMessages.length - 1 ? ref : null}>
                <div className='flex flex-row gap-4 items-center pt-10'>
                  <Avatar src={llamauthLogo} size="sm" />
                  <p className='font-semibold'>Haya</p>
                </div>
                {FinalResult[index] && FinalResult[index].response &&
                  <>
                    {!FinalResult[index].response.searchResult && FinalResult[index].response.documents.length === 0 && !loading && (
                      <div className="flex justify-center my-4">
                        <h4 className='font-bold'>Interact with your documents</h4>
                      </div>
                    )}

                    {FinalResult[index].response.searchResult && (
                      <div className={`mb-2 ${loading ? '' : 'fade-in'}`}>
                        <div className='flex items-center gap-4'>
                          <Image
                            width={30}
                            alt="Search Icon"
                            src={SearchIcon}
                            className="text-large text-default-400 pointer-events-none flex-shrink-0"
                          />
                          <div>
                            {FinalResult[index].response.searchResult.split('\n').map((part, index) => {
                              const tablepart = part.trim().startsWith('|');
                              if (part.trim().startsWith('-')) {
                                return (
                                  <p key={index} className='leading-loose'>
                                    &bull; {renderBoldText(part.substring(1))}
                                    <br />
                                  </p>
                                );
                              } else if (tablepart) {
                                if (part.trim().includes('----')) {
                                  // Skip the row if it contains '----'
                                } else {
                                  const appendedPart = part.trim() + '\n';
                                  apphend_table(appendedPart);
                                }
                              } else {
                                return (
                                  <p key={index} className='leading-loose'>
                                    {renderBoldText(part)}
                                    <br />
                                  </p>
                                );
                              }
                            })
                            }
                          </div>
                        </div>
                      </div>
                    )}
                    {/* table */}

                    {FinalResult[index].response.documents && FinalResult[index].response.documents.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-2 pt-8 px-4">
                        {FinalResult[index].response.documents.map((document, index) => (
                          <div key={index} onClick={() => cardClick(document.payload.document_url)}>
                            <Card className="max-w-[400px] border border-grey-500" shadow='none'>
                              <CardHeader className="flex gap-3">
                                <Image
                                  alt="NextUI hero Image"
                                  width={40}
                                  height={40}
                                  src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                  radius="sm"
                                />
                                <div className="flex flex-col">
                                  <p className="text-md">{document.payload.document_title}</p>
                                  <p className="text-small text-default-500">{document.payload.document_url}</p>
                                </div>
                              </CardHeader>
                              <Divider />
                              <CardBody className="max-h-[100px] overflow-hidden">
                                <p>{document.payload.description.substring(0, 80)}{document.payload.description.length > 80 && '...'}</p>
                              </CardBody>
                              <Divider />
                              <CardFooter>
                                <Link isExternal showAnchorIcon href={document.payload.document_url}>
                                  Visit source
                                </Link>
                              </CardFooter>
                            </Card>
                          </div>
                        ))}
                      </div>
                    )}
                    {FinalResult[index].response.similarQuestions && FinalResult[index].response.similarQuestions.length > 0 && (
                      <div className="mb-2 pt-8">
                        <p className='font-semibold'>Similar Questions:</p>
                        <div className="flex flex-wrap gap-2 pt-4 pb-3">
                          {FinalResult[index].response.similarQuestions.map((question, index) => (
                            <Button id="SimilarQuestions" onClick={(e) => handleKeyPress(e, question.replace(/^- /, ''))} key={index} size='sm' variant='flat' color='primary'>
                              <lord-icon
                                src="https://cdn.lordicon.com/kkvxgpti.json"
                                trigger="hover"
                                target="#SimilarQuestions"
                                colors="primary:#3080e8"
                                style={{width:"16px",height:"16px"}}>
                              </lord-icon>
                              {question.replace(/^- /, '')}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                }
              </div>
            </>
          })}
          <div></div>
          {loading && (
            <div className="flex justify-center my-4">
              <CircularProgress color="danger" size='lg' aria-label="Loading..." />
            </div>
          )}
        </div>
      </>
        :
        <>

          <div className="flex flex-col gap-4 justify-center items-center h-full">
            <lord-icon
              src="https://cdn.lordicon.com/zyzoecaw.json"
              trigger="hover"
              state="morph-book"
              target="#Knowledges"
              colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
              style={{ width: "32px", height: "32px" }}>
            </lord-icon>
            <p id="Knowledges">Interact with your documents.</p>
          </div>
          {/* Starting Questions  */}
          <div>

          </div>
        </>}
      <div>
        <Input
          startContent={<SearchIcon className="text-large text-default-400 pointer-events-none flex-shrink-0" />}
          endContent={<RightArrow />}
          className=""
          placeholder='Ask me anything...'
          variant='outline'
          value={inputValue}
          onChange={(event) => { setInputValue(event.target.value) }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleKeyPress(event);
            }
          }}
        />
      </div>

    </div>
  );
};

export default Haya;
