import { Avatar } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { getOneData } from '../../controllers/strapiController';

const FetchUserDataAndRenderAvatar = ({ userId }) => {
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getOneData("users", userId);
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [userId]);


    const Colors = [
        'secondary',
        'success',
        'warning',
        'default',
        'danger',
        'primary',
    ];

    const numColors = Colors.length;
    const colorIndex = userData && userData.id % numColors;

    return userData && userData.Picture ?
        <Avatar size='sm' color={Colors[colorIndex]} src={`${process.env.REACT_APP_STRAPI_IP_ADDRESS}${userData && userData.Picture && userData.Picture.url}`} />
        : <Avatar size='sm' color={Colors[colorIndex]} name={userData && userData.username && userData.username.slice(0, 1) && userData.username.slice(0, 1).toUpperCase()} />;
};

export default FetchUserDataAndRenderAvatar;
