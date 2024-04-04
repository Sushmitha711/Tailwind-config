import { UpdateOneUserData } from "./strapiController";

export const LoginUserGrabJwt = async (email) => {

    const Payload = {
        "identifier": email,
        "password": "JhNOK01mFsaoZh"
    }

    const URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/auth/local/?populate=*`

    const response = await fetch(URL, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Payload),
        redirect: "follow",
        referrerPolicy: "no-referrer"
    })

    let data = response.json();

    return data;
}

export const RegisterUserGrabJwt = async (email,password) => {

    const URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/auth/local/register?populate=*`;

    const payload = {
        email: email,
        password: "JhNOK01mFsaoZh",
        Password2: password,
        username:email,
    }

    const response = await fetch(URL, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-type": "Application/JSOn"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body:JSON.stringify(payload)
    })

    let data = response.json();

    return data
}



export const NavigateSign = async (email) => {
    // Check if user exists.
    let emailExists = false;
    const response = await fetch(
        `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/users/?populate=*&filters[email][$eq]=${email}`,
        {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            redirect: "follow",
            referrerPolicy: "no-referrer",
        }
    )

    const isEmailExist = await response.json();

    if (isEmailExist.length !== 0) {
        emailExists = true;
    }

    let navigate_route;
    const password = "JhNOK01mFsaoZh"

    if (!emailExists) {
        const Signin = await RegisterUserGrabJwt(email, password, 5);
        const login = await LoginUserGrabJwt(email, password);
        sessionStorage.setItem("userData", JSON.stringify(login));
        navigate_route = "/build-knowledge";
    }

    else {
        const login = await LoginUserGrabJwt(email, password);
        console.log("login**++", login)
        sessionStorage.setItem("userData", JSON.stringify(login));
        navigate_route = "/";
    }


    return navigate_route;
}

