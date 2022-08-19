import React, { useState, useEffect } from "react";
import { channelName, config, useClient, useMicrophoneAndCameraTracks } from "./settings";
import { Grid } from "@material-ui/core";
import Video from "./Video";
import Controls from "./Controls";

export default function VideoCall(props) {
    const { setInCall } = props;
    const [ users, setUsers] = useState([]);
    const [ start, setStart] = useState(false);
    const client = useClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();

    useEffect(() => { 
        let init = async(name) => {
            client.on("user-published", async(user, mediaType) => { // User turns  turns on video or audio hence media type
                // published means that it's on Enable unpublished Disabled video stream
                await client.subscribe(user,  mediaType); // Subscribes mean to  connect
                if (mediaType === "video") {
                    setUsers((prevUsers) => {
                        return [...prevUsers, user]; // Return all users that were there + new users
                    });
                }
                if (mediaType === "audio") {
                    user.audioTrack.play(); // current User would now be able to hear audio in browser
                }
            });
            client.on("user-unpublished", (user, mediaType) => {
                if (mediaType === "audio") {
                    if (user.audioTrack) user.audioTrack.stop(); // We need to have this created to disable audio if user leaves or unables
                }
                if (mediaType === "video") {
                    setUsers((prevUsers) => {
                        return prevUsers.filter((User) => User.uid !== user.uid);
                        // Basically this returns all the users in array except the one that stopped their video stream
                        // Filters current users to user who unconnected
                    });
                }
            });

            client.on("user-left", (user) => {
                setUsers((prevUsers) => {
                    return prevUsers.filter((User) => User.uid !== user.uid);
                    // Basically this returns all the users in array except the one that stopped their video stream
                    // Filters current users to user who unconnected
                });
            });

                try {
                   await client.join(config.appID, name, config.token, null); // Get sent to line 13 to null = uid generate userID and join channel
                } catch (error) {
                    console.log("error");
                }
                if (tracks) await client.publish([tracks[0], tracks[1]]); // Do we have track if so, video & audio has been initialized
                // Publish our stream
                setStart(true);
            };
            if (ready && tracks) { // We call the function up top when ready & track is init
                try {
                    init(channelName);
                } catch (error) {
                    console.log(error);
                } // Waiting for user permission to mic & cam and then initialize to channel name
            }
    }, [channelName, client, ready, tracks]);

    return (
        <Grid container direction="column" style={{height: "100%"}}>
            {/*<!--- When ready Display video / control--->*/}
            <Grid item style={{height: "5%"}} >
                { ready && tracks && (
                <Controls tracks={tracks} setStart={setStart} setInCall={setInCall}/>
            )} 
            </Grid>
            <Grid item style={{height: "95%" }}>
                { start && tracks && <Video tracks={tracks} users={users} /> }
            </Grid>
        </Grid>
    );
}

// Start mean we can watch other ppl videos when we join channel but we may not published our video
// Thats why we Start
// We display control when we enable to our video essentially when we are Ready