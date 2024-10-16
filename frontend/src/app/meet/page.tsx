'use client';
import React, { useEffect, useState } from 'react';
import { JaaSMeeting, JitsiMeeting } from '@jitsi/react-sdk';
import { getCookie } from 'cookies-next';
import { Spin } from 'antd';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const App = () => {
    const [jwtToken, setJwtToken] = useState<string | null>(null);
    const dataUser = useTypedSelector((state) => state.user);
    // Lấy JWT từ cookie
    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            setJwtToken(token as string);
        }
    }, []);

    // Kiểm tra xem JWT đã được lấy chưa
    if (!jwtToken) {
        return <p>Loading...</p>;
    }

    return (
        <JitsiMeeting
    
    roomName = "jikvhhv"
    configOverwrite = {{
        startWithAudioMuted: true,
        disableModeratorIndicator: true,
        startScreenSharing: true,
        enableEmailInStats: false
    }}
    interfaceConfigOverwrite = {{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
    }}
    userInfo = {{
        displayName: dataUser.name || '',
        email:dataUser.email || ''
    }}
    onApiReady = { (externalApi) => {
        // here you can attach custom event listeners to the Jitsi Meet External API
        // you can also store it locally to execute commands
    } }
    getIFrameRef = { (iframeRef) => { iframeRef.style.height = '400px'; } }
/>
    );
};

export default App;
