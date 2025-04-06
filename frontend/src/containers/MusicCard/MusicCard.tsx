import React from "react";
import { MusicControls } from "../../components/MusicControls/MusicControls";

export const MusicCard = () => {

    const testFunction = () => {
        console.log('Test')
    }

    const buttonConfigs = [
        { name: "Prev", type: "prev", onClick: () => testFunction() },
        { name: "Play", type: "play", onClick: () => testFunction() },
        { name: "Next", type: "next", onClick: () => testFunction() },
      ];

    return(
        <div>
            <MusicControls buttonConfigs={buttonConfigs}/>
        </div>
    )
}