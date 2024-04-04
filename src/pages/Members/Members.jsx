import React, { useEffect, useState } from 'react'
import { User,Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip, Avatar } from "@nextui-org/react";
import { getAllData } from '../../controllers/strapiController';
import Loading from '../../components/Loader/Loading';

const Members = () => {
  const [UserData,setUserData] = useState([]);
  const [Loader,setLoader] = useState(true);
  const Theme=localStorage.getItem("Theme");

  useEffect(()=>{
    setLoader(true)
    getAllData("users")
    .then((data)=>{setLoader(false); setUserData(data)})
    .catch((error)=>console.log(error))
  },[])

  const Colors = [
    'secondary',
    'success',
    'warning',
    'default',
    'danger',
    'primary',
  ]

  const numColors = Colors.length;
 


  return (
    <div>
   {Loader ? <div className={`absolute z-[100]  inset-0 h-screen w-screen ${Theme==="dark"?'bg-black':'bg-slate-50'}`}>
        <Loading />
      </div> : ""}
      <div className='text-3xl font-medium'>Members</div>
      <div className='mt-4 leading-relaxed'>
        Here are the users that are contributing to your space. You can invite other users to your space to contribute to your knowledge base.
      </div>
      <div className='flex mt-4 justify-end'>
        <Button color='danger'>
          Invite users to space
        </Button>
      </div>
      <div className='pt-8'>
        <Table removeWrapper aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Contributions</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>
          <TableBody>
            {UserData&&UserData.length>0?(
              UserData&&UserData.map((user,index)=>{
                const colorIndex =index % numColors;
                return <TableRow key="1">
                <TableCell>
                  <div className='flex flex-row items-center gap-4'>
                  <Avatar src={`${user.Picture&&user.Picture.data!==null?`${process.env.REACT_APP_STRAPI_IP_ADDRESS}${user.Picture.url}`:""}`} 
                  color={Colors[colorIndex]} name={user && user.email && user.email.slice(0, 1).toUpperCase()} size="sm" />
                <div className='flex flex-col '>
                  <p className=''>{user.email&&user.email.split('@')[0]}</p>
                <p className='text-slate-400'>{user.username}</p>
                </div>
              </div>
                </TableCell>
                <TableCell>7</TableCell>
                <TableCell>
                  <Chip variant='flat' color='success'>
                  Active
                  </Chip>
                  </TableCell>
              </TableRow>
              })
            ):""}
          </TableBody>
        </Table>
      </div>

    </div>

  )
}

export default Members