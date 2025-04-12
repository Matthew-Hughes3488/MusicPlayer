import "./MusicCard.scss"
import React from "react";
import { MusicControls } from "../../components/MusicControls/MusicControls";
import { SongCard } from "../../components/SongCard/SongCard";

export const MusicCard = () => {

    const testFunction = () => {
        console.log('Test')
    }

    const buttonConfigs = [
        { name: "Prev", type: "Test", onClick: () => testFunction() },
        { name: "Play", type: "Test", onClick: () => testFunction() },
        { name: "Next", type: "Test", onClick: () => testFunction() },
      ];

    return(
        <div className="music-card">
            <SongCard songTitle="Test Song" artistName="Test Artist"/>
            <section className="music-card__controlls">
                <MusicControls buttonConfigs={buttonConfigs}/>
            </section>
        </div>
    )
}