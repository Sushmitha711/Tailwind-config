// STRING LIMIT FUNCTION

export const StringLimit = (string, maxLength) => {
    if (string.length > maxLength) {
        return string.substring(0, maxLength - 3) + "..."
    } else {
        return string
    }

}


export const timeDifference = (previous) => {
    const current = new Date();
    const previousDate = new Date(previous);

    const elapsed = current - previousDate;

    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return days + " days ago";
    } else if (hours > 0) {
        return hours + " hours ago";
    } else if (minutes > 0) {
        return minutes + " mins ago";
    } else {
        return "Just now";
    }
}
// POST COLLECTIONS DATA
export const CreateData = async (CollectionName, newData) => {

    const payload = { data: newData }
    const URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/${CollectionName}`

    let jwt;
    if (JSON.parse(sessionStorage.getItem("userData"))) {
        jwt = JSON.parse(sessionStorage.getItem("userData")).jwt;
    } else {
        jwt = "";
    }

    const response = await fetch(URL, {
        method: "POST",
        mode: "cors",
        headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        redirect: "follow",
        referrerPolicy: "no-referrer",
    })

    let data = response.json();
    return data;
}

// UPDATE COLLECTIONS DATA
export const UpdateData = async (CollectionName, id, newData) => {

    const payload = { data: newData }
    const URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/${CollectionName}/${id}`

    let jwt;
    if (JSON.parse(sessionStorage.getItem("userData"))) {
        jwt = JSON.parse(sessionStorage.getItem("userData")).jwt;
    } else {
        jwt = "";
    }

    const response = await fetch(URL, {
        method: "PUT",
        mode: "cors",
        headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        redirect: "follow",
        referrerPolicy: "no-referrer",
    })

    let data = response.json();
    return data;
}


// GET PERTICULAR COLLECTIONS DATA
export const getOneData = async (CollectionName, id) => {

    const URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/${CollectionName}/${id}/?populate=*`

    let jwt;

    if (JSON.parse(sessionStorage.getItem("userData"))) {
        jwt = JSON.parse(sessionStorage.getItem("userData")).jwt;
    } else {
        jwt = "";
    }

    const response = await fetch(URL, {
        method: "GET",
        mode: "cors",
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    })

    let data = response.json();
    return data;
}

export const UpdateOneUserData = async (collectionName, id, newData) => {
    let jwt;

    if (JSON.parse(sessionStorage.getItem("userData"))) {
        jwt = JSON.parse(sessionStorage.getItem("userData")).jwt;
    } else {
        jwt = "";
    }


    const response = await fetch(
        `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/${collectionName}/${id}`,
        {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json", // Specify the content type as JSON
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(newData), // Convert newData to JSON string
        }
    );
    let updatedData = await response.json();
    return updatedData;
};



export const getAllData = async (CollectionName) => {

    const URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/${CollectionName}/?populate=*`

    let jwt;

    if (JSON.parse(sessionStorage.getItem("userData"))) {
        jwt = JSON.parse(sessionStorage.getItem("userData")).jwt;
    } else {
        jwt = "";
    }

    const response = await fetch(URL, {
        method: "GET",
        mode: "cors",
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    })

    let data = response.json();
    return data;
}


export const getUserCollections = async () => {
    let jwt;
    let userid;
    if (JSON.parse(sessionStorage.getItem("userData"))) {
        jwt = JSON.parse(sessionStorage.getItem("userData")).jwt;
        userid = JSON.parse(sessionStorage.getItem("userData")).user.id;
    } else {
        jwt = "";
    }
    const URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/collections/?populate=*&filters[author][$eq]=${userid}`
    const response = await fetch(URL, {
        method: "GET",
        mode: "cors",
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    })
    let data = response.json();
    return data;
}

export const getPublicCollections = async () => {
    let jwt;
    let userid;
    if (JSON.parse(sessionStorage.getItem("userData"))) {
        jwt = JSON.parse(sessionStorage.getItem("userData")).jwt;
        userid = JSON.parse(sessionStorage.getItem("userData")).user.id;
    } else {
        jwt = "";
    }
    const URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/collections/?populate=*&filters[Public][$eq]=true`
    const response = await fetch(URL, {
        method: "GET",
        mode: "cors",
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    })
    let data = response.json();
    return data;
}

// DELETE ATTRIBUTES INSIDE COLLECTIONS
export const DeleteSingleAttribute = async (collectionName, id) => {

    const URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/${collectionName}/${id}`;

    let jwt;
    if (JSON.parse(sessionStorage.getItem("userData"))) {
        jwt = JSON.parse(sessionStorage.getItem("userData")).jwt;
    } else {
        jwt = "";
    }

    const response = await fetch(URL, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        redirect: "follow",
        referrerPolicy: "no-referrer"
    })

    let data = response.json();

    return data;
}

// FILE UPLOAD TO STRAPI 
export const uploadFile = async (file) => {

    const URL=`${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/upload`

    const response= await fetch(URL,{
        method:"POST",
        body:file
    })

    let data=response.json();

    return data;
}