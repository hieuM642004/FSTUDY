'use client';
import Script from 'next/script';

const LiveChatScript = () => {
    return (
        <>
            <Script id="live-chat-config" strategy="afterInteractive">
                {`
                        // Configs
                        let liveChatBaseUrl   = document.location.protocol + '//' + 'livechat.fpt.ai/v36/src'
                        let LiveChatSocketUrl = 'livechat.fpt.ai:443'
                        let FptAppCode        = '70d8a1e7c8711b0779fed6c80ac18ad1'
                        let FptAppName        = 'FSTUDY'
                        // Define custom styles
                        let CustomStyles = {
                            headerBackground: 'linear-gradient(86.7deg, #3353A2FF 0.85%, #3353A2FF 98.94%)',
                            headerTextColor: '#ffffffff',
                            headerLogoEnable: false,
                            headerLogoLink: 'https://chatbot-tools.fpt.ai/livechat-builder/img/Icon-fpt-ai.png',
                            headerText: 'FSTUDY',
                            primaryColor: '#3353A2FF',
                            secondaryColor: '#ecececff',
                            primaryTextColor: '#ffffffff',
                            secondaryTextColor: '#000000DE',
                            buttonColor: '#3353A2FF',
                            buttonTextColor: '#ffffffff',
                            bodyBackgroundEnable: false,
                            bodyBackgroundLink: '',
                            avatarBot: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                            sendMessagePlaceholder: 'Nhập nội dung tại đây',
                            floatButtonLogo: 'https://cdn-icons-png.flaticon.com/512/3379/3379870.png',
                            floatButtonTooltip: 'Bạn có cần giúp gì?',
                            floatButtonTooltipEnable: true,
                            customerLogo: 'https://chatbot-tools.fpt.ai/livechat-builder/img/bot.png',
                            customerWelcomeText: 'Vui lòng nhập tên',
                            customerButtonText: 'Xin chào',
                            prefixEnable: false,
                            prefixType: 'radio',
                            prefixOptions: ["Anh","Chị"],
                            prefixPlaceholder: 'Danh xưng',
                            css: ''
                        }
                        if (!FptAppCode) {
                            let appCodeFromHash = window.location.hash.substr(1)
                            if (appCodeFromHash.length === 32) {
                                FptAppCode = appCodeFromHash
                            }
                        }
                        let FptLiveChatConfigs = {
                            appName: FptAppName,
                            appCode: FptAppCode,
                            themes : '',
                            styles : CustomStyles
                        }
                        let FptLiveChatScript  = document.createElement('script')
                        FptLiveChatScript.id   = 'fpt_ai_livechat_script'
                        FptLiveChatScript.src  = liveChatBaseUrl + '/static/fptai-livechat.js'
                        document.body.appendChild(FptLiveChatScript)
                        let FptLiveChatStyles  = document.createElement('link')
                        FptLiveChatStyles.id   = 'fpt_ai_livechat_script'
                        FptLiveChatStyles.rel  = 'stylesheet'
                        FptLiveChatStyles.href = liveChatBaseUrl + '/static/fptai-livechat.css'
                        document.body.appendChild(FptLiveChatStyles)
                        FptLiveChatScript.onload = function () {
                            fpt_ai_render_chatbox(FptLiveChatConfigs, liveChatBaseUrl, LiveChatSocketUrl)
                        }
                    `}
            </Script>
        </>
    );
};

export default LiveChatScript;
