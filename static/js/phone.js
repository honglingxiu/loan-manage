//正在通话线路号
var connectLineNo = "";
//通话线路号(接听、外呼时产生)
var busiLineNo = 0;
//磋商线路号
var consultLineNo = -1;
//磋商标识(0-未磋商/1-磋商中)
var consulting = 0;
//三方通话线路号
var meetmeLineNo = -1;
//三方通话标识(0-未进行三方通话/1-三方通话中)
var meetmeing = 0;
//主动挂机标识
var hangupflag = false;
//话务类型(呼出-out/呼入-in)
var callType = "";
//最大通道数
var m_nTotalLine = 7;
//上线成功座席号
var registerId = '';

//软电话各种事件(注册、下线、来电、呼叫等)

//OnTryingToRegister 注册

function fnOnTryingToRegister() {
    console.log('尝试上线');
}

function OnTryingToRegister() {
    console.log('尝试上线');
}
// OnSuccessToRegister  注册成功

function fnOnSuccessToRegister() {
    console.log('上线成功');
}

function OnSuccessToRegister() {
    console.log('上线成功');
}
//OnFailToRegister 注册失败

function fnOnFailToRegister() {
    console.log('上线失败');

}

function OnFailToRegister() {
    console.log('上线失败');
}

//OnFailToRegisterEx

function fnOnFailToRegisterEx(StatusCode, ReasonPhrase) {
    console.log('上线失败');
}

function OnFailToRegisterEx(StatusCode, ReasonPhrase) {
    console.log('上线失败');
}

//OnTryingToReRegister 重新注册

function fnOnTryingToReRegister() {
    console.log('重新注册');
    //AddToStatusLogList("Trying to re-register.");
}

function OnTryingToReRegister() {
    console.log('重新注册');
    //AddToStatusLogList("Trying to re-register.");
}
//OnTryingToReRegister 重新注册成功

function fnOnSuccessToReRegister() {
    console.log('重新注册成功');
    //AddToStatusLogList("Re-registered successfully.");
}

function OnSuccessToReRegister() {
    console.log('重新注册成功');
    //AddToStatusLogList("Re-registered successfully.");
}

//OnFailToReRegister 重新注册失败

function fnOnFailToReRegister() {
    console.log('重新注册失败');
}

function OnFailToReRegister() {
    console.log('重新注册失败');
}
//OnFailToReRegisterEx

function fnOnFailToReRegisterEx(StatusCode, ReasonPhrase) {
    console.log('OnFailToReRegisterEx');
    //AddToStatusLogList("Fail to Re-Register: " + ReasonPhrase);
}

function OnFailToReRegisterEx(StatusCode, ReasonPhrase) {
    console.log('OnFailToReRegisterEx');
    //AddToStatusLogList("Fail to Re-Register: " + ReasonPhrase);
}

//OnTryingToUnRegister 注销

function fnOnTryingToUnRegister() {
    console.log('注销');
    //AddToStatusLogList("Trying to un-register.");
}

function OnTryingToUnRegister() {
    console.log('注销');
    //AddToStatusLogList("Trying to un-register.");
}

//OnSuccessToUnRegister 注销成功

function fnOnSuccessToUnRegister() {
    console.log('下线成功');
}

function OnSuccessToUnRegister() {
    registerId = '';
    console.log('下线成功');
}

//OnFailToUnRegister 注销失败

function fnOnFailToUnRegister() {
    console.log('下线失败');
}

function OnFailToUnRegister() {
    console.log('下线失败');
}

//OnIncomingDiagnostic

function fnOnIncomingDiagnostic(MsgSIP, FromIP, FromPort) {
    console.log('外部进入连接');
}

function OnIncomingDiagnostic(MsgSIP, FromIP, FromPort) {
    console.log('外部进入连接');
}

//OnOutgoingDiagnostic

function fnOnOutgoingDiagnostic(MsgSIP, ToIP, ToPort) {
    console.log('对外连接');
}

function OnOutgoingDiagnostic(MsgSIP, ToIP, ToPort) {
    console.log('对外连接');
}

//OnFailToConnect

function fnOnFailToConnect(LineNo) {
    console.log("呼叫失败");
    //AddToStatusLogList("Line-" + (LineNo + 1) + ": Fail to connect.");
}

function OnFailToConnect(LineNo) {
    console.log("呼叫失败");
    //AddToStatusLogList("Line-" + (LineNo + 1) + ": Fail to connect.");
}

//OnConnecting

function fnOnConnecting(LineNo) {
    console.log("呼叫");
}

function OnConnecting(LineNo) {
    console.log("呼叫");
}

//OnSuccessToConnect

function fnOnSuccessToConnect(LineNo, ToRTPIP, ToRTPPort) {
    console.log("呼叫成功");
    if (LineNo == consultLineNo) {
        consulting = 1;
    } else if (LineNo == meetmeLineNo) {
        meetmeing = 1;
    } else {
        if (callType == "in") {
            DigitDTMF(LineNo, "#");
        }
    }
}

function OnSuccessToConnect(LineNo, ToRTPIP, ToRTPPort) {
    console.log("呼叫成功");
    if (LineNo == consultLineNo) {
        consulting = 1;
    } else if (LineNo == meetmeLineNo) {
        meetmeing = 1;
    } else {
        if (callType == "in") {
            DigitDTMF(LineNo, "#");
        }
    }
}

//OnDisconnectCall

function fnOnDisconnectCall(LineNo) {
    console.log("呼叫成功后对方挂断");
    if (hangupflag) {
        if (consulting == 1) {
            if (LineNo == consultLineNo) {
                consulting = 0;
                consultLineNo = -1;
            }
        }
    } else {
        if (consulting == 1) {
            if (LineNo == consultLineNo) {
                doDisConsult();
            } else if (LineNo == busiLineNo) {
                for (LineNo = 0; LineNo < m_nTotalLine; LineNo++) {
                    if (Phone.IsLineBusy(LineNo)) {
                        if (!Disconnect(LineNo))
                            ErrorMessage();
                    }
                }
                consultLineNo = -1;
                consulting = 0;
            }
        } else if (meetmeing == 1) {
            if (LineNo == meetmeLineNo) {
                doDisMeetMe();
            } else if (LineNo == busiLineNo) {
                for (LineNo = 0; LineNo < m_nTotalLine; LineNo++) {
                    if (Phone.IsLineBusy(LineNo)) {
                        if (!Disconnect(LineNo))
                            ErrorMessage();
                    }
                }
                meetmeing = 0;
                meetmeLineNo = -1;


            }
        } else {
            if (LineNo == busiLineNo) {}

        }
    }
}

function OnDisconnectCall(LineNo) {
    console.log("呼叫成功后对方挂断");
    if (hangupflag) {
        if (consulting == 1) {
            if (LineNo == consultLineNo) {
                consulting = 0;
                consultLineNo = -1;
            }
        }
    } else {
        if (consulting == 1) {
            if (LineNo == consultLineNo) {
                doDisConsult();
            } else if (LineNo == busiLineNo) {
                for (LineNo = 0; LineNo < m_nTotalLine; LineNo++) {
                    if (Phone.IsLineBusy(LineNo)) {
                        if (!Disconnect(LineNo))
                            ErrorMessage();
                    }
                }
                consultLineNo = -1;
                consulting = 0;
            }
        } else if (meetmeing == 1) {
            if (LineNo == meetmeLineNo) {
                doDisMeetMe();
            } else if (LineNo == busiLineNo) {
                for (LineNo = 0; LineNo < m_nTotalLine; LineNo++) {
                    if (Phone.IsLineBusy(LineNo)) {
                        if (!Disconnect(LineNo))
                            ErrorMessage();
                    }
                }
                meetmeing = 0;
                meetmeLineNo = -1;


            }
        } else {
            if (LineNo == busiLineNo) {}

        }
    }
}

//OnProvisionalResponse

function fnOnProvisionalResponse(LineNo, StatusCode, ReasonPhrase) {
    console.log('临时响应');
    //AddToStatusLogList("Line-" + (LineNo + 1) + ": Response: " + ReasonPhrase + ".");
}

function OnProvisionalResponse(LineNo, StatusCode, ReasonPhrase) {
    console.log('临时响应');
    //AddToStatusLogList("Line-" + (LineNo + 1) + ": Response: " + ReasonPhrase + ".");
}

//OnServerFailureResponse

function fnOnServerFailureResponse(LineNo, StatusCode, ReasonPhrase) {
    console.log('响应失败');
    //AddToStatusLogList("Line-" + (LineNo + 1) + ": Response: " + ReasonPhrase + ".");
}

function OnServerFailureResponse(LineNo, StatusCode, ReasonPhrase) {
    console.log('响应失败');
    //AddToStatusLogList("Line-" + (LineNo + 1) + ": Response: " + ReasonPhrase + ".");
}

//OnGeneralFailureResponse

function fnOnGeneralFailureResponse(LineNo, StatusCode, ReasonPhrase) {
    console.log('响应全部失败');
    //AddToStatusLogList("Line-" + (LineNo + 1) + ": Response: " + ReasonPhrase + ".");
}

function OnGeneralFailureResponse(LineNo, StatusCode, ReasonPhrase) {
    console.log('响应全部失败');
    //AddToStatusLogList("Line-" + (LineNo + 1) + ": Response: " + ReasonPhrase + ".");
}

//OnRequestFailureResponse

function fnOnRequestFailureResponse(LineNo, StatusCode, ReasonPhrase) {
    console.log('请求失败');
    //AddToStatusLogList("Line-" + (LineNo + 1) + ": Response: " + ReasonPhrase + ".");
}

function OnRequestFailureResponse(LineNo, StatusCode, ReasonPhrase) {
    console.log('请求失败');
    //AddToStatusLogList("Line-" + (LineNo + 1) + ": Response: " + ReasonPhrase + ".");
}

//OnMsgNOTIFY

function fnOnMsgNOTIFY(Msg) {
    console.log('服务器响应');
}

function OnMsgNOTIFY(Msg) {
    console.log('服务器响应');
}

(function() {
    var Phone = {};
    var VaxSIPUserAgentCAB;
    var m_bIsInternetExplorerBrowser = false;

    Phone.IsMozillaPluginInstall = function() {
        var bPlugIn = false;
        if (navigator.plugins) {

            for (nCount = 0; nCount < navigator.plugins.length; nCount++) {
                if (navigator.plugins[nCount].name.indexOf('VaxSIPUserAgent 7.0.6.4') >= 0) {
                    bPlugIn = true;
                    break;
                }
            }
        }
        return bPlugIn;
    }

    Phone.IsWindowActiveXInstall = function() {

        var bActiveX = false;

        if (!(window.ActiveXObject === undefined)) {
            if (document.VaxEmbedCAB) {
                bActiveX = true;
            }
        }


        return bActiveX;
    }

    Phone.DetectWebBrowser = function() {
        m_bIsInternetExplorerBrowser = false;

        var browser = navigator.userAgent.toUpperCase();

        if (browser.indexOf('MSIE') >= 0 || browser.indexOf("TRIDENT") >= 0) {
            if (Phone.IsWindowActiveXInstall()) {
                m_bIsInternetExplorerBrowser = true;
                VaxSIPUserAgentCAB = VaxEmbedCAB;
            } else {
                alert("您未安装IE软电话插件，暂时无法拨打电话");
            }
        } else if (browser.indexOf('FIREFOX') >= 0) {
            if (Phone.IsMozillaPluginInstall())
                VaxSIPUserAgentCAB = document.getElementById('VaxEmbedPlugIn');
            else {
                alert("您未安装FIREFOX软电话插件，暂时无法拨打电话");
            }
        } else if (browser.indexOf('CHROME') >= 0) {
            if (Phone.IsMozillaPluginInstall())
                VaxSIPUserAgentCAB = document.getElementById('VaxEmbedPlugIn');
            else {
                alert("您未安装CHROME软电话插件，暂时无法拨打电话");
            }
        } else if (browser.indexOf('SAFARI') >= 0) {
            if (Phone.IsMozillaPluginInstall()) {
                VaxSIPUserAgentCAB = document.getElementById('VaxEmbedPlugIn');
            } else {
                alert("您未安装SAFARI软电话插件，暂时无法拨打电话");
            }
        }

    }

    Phone.FindLine = function() {
        for (LineNo = 0; LineNo < m_nTotalLine; LineNo++) {
            if (!Phone.IsLineBusy(LineNo)) return LineNo;
        }
        return -1;
    }

    Phone.OpenLinesVaxVoIP = function(MyIP) {

        ListenPortRTP = 7000;
        ErrorCount = 0;

        for (LineNo = 0; LineNo < m_nTotalLine; LineNo++) {

            if (!Phone.OpenLine(LineNo, 0, MyIP, ListenPortRTP)) {

                if (Phone.GetVaxObjectError() == 11) {
                    ErrorCount++;
                    LineNo--;
                } else {
                    ErrorMessage();
                    Result = false;
                    break;
                }
            }

            ListenPortRTP += 2; // It is importent to increament RTP Listen Port by 2

            if (ErrorCount >= (m_nTotalLine + 500)) // If unable to open more than 500 ports.
            {
                alert("Unable to open RTP communication port.");
                return false;
            }
        }

        return true;
    }

    Phone.ErrorMessage = function() {
        VaxError = Phone.GetVaxObjectError();

        switch (VaxError) {
            case 10:
                alert("You are not online, please click the 'Online' button first to dial/receive the calls.");
                break;

            case 11:
                alert("Cann't open local communication port. Another softphone (x-Ten, x-lite, skype etc) is already running. Please close it first.");
                break;

            case 12:
                alert("License Key is not valid.");
                break;

            case 13:
                alert("Fail to initialize VaxVoIP task window.");
                break;

            case 14:
                alert("Cann't access Input/Mic device or device is already in use.");
                break;

            case 15:
                alert("Cann't access Output/Speaker device or device is already in use.");
                break;

            case 16:
                alert("Input/Mic device is not open.");
                break;

            case 17:
                alert("Output/Speaker device is not open.");
                break;

            case 18:
                alert("Your sound device does not support mic volume.");
                break;

            case 19:
                alert("Your sound device does not support speaker volume.");
                break;

            case 20:
                alert("Recording media initialization fail.");
                break;

            case 21:
                alert("Cann't open the wave file.");
                break;

            case 22:
                alert("Provided SIP URI is not valid.");
                break;

            case 23:
                alert("Codec is not supported.");
                break;

            case 24:
                alert("Error to create SDP (Session Description Protocol) request.");
                break;

            case 25:
                alert("Error to create CONNECTION request. Please check the provided SIP URI is valid.");
                break;

            case 26:
                alert("Error to create REGISTER request. Please check the provided SIP URI is valid.");
                break;

            case 27:
                alert("Error to create UN-REGISTER request. Please check the provided SIP URI is valid.");
                break;

            case 28:
                alert("Error to create DISCONNECT request.");
                break;

            case 29:
                alert("Line No is not valid.");
                break;

            case 30:
                alert("Line is already busy.");
                break;

            case 31:
                alert("Line is not open.");
                break;

            case 32:
                alert("Invalid Call-Id.");
                break;

            case 33:
                alert("Provided value is not valid.");
                break;

            case 34:
                alert("Selected line is not in voice session.");
                break;

            case 35:
                alert("Fail to read wave file.");
                break;

            case 36:
                alert("Fail to write wave file.");
                break;

            case 37:
                alert("Unsupported wave file format.");
                break;

            case 38:
                alert("Error to create CANCEL request.");
                break;

            case 39:
                alert("License limit exceeded.");
                break;

            case 40:
                alert("Unable to find contact or contact is not added.");
                break;

            case 41:
                alert("Remote user is not online or remote user is failed to subscribe to the SIP SERVER");
                break;

            case 42:
                alert("Error to create chat status message.");
                break;

            case 43:
                alert("Error to create add contact message.");
                break;
        }
    }

    // 软电话各种方法(初始化，连接(呼叫)，断开连接(挂断)等)
    Phone.GetCallId = function(nLineNo) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.GetCallId(nLineNo);
        else
            return VaxSIPUserAgentCAB.GetCallId(String(Number(nLineNo)));
    }

    Phone.GetMicSoundLevel = function() {
        return VaxSIPUserAgentCAB.GetMicSoundLevel();
    }

    Phone.GetSpkSoundLevel = function() {
        return VaxSIPUserAgentCAB.GetSpkSoundLevel();
    }

    Phone.GetAudioInDevTotal = function() {
        return VaxSIPUserAgentCAB.GetAudioInDevTotal();
    }

    Phone.GetAudioOutDevTotal = function() {
        return VaxSIPUserAgentCAB.GetAudioOutDevTotal();
    }

    Phone.GetAudioOutDevName = function(nDeviceId) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.GetAudioOutDevName(nDeviceId);
        else
            return VaxSIPUserAgentCAB.GetAudioOutDevName(String(Number(nDeviceId)));
    }

    Phone.GetAudioInDevName = function(nDeviceId) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.GetAudioInDevName(nDeviceId);
        else
            return VaxSIPUserAgentCAB.GetAudioInDevName(String(Number(nDeviceId)));
    }

    Phone.SetDomainKey = function(sLicenceKey) {
        return VaxSIPUserAgentCAB.SetDomainKey(sLicenceKey);
    }

    Phone.InitializeEx = function(bBindToListenIP, sListenIP, nListenPort, sUserName, sLogin, sLoginPwd, sDisplayName, sDomainRealm, sSIPProxy, sSIPOutBoundProxy, bUseSoundDevice, nTotalLine) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.InitializeEx(bBindToListenIP, sListenIP, nListenPort, sUserName, sLogin, sLoginPwd, sDisplayName, sDomainRealm, sSIPProxy, sSIPOutBoundProxy, bUseSoundDevice, nTotalLine);
        else
            return VaxSIPUserAgentCAB.InitializeEx(String(Number(bBindToListenIP)), sListenIP, String(Number(nListenPort)), sUserName, sLogin, sLoginPwd, sDisplayName, sDomainRealm, sSIPProxy, sSIPOutBoundProxy, String(Number(bUseSoundDevice)), String(Number(nTotalLine)));
    }

    Phone.Initialize = function(bBindToListenIP, sListenIP, nListenPort, sFromURI, sSIPOutBoundProxy, sSIPProxy, sLoginId, sLoginPwd, bUseSoundDevice, nTotalLine) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.Initialize(bBindToListenIP, sListenIP, nListenPort, sFromURI, sSIPOutBoundProxy, sSIPProxy, sLoginId, sLoginPwd, bUseSoundDevice, nTotalLine);
        else
            return VaxSIPUserAgentCAB.Initialize(String(Number(bBindToListenIP)), sListenIP, String(Number(nListenPort)), sFromURI, sSIPOutBoundProxy, sSIPProxy, sLoginId, sLoginPwd, String(Number(bUseSoundDevice)), String(Number(nTotalLine)));
    }

    Phone.UnInitialize = function() {
        VaxSIPUserAgentCAB.UnInitialize();
    }

    Phone.RegisterToProxy = function(nExpire) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.RegisterToProxy(nExpire);
        else
            return VaxSIPUserAgentCAB.RegisterToProxy(String(Number(nExpire)));
    }

    Phone.UnRegisterToProxy = function() {
        return VaxSIPUserAgentCAB.UnRegisterToProxy();
    }

    Phone.OpenLine = function(nLineNo, bBindToRTPRxIP, sRTPRxIP, nRTPRxPort) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.OpenLine(nLineNo, bBindToRTPRxIP, sRTPRxIP, nRTPRxPort);
        else
            return VaxSIPUserAgentCAB.OpenLine(String(Number(nLineNo)), String(Number(bBindToRTPRxIP)), sRTPRxIP, String(Number(nRTPRxPort)));
    }

    Phone.CloseLine = function(nLineNo) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.CloseLine(nLineNo);
        else
            return VaxSIPUserAgentCAB.CloseLine(String(Number(nLineNo)));
    }

    Phone.GetVaxObjectError = function() {
        return VaxSIPUserAgentCAB.GetVaxObjectError();
    }

    Phone.DialCall = function(nLineNo, sDialNo, nInputDeviceId, nOutputDeviceId) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.DialCall(nLineNo, sDialNo, nInputDeviceId, nOutputDeviceId);
        else
            return VaxSIPUserAgentCAB.DialCall(String(Number(nLineNo)), sDialNo, String(Number(nInputDeviceId)), String(Number(nOutputDeviceId)));
    }

    Phone.Connect = function(nLineNo, sToURI, nInputDeviceId, nOutputDeviceId) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.Connect(nLineNo, sDialNo, nInputDeviceId, nOutputDeviceId);
        else
            return VaxSIPUserAgentCAB.Connect(String(Number(nLineNo)), sDialNo, String(Number(nInputDeviceId)), String(Number(nOutputDeviceId)));
    }

    Phone.Disconnect = function(nLineNo) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.Disconnect(nLineNo);
        else
            return VaxSIPUserAgentCAB.Disconnect(String(Number(nLineNo)));
    }

    Phone.AcceptCall = function(nLineNo, sCallId, nInputDeviceId, nOutputDeviceId) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.AcceptCall(nLineNo, sCallId, nInputDeviceId, nOutputDeviceId);
        else
            return VaxSIPUserAgentCAB.AcceptCall(String(Number(nLineNo)), sCallId, String(Number(nInputDeviceId)), String(Number(nOutputDeviceId)));
    }

    Phone.RejectCall = function(sCallId) {
        return VaxSIPUserAgentCAB.RejectCall(sCallId);
    }

    Phone.TransferCallEx = function(nLineNo, sToUserName) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.TransferCallEx(nLineNo, sToUserName);
        else
            return VaxSIPUserAgentCAB.TransferCallEx(String(Number(nLineNo)), sToUserName);
    }

    Phone.TransferCall = function(nLineNo, sToURI) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.TransferCall(nLineNo, sToURI);
        else
            return VaxSIPUserAgentCAB.TransferCall(String(Number(nLineNo)), sToURI);
    }

    Phone.JoinTwoLine = function(nLineNoA, nLineNoB) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.JoinTwoLine(nLineNoA, nLineNoB);
        else
            return VaxSIPUserAgentCAB.JoinTwoLine(String(Number(nLineNoA)), String(Number(nLineNoB)));
    }

    Phone.HoldLine = function(nLineNo) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.HoldLine(nLineNo);
        else
            return VaxSIPUserAgentCAB.HoldLine(String(Number(nLineNo)));
    }

    Phone.UnHoldLine = function(nLineNo) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.UnHoldLine(nLineNo);
        else
            return VaxSIPUserAgentCAB.UnHoldLine(String(Number(nLineNo)));
    }

    Phone.IsLineOpen = function(nLineNo) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.IsLineOpen(nLineNo);
        else
            return VaxSIPUserAgentCAB.IsLineOpen(String(Number(nLineNo)));
    }

    Phone.IsLineHold = function(nLineNo) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.IsLineHold(nLineNo);
        else
            return VaxSIPUserAgentCAB.IsLineHold(String(Number(nLineNo)));
    }

    Phone.IsLineBusy = function(nLineNo) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.IsLineBusy(nLineNo);
        else
            return VaxSIPUserAgentCAB.IsLineBusy(String(Number(nLineNo)));
    }

    Phone.EnableKeepAlive = function(nSeconds) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.EnableKeepAlive(nSeconds);
        else
            return VaxSIPUserAgentCAB.EnableKeepAlive(String(Number(nSeconds)));

    }

    Phone.DisableKeepAlive = function() {
        VaxSIPUserAgentCAB.DisableKeepAlive();
    }

    Phone.DeselectAllVoiceCodec = function() {
        VaxSIPUserAgentCAB.DeselectAllVoiceCodec();
    }

    Phone.SelectAllVoiceCodec = function() {
        VaxSIPUserAgentCAB.SelectAllVoiceCodec();
    }

    Phone.SelectVoiceCodec = function(nCodecNo) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.SelectVoiceCodec(nCodecNo);
        else
            return VaxSIPUserAgentCAB.SelectVoiceCodec(String(Number(nCodecNo)));
    }

    Phone.DeselectVoiceCodec = function(nCodecNo) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.DeselectVoiceCodec(nCodecNo);
        else
            return VaxSIPUserAgentCAB.DeselectVoiceCodec(String(Number(nCodecNo)));
    }

    Phone.GetMyIP = function() {
        return VaxSIPUserAgentCAB.GetMyIP();
    }

    Phone.DigitDTMF = function(nLineNo, sDigit) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.DigitDTMF(nLineNo, sDigit);
        else
            return VaxSIPUserAgentCAB.DigitDTMF(String(Number(nLineNo)), sDigit);
    }

    Phone.SetDTMFVolume = function(nVolume) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.SetDTMFVolume(nVolume);
        else
            return VaxSIPUserAgentCAB.SetDTMFVolume(String(Number(nVolume)));

    }

    Phone.GetDTMFVolume = function() {
        return VaxSIPUserAgentCAB.GetDTMFVolume();
    }

    Phone.EnableForceInbandDTMF = function(nLineNo) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.EnableForceInbandDTMF(nLineNo);
        else
            return VaxSIPUserAgentCAB.EnableForceInbandDTMF(String(Number(nLineNo)));
    }

    Phone.DisableForceInbandDTMF = function(nLineNo) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.DisableForceInbandDTMF(nLineNo);
        else
            return VaxSIPUserAgentCAB.DisableForceInbandDTMF(String(Number(nLineNo)));
    }



    Phone.EnableMicBoost = function() {
        return VaxSIPUserAgentCAB.EnableMicBoost();
    }

    Phone.DisableMicBoost = function() {
        return VaxSIPUserAgentCAB.DisableMicBoost();
    }

    Phone.IsMicBoostEnable = function() {
        return VaxSIPUserAgentCAB.IsMicBoostEnable();
    }

    Phone.EnableAGC = function(nLevel) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.EnableAGC(nLevel);
        else
            return VaxSIPUserAgentCAB.EnableAGC(String(Number(nLevel)));
    }

    Phone.DisableAGC = function() {
        return VaxSIPUserAgentCAB.DisableAGC();
    }

    Phone.EnableEchoNoiseCancellation = function() {
        return VaxSIPUserAgentCAB.EnableEchoNoiseCancellation();
    }

    Phone.DisableEchoNoiseCancellation = function() {
        return VaxSIPUserAgentCAB.DisableEchoNoiseCancellation();
    }


    Phone.EnableDonotDisturb = function() {
        VaxSIPUserAgentCAB.EnableDonotDisturb();
    }

    Phone.DisableDonotDisturb = function() {
        VaxSIPUserAgentCAB.DisableDonotDisturb();
    }


    Phone.ConfAllowLine = function(nLineNo, bAllowListen, bAllowSpeak) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.ConfAllowLine(nLineNo, bAllowListen, bAllowSpeak);
        else
            return VaxSIPUserAgentCAB.ConfAllowLine(String(Number(nLineNo)), String(Number(bAllowListen)), String(Number(bAllowSpeak)));
    }

    Phone.ForwardCall = function(bEnable, sToUserName) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.ForwardCall(bEnable, sToUserName);
        else
            return VaxSIPUserAgentCAB.ForwardCall(String(Number(bEnable)), sToUserName);
    }

    Phone.VoiceChanger = function(nPitch) {
        if (m_bIsInternetExplorerBrowser)
            return VaxSIPUserAgentCAB.VoiceChanger(nPitch);
        else
            return VaxSIPUserAgentCAB.VoiceChanger(String(Number(nPitch)));
    }

    // 呼叫相关事件
    Phone.OffLine = function() {
        //重置全局基础变量
        connectLineNo = ""; //正在通话线路号
        busiLineNo = 0; //通话线路号(接听、外呼时产生)
        consultLineNo = -1; //磋商线路号
        consulting = 0; //磋商标识(0-未磋商/1-磋商中)
        meetmeLineNo = -1; //三方通话线路号
        meetmeing = 0; //三方通话标识(0-未进行三方通话/1-三方通话中)
        hangupflag = false; //主动挂机标识
        callType = ""; //话务类型(呼出-out/呼入-in)
        m_nTotalLine = 7; //最大通道数
        registerId = ''; //上线成功座席号
        Phone.UnInitialize();
    }
    // Phone.Online(语音服务器地址, 分机号码, 分机密码);
    Phone.Online = function(EditSIPProxy, EditLoginId, EditLoginPwd) {

        Phone.DetectWebBrowser();

        if (window.location.href.indexOf('localhost') > -1) {
            //本地 localhost
            Phone.SetDomainKey("186D94D194D122D89D218D66D230D155D143D144D148D174D62D156D117D213D41D132D149D22D213D171D3D183D181D115D13D209D10D207D243D26D117D228D122D41D41D181D54D124D118D10D127D247D90D74D40D144D219D129D201D70D233D165D27D83D176D80D211D54D0D108D141D245D47D231D99D135D181D121D150D137D130D113D173D25D33D63D238D230D40D158D216D92D73D225D68D135D239D109D81D137D211D253D223D188D130D157D189D186D217D126D245D207D74D96D224D232D122D30D144D195D68D214D112D84D199D241D105D163D25D115D147D98D114D222D125D");
        } else if (window.location.href.indexOf('192.168.218.247') > -1) {
            // 192.168.218.247
            Phone.SetDomainKey("65D110D200D186D128D11D161D115D155D143D144D148D174D62D156D117D213D41D132D149D22D213D171D3D183D181D115D13D209D10D207D243D26D117D228D122D41D41D181D54D124D118D10D127D247D90D74D40D144D219D129D201D70D233D165D27D83D176D80D211D54D0D108D141D245D47D231D99D135D181D121D150D137D130D113D173D25D33D63D238D230D40D158D216D92D73D225D68D135D239D109D81D137D211D253D223D188D130D157D189D186D217D126D245D207D74D96D224D232D122D30D144D217D65D79D12D196D20D125D182D16D160D241D30D196D190D162D85D99D141D6D49D241D107D229D230D");
        } else {
            // mgr.junjue888.com
            Phone.SetDomainKey("3D153D236D23D209D29D241D65D155D143D144D148D174D62D156D117D213D41D132D149D22D213D171D3D183D181D115D13D209D10D207D243D26D117D228D122D41D41D181D54D124D118D10D127D247D90D74D40D144D219D129D201D70D233D165D27D83D176D80D211D54D0D108D141D245D47D231D99D135D181D121D150D137D130D113D173D25D33D63D238D230D40D158D216D92D73D225D68D135D239D109D81D137D211D253D223D188D130D157D189D186D217D126D245D207D74D96D224D232D122D30D144D150D0D42D181D28D17D163D25D22D141D169D94D104D33D156D14D215D59D26D237D186D114D2D127D");
        }

        MyIP = Phone.GetMyIP();

        AccountUserName = EditLoginId;
        AccountAuthLogin = EditLoginId;
        AccountAuthPassword = EditLoginPwd;
        AccountDisplayName = EditLoginId;
        AccountDomain = EditSIPProxy;
        AccountSIPProxy = EditSIPProxy;
        for (ListenPortSIP = 5061; ListenPortSIP < 7000; ListenPortSIP++) {

            Result = Phone.InitializeEx(0, MyIP, ListenPortSIP, AccountUserName, AccountAuthLogin, AccountAuthPassword, AccountDisplayName, AccountDomain, AccountSIPProxy, '', 1, m_nTotalLine);
            if (!Result) {
                if (Phone.GetVaxObjectError() != 11) {
                    Phone.ErrorMessage();
                    return false;
                }
            } else {
                break;
            }
        }

        if (ListenPortSIP >= 7000) {
            alert("Cann't open SIP communication port.");
            return false;
        }

        if (!Phone.OpenLinesVaxVoIP(MyIP)) return false;

        if (!Phone.RegisterToProxy(1800)) {
            Phone.ErrorMessage();
            return false;
        }

        // //禁用噪声清除
        // sableEchoNoiseCancellation();
        // //禁用自动增溢
        // DisableAGC();
        // //禁用麦克风增强
        // DisableMicBoost();

        // EnableEchoNoiseCancellation();
        //清除所有语音编码	
        Phone.DeselectAllVoiceCodec();

        /**** Codec No 3 represents G711U *****/
        Phone.SelectVoiceCodec(3);
        /**** Codec No 2 represents G711A *****/
        Phone.SelectVoiceCodec(2);
        /**** Codec No 0 represents GSM610 *****/
        Phone.SelectVoiceCodec(0);
        /**** Codec No 1 represents iLBC *****/
        Phone.SelectVoiceCodec(1);

        Phone.EnableKeepAlive(10);
        return true;
    }
    //呼叫
    Phone.BtnDial_onclick = function(phoneNo) {
        if (phoneNo) {
            busyLineNo = Phone.FindLine();
            LineNo = busyLineNo;
            InputDeviceId = 0;
            OutputDeviceId = 0;
            if (!Phone.DialCall(LineNo, phoneNo, InputDeviceId, OutputDeviceId)) {
                Phone.ErrorMessage();
                return false;
            }
            callType = "out";
            hangupflag = false;
            return true;
        }
    }
    //挂机
    Phone.BtnHangUp_onclick = function(nowLineNo) {
        hangupflag = true;
        //磋商，桥接主叫与第三方
        if (consulting == 1) {
            if (Phone.IsLineBusy(busiLineNo) && Phone.IsLineBusy(consultLineNo)) {
                if (!Phone.JoinTwoLine(busiLineNo, consultLineNo)) {
                    Phone.ErrorMessage();
                    return false;
                }
            }
        } else if (meetmeing == 1) {
            meetmeing = 0;
            meetmeLineNo = -1;
        } else {}
        if (typeof nowLineNo !== 'undefined') {
            if (!Phone.Disconnect(nowLineNo)) {
                Phone.ErrorMessage();
                return false;
            }
        } else {
            for (LineNo = 0; LineNo < m_nTotalLine; LineNo++) {
                if (Phone.IsLineBusy(LineNo)) {
                    if (!Phone.Disconnect(LineNo)) {
                        Phone.ErrorMessage();
                        return false;
                    }
                }
            }
        }
        return true;
    }

    window.Phone = Phone;
})()