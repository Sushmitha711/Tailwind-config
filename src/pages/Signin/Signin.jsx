import React, { useEffect, useState } from 'react';
import { Button, Divider, Image, Input, Link, useNavbar } from "@nextui-org/react"
import { LeftArrow } from "../../Images/LeftArrow";
import { EyeSlashFilledIcon } from '../../Images/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../../Images/EyeFilledIcon';
import RightArrow from '../../Images/RightArrow.jsx';
import Github from "../../Images/Github.jsx";
import Google from '../../Images/Google.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllData } from '../../controllers/strapiController.js';
import { LoginUserGrabJwt, NavigateSign } from '../../controllers/loginController.js';
import { useNavigate } from 'react-router';
import Loading from '../../components/Loader/Loading.jsx';


const Signin = () => {

  const [isVisible, setIsVisible] = React.useState(false);
  const [Users, setUsers] = useState(null);
  const Navigate = useNavigate();
  const [ValidationConditions, setValidationConditions] = useState(false);
  const [Loader,setLoader]=useState(false);
  const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const Theme=localStorage.getItem("Theme");
  const [LoginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });
  const [LoginError, setLoginError] = useState({
    emailError: '',
    passwordError: '',
    FinalError: ''
  });

  useEffect(() => {
    getAllData('users')
      .then((data) => setUsers(data))
      .catch((error) => console.log(error))
  }, [])

  const theme=localStorage.getItem("Theme")

  const EmailExist = Users && Users.filter((data) => data.email === LoginDetails.email.toLowerCase().trim());
  const ComparedPassword = EmailExist && EmailExist[0] && EmailExist[0].Password2 !== LoginDetails.password

  const Validation=()=>{
    let IsValid=true;

    if(LoginDetails.email===''){
      IsValid=false;
      setLoginError((previous)=>({...previous,emailError:"Email is required."}));
    } else if(!EmailRegex.test(LoginDetails.email)){
      IsValid=false;
      setLoginError((previous)=>({...previous, emailError:"Enter valid email format."}));
    }else{
      setLoginError((previous)=>({...previous, emailError:''}));
    }

    if(LoginDetails.password===''){
      IsValid=false;
      setLoginError((previous)=>({...previous, passwordError:"Password is required."}));
    }else{
      setLoginError((previous)=>({...previous, passwordError:null}));
    }
    if(EmailExist&&EmailExist[0]&&EmailExist[0].Password2!==LoginDetails.password){
      IsValid=false;
      setLoginError((previous)=>({...previous, passwordError:"Password didn't match." }));
      setLoginError((previous)=>({...previous, FinalError:null}));
    }

    return IsValid;
  }




  const SubmitHandler = async () => {
    setLoader(true)
    const Validate = Validation();
    if (Validate) {
      setValidationConditions(false);
      const navigate_route = await NavigateSign(LoginDetails.email);
      if (navigate_route && navigate_route) {
        setLoader(false);
        Navigate(navigate_route);
      } else {
        console.log(navigate_route);
        setLoader(false);
      }

    } else {
      setValidationConditions(true)
      setLoader(false);
    }
  }

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
   {Loader ? <div className={`absolute z-[100]  inset-0 h-screen w-screen ${Theme==="dark"?'bg-black':'bg-slate-50'}`}>
        <Loading />
      </div> : ""}

    <div className="flex h-screen items-center justify-center">
      <main className='mx-auto min-h-[590px] w-full max-w-[450px]'>
        <Image
          width={50}
          alt="NextUI hero Image"
          src="Assets/haya-logo.png"
        />
        <h1 className='mb-1.5 mt-8 sm:text-left text-2xl tracking-[-0.16px] text-slate-12 font-bold '>
          Sign in to Haya Knowledge
        </h1>
        <p className='pb-8 sm:text-left text-base text-slate-11 font-normal'>
        </p>
        <form data-gtm-form-interact-id="0">
          {LoginError.FinalError ? <p className='sm:text-left text-base text-slate-11 font-normal'>
            {LoginError.FinalError}
          </p> : ''}
          <div className='mb-4 space-y-2'>
            <Input
              radius="sm"
              className='border-slate-6'
              isInvalid={ValidationConditions && (LoginDetails.email === '' || !EmailRegex.test(LoginDetails.email)) && LoginDetails.email !== null ? ValidationConditions && (LoginDetails.email === '' || !EmailRegex.test(LoginDetails.email)) : ""}
              errorMessage={ValidationConditions && (LoginDetails.email === '' || !EmailRegex.test(LoginDetails.email)) && LoginDetails.email !== null ? LoginError.emailError : ''}
              key={"outside"}
              type="email"
              label="Email"
              variant={"faded"}
              onChange={(e) => setLoginDetails({ ...LoginDetails, email: e.target.value })}
              labelPlacement={"outside"}
              placeholder="Enter your email"
            />
          </div>
          <div className='mb-4 space-y-2'>
            <Input
              radius="sm"
              className='py-4'
              variant={"faded"}
              onChange={(e) => setLoginDetails({ ...LoginDetails, password: e.target.value })}
              isInvalid={ValidationConditions && (LoginDetails.password === '' || ComparedPassword) ? ValidationConditions && (LoginDetails.password === '' || ComparedPassword) : ""}
              errorMessage={ValidationConditions && (LoginDetails.password === '' || ComparedPassword) ? LoginError.passwordError : ''}
              label={<div className='flex justify-between ' style={{ width: "442px" }}>
                <span>Password</span>
                <span>Forgot password</span>
              </div>}
              labelPlacement={"outside"}
              placeholder="Enter your password"
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
          </div>
          <Button id='CreateAccount' radius="sm" onClick={SubmitHandler} className={`w-full gap-1 lt-500 text-slate-50 ${theme === 'dark' ? 'bg-slate-50 text-slate-800' : 'bg-slate-800'}`}>
            Sign In
            <lord-icon
              src="https://cdn.lordicon.com/vduvxizq.json"
              trigger="hover"
              target="#CreateAccount"
              style={{ width: "18px", height: "20px", color:theme === 'dark' ? '#ffffff' : '#000000' }}>
                
            </lord-icon>
          </Button>

          <div className='mb-6 mt-6 flex items-center justify-center'>
            <Divider className="my-2" style={{ maxWidth: "44%" }} />
            <span className='text-small text-default-400 px-4'>OR</span>
            <Divider className="my-2" style={{ maxWidth: "44%" }} /></div>
        </form>

        <div className='flex w-full flex-row flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <Button radius="sm" variant={"faded"} className='flex gap-1' style={{ width: "48%" }}>
            <div className='flex items-center gap-2'>
              <Github />
              Login with GitHub
            </div>
          </Button>
          <Button radius="sm" variant={"faded"} className='flex w-1/2 gap-1 bg' style={{ width: "48%" }}>
            <Google />Login with Google
          </Button>
        </div>
        <p className='text-small text-default-400 mt-8'>
          By signing in, you agree to our {" "}
          <Link href="#" size='sm'>Terms of Service </Link>
          {" "}and {" "}
          <Link href="#" size='sm'>Privacy Policy </Link>.
        </p>
      </main>
    </div>
    </>
  )
}

export default Signin;