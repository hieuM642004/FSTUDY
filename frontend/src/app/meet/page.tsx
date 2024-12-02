'use client';
import React, { useEffect, useState } from 'react';
import { JaaSMeeting, JitsiMeeting } from '@jitsi/react-sdk';
import { getCookie } from 'cookies-next';
import { Spin } from 'antd';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const App = () => {
    const [jwtToken, setJwtToken] = useState<string | null>(null);
    const dataUser = useTypedSelector((state) => state.user);
    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            setJwtToken(token as string);
        }
    }, []);

    if (!jwtToken) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-4">
            <JitsiMeeting
                roomName="your-room-name"
                configOverwrite={{
                    startWithAudioMuted: true,
                    disableModeratorIndicator: true,
                    startScreenSharing: true,
                    enableEmailInStats: false,
                }}
                interfaceConfigOverwrite={{
                    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                }}
                userInfo={{
                    displayName: dataUser.name || '',
                    email: dataUser.email || '',
                }}
                onApiReady={(externalApi) => {
                    // here you can attach custom event listeners to the Jitsi Meet External API
                    // you can also store it locally to execute commands
                }}
                getIFrameRef={(iframeRef) => {
                    iframeRef.style.height = '500px';
                }}
            />
        </div>
    );
};

export default App;
