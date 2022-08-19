import React, { useState } from "react";
import { Button } from "@material-ui/core";
import VideoCall from "./VideoCall";

function App1() {
  const [inCall, setInCall] = useState(false);

  return (
    <div className="App" style={{height: "100vh", width: "200vh"}}>
      {inCall ? (
      <VideoCall setInCall={setInCall} />
      ) : ( 
      <Button 
      variant="contained" 
      color="primary" 
      onClick={() => setInCall(true)}
      >
        Join Call
      </Button>
      )}
    </div>
  );
}

export default App1;