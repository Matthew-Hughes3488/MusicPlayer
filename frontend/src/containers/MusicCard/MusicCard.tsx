import React from "react";
import { MusicControls } from "../../components/MusicControls/MusicControls";
import { SongCard } from "../../components/SongCard/SongCard";

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
            <SongCard songTitle="Test Song" artistName="Test Artist"/>
            <MusicControls buttonConfigs={buttonConfigs}/>
        </div>
    )
}