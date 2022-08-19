import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appID = "a7fb2830a3a8478cb750e1bdb7b2d970";
const token = "007eJxTYHhUeXNPhsyT7seWU5pDW1M67Cx3TuOrKX44T77qctzse7MUGBLN05KMLIwNEo0TLUzMLZKTzE0NUg2TUpLMk4xSLM0Nyp7+S/pixpBcbKPCxMgAgSA+C0NuYmYeAwMA7jkifg==";


export const config = {mode: "rtc", codec: "vp8", appID: appID, token: token};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
