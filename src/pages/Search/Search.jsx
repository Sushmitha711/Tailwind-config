import { Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, Button, Select, SelectItem, Chip, Avatar, Card, CardHeader, Image, Divider, CardBody, CardFooter, Link, Pagination, CheckboxGroup, Checkbox } from '@nextui-org/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { data } from "../Connectors/ConnectorData";
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const author_data = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Tech Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Sr. Dev",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "C.M.",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "S. Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
    email: "kristen.cooper@example.com",
  },
  {
    id: 6,
    name: "Brian Kim",
    role: "P. Manager",
    team: "Management",
    age: "29",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/3.png",
    email: "brian.kim@example.com",
    status: "Active",
  },
  {
    id: 7,
    name: "Michael Hunt",
    role: "Designer",
    team: "Design",
    status: "paused",
    age: "27",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
    email: "michael.hunt@example.com",
  },
  {
    id: 8,
    name: "Samantha Brooks",
    role: "HR Manager",
    team: "HR",
    status: "active",
    age: "31",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/4.png",
    email: "samantha.brooks@example.com",
  },
  {
    id: 9,
    name: "Frank Harrison",
    role: "F. Manager",
    team: "Finance",
    status: "vacation",
    age: "33",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/5.png",
    email: "frank.harrison@example.com",
  },
  {
    id: 10,
    name: "Emma Adams",
    role: "Ops Manager",
    team: "Operations",
    status: "active",
    age: "35",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/5.png",
    email: "emma.adams@example.com",
  },
  {
    id: 11,
    name: "Brandon Stevens",
    role: "Jr. Dev",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/7.png",
    email: "brandon.stevens@example.com",
  },
  {
    id: 12,
    name: "Megan Richards",
    role: "P. Manager",
    team: "Product",
    status: "paused",
    age: "28",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/7.png",
    email: "megan.richards@example.com",
  },
  {
    id: 13,
    name: "Oliver Scott",
    role: "S. Manager",
    team: "Security",
    status: "active",
    age: "37",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/8.png",
    email: "oliver.scott@example.com",
  },
  {
    id: 14,
    name: "Grace Allen",
    role: "M. Specialist",
    team: "Marketing",
    status: "active",
    age: "30",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/8.png",
    email: "grace.allen@example.com",
  },
  {
    id: 15,
    name: "Noah Carter",
    role: "IT Specialist",
    team: "I. Technology",
    status: "paused",
    age: "31",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/9.png",
    email: "noah.carter@example.com",
  },
  {
    id: 16,
    name: "Ava Perez",
    role: "Manager",
    team: "Sales",
    status: "active",
    age: "29",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/9.png",
    email: "ava.perez@example.com",
  },
  {
    id: 17,
    name: "Liam Johnson",
    role: "Data Analyst",
    team: "Analysis",
    status: "active",
    age: "28",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/11.png",
    email: "liam.johnson@example.com",
  },
  {
    id: 18,
    name: "Sophia Taylor",
    role: "QA Analyst",
    team: "Testing",
    status: "active",
    age: "27",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/11.png",
    email: "sophia.taylor@example.com",
  },
  {
    id: 19,
    name: "Lucas Harris",
    role: "Administrator",
    team: "Information Technology",
    status: "paused",
    age: "32",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/12.png",
    email: "lucas.harris@example.com",
  },
  {
    id: 20,
    name: "Mia Robinson",
    role: "Coordinator",
    team: "Operations",
    status: "active",
    age: "26",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/12.png",
    email: "mia.robinson@example.com",
  },
];

const Search = () => {
  const params = useParams();
  const theme=localStorage.getItem("Theme");

  return (
    <div>
      <div className='flex gap-8 items-center'>
         <NextThemesProvider defaultTheme={theme}>
        <Select
          items={author_data}
          placeholder="Time Range"
          startContent={
            <lord-icon
              src="https://cdn.lordicon.com/wmlleaaf.json"
              colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
              style={{ width: "20px", height: "20px" }}>
            </lord-icon>
          }
          classNames={{
            base: "max-w-44"
          }}
        >
          
          <SelectItem>Today</SelectItem>
          <SelectItem>Past 3 days</SelectItem>
          <SelectItem>Past Week</SelectItem>
          <SelectItem>Past Month</SelectItem>
          <SelectItem>Past 3 months</SelectItem>
          <SelectItem>All time</SelectItem>
        </Select>
          </NextThemesProvider>

        <Select
          items={author_data}
          placeholder="Select authors"
          selectionMode="multiple"
          startContent={
            <lord-icon
              src="https://cdn.lordicon.com/hrjifpbq.json"
              colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
              style={{ width: "20px", height: "20px" }}>

            </lord-icon>
          }
          classNames={{
            base: "max-w-44"
          }}
        >

          {(user) => (
            <SelectItem key={user.id} textValue={user.name}>
              <div className="flex gap-2 items-center">
                <Avatar alt={user.name} className="flex-shrink-0" size="sm" src={user.avatar} />
                <div className="flex flex-col">
                  <span className="text-small">{user.name}</span>
                  <span className="text-tiny text-default-400">{user.email}</span>
                </div>
              </div>
            </SelectItem>
          )}
        </Select>
        <Select

          placeholder="Collections"
          startContent={
            <lord-icon
              src="https://cdn.lordicon.com/zyzoecaw.json"
              colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
              style={{ width: "20px", height: "20px" }}>
            </lord-icon>
          }
          classNames={{
            base: "max-w-44"
          }}
        >
          <SelectItem>Today</SelectItem>
          <SelectItem>Past 3 days</SelectItem>
          <SelectItem>Past Week</SelectItem>
          <SelectItem>Past Month</SelectItem>
          <SelectItem>Past 3 months</SelectItem>
          <SelectItem>All time</SelectItem>

        </Select>
        <Select
          items={data}
          placeholder="Select sources"
          selectionMode="multiple"
          classNames={{
            base: "max-w-44"
          }}
          startContent={
            <lord-icon
              src="https://cdn.lordicon.com/jkzgajyr.json"
              trigger="hover"
              colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
              style={{ width: "20px", height: "20px" }}>
            </lord-icon>
          }
        >

          {data.map((data) => (
            <SelectItem key={data.value} textValue={data.label}
            >
              <div className='flex gap-2 items-center'>

                <Avatar alt={data.name} className="flex-shrink-0" size="sm" src={data.avatar} />
                {data.label}
              </div>
            </SelectItem>
          ))}

        </Select>
        <Button variant='flat'
        >
          <lord-icon
            src="https://cdn.lordicon.com/vuiggmtc.json"
            trigger="hover"
            colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
            style={{ width: "20px", height: "20px" }}>
          </lord-icon>
          My History
        </Button>
      </div>
      <div className='mt-8 flex justify-between'>
        <p>Searched results: "{params._params}"</p>
        <p className="text-md">Found 31 Results</p>

      </div>

      <div className='flex items-start justify-between'>
        {/* Search Result Cards */}
        <div className='mt-8'>
          <Card className='w-[900px] card-color border border-grey-500' shadow='none'>
            <CardHeader className="flex gap-3 justify-between px-4">
              <div className='flex gap-2'>
                <lord-icon
                  src="https://cdn.lordicon.com/jkzgajyr.json"
                  trigger="hover"
                  target="#Collections"
                  state="morph-home-2"
                  colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                  style={{ width: "32px", height: "32px" }}>
                </lord-icon>
                <div className='flex flex-col'>
                  <p className="text-md">Regression Resources</p>
                  <p className="text-small text-default-500">Regression</p>

                </div>
              </div>

              <div>

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
              </div>

            </CardHeader>
            <Divider />
            <CardBody className='px-4'>
              <p>Make beautiful websites regardless of your design experience.</p>
            </CardBody>

            <CardFooter className='px-4'>
              <div className='flex gap-4'>
                <Chip size='sm' color='primary' variant='flat'>

                  TimeGPT
                </Chip>
                <Chip size='sm' color='secondary' variant='flat'>

                  Regression
                </Chip>
                <Chip size='sm' color='warning' variant='flat'>
                  Forecasting
                </Chip>
                <Chip size='sm' color='danger' variant='flat'>
                  +4 more
                </Chip>
              </div>
            </CardFooter>
          </Card>
          <div className='pt-8'>
            <Card className='w-[900px] card-color border border-grey-500' shadow='none'>
              <CardHeader className="flex gap-3 justify-between px-4">
                <div className='flex gap-2'>
                  <lord-icon
                    src="https://cdn.lordicon.com/jkzgajyr.json"
                    trigger="hover"
                    target="#Collections"
                    state="morph-home-2"
                    colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                    style={{ width: "32px", height: "32px" }}>
                  </lord-icon>
                  <div className='flex flex-col'>

                    <p className="text-md">Testing124</p>
                    <p className="text-small text-default-500">Collection</p>

                  </div>
                </div>

                <div>

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
                </div>

              </CardHeader>
              <Divider />
              <CardBody className='px-4'>
                <p>Make beautiful websites regardless of your design experience.</p>
              </CardBody>

              <CardFooter className='px-4'>
                <div className='flex gap-4'>
                  <Chip size='sm' color='success' variant='flat'>
                    VectorDBs
                  </Chip>
                  <Chip size='sm' color='warning' variant='flat'>
                    Qdrant
                  </Chip>
                  <Chip size='sm' color='primary' variant='flat'>
                    Forecasting
                  </Chip>
                </div>
              </CardFooter>
            </Card>

          </div>


          <div className='pt-8'>
            <Card className='w-[900px] card-color border border-grey-500' shadow='none'>
              <CardHeader className="flex gap-3 justify-between px-4">
                <div className='flex gap-2'>
                  <lord-icon
                    src="https://cdn.lordicon.com/jkzgajyr.json"
                    trigger="hover"
                    target="#Collections"
                    state="morph-home-2"
                    colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                    style={{ width: "32px", height: "32px" }}>
                  </lord-icon>
                  <div className='flex flex-col'>

                    <p className="text-md">TimeGPT Keynote</p>
                    <p className="text-small text-default-500">Slides</p>

                  </div>
                </div>

                <div>

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
                </div>

              </CardHeader>
              <Divider />
              <CardBody className='px-4'>
                <p>Make beautiful websites regardless of your design experience.</p>
              </CardBody>

              <CardFooter className='px-4'>
                <div className='flex gap-4'>
                  <Chip size='sm' color='success' variant='flat'>
                    LLMs
                  </Chip>
                  <Chip size='sm' color='primary' variant='flat'>
                    Langchain
                  </Chip>
                  <Chip size='sm' color='danger' variant='flat'>
                    TimeGPT
                  </Chip>
                </div>
              </CardFooter>
            </Card>

          </div>

          <div className='pt-8'>
            <Card className='w-[900px] card-color border border-grey-500' shadow='none'>
              <CardHeader className="flex gap-3 justify-between px-4">
                <div className='flex gap-2'>
                  <lord-icon
                    src="https://cdn.lordicon.com/jkzgajyr.json"
                    trigger="hover"
                    target="#Collections"
                    state="morph-home-2"
                    colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                    style={{ width: "32px", height: "32px" }}>
                  </lord-icon>
                  <div className='flex flex-col'>
                    <p className="text-md">TimeGPT</p>
                    <p className="text-small text-default-500">PDF</p>
                  </div>
                </div>

                <div>

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
                </div>

              </CardHeader>
              <Divider />
              <CardBody className='px-4'>
                <p>Make beautiful websites regardless of your design experience.</p>
              </CardBody>

              <CardFooter className='px-4'>
                <div className='flex gap-4'>
                  <Chip size='sm' color='danger' variant='flat'>
                    Test
                  </Chip>
                  <Chip size='sm' color='secondary' variant='flat'>
                    Qdrant
                  </Chip>
                  <Chip size='sm' color='warning' variant='flat'>
                    Forecasting
                  </Chip>
                </div>
              </CardFooter>
            </Card>

          </div>
          <div className='mt-8 flex items-center justify-center'>
            <Pagination loop showControls color="secondary" total={5} initialPage={1} />
          </div>
        </div>
        <div>
        </div>
        {/* Filter */}
        <div className='mt-8'>
          <Card className="max-w-[200px] card-color border border-grey-500" shadow='none'>
            <CardHeader className="flex gap-3 ">
              <lord-icon
                src="https://cdn.lordicon.com/prjooket.json"
                trigger="hover"
                target="#Tags"
                state="morph-home-2"
                colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                style={{ width: "24px", height: "24px" }}>
              </lord-icon>
              <div>
                <div className='text-lg'>Tags</div>
              </div>
            </CardHeader>

            <CardBody className=' p-8'>
              <CheckboxGroup
              >
                <Checkbox color='danger' value="buenos-aires">TimeGPT</Checkbox>
                <Checkbox color='danger' value="sydney">Regression</Checkbox>
                <Checkbox color='danger' value="san-francisco">Forecasting</Checkbox>
                <Checkbox color='danger' value="london">VectorDBs</Checkbox>
                <Checkbox color='danger' value="tokyo">Test</Checkbox>
              </CheckboxGroup>
            </CardBody>

          </Card>
        </div>
      </div >


    </div >
  )
}

export default Search;