import React from "react";

type SongCardProps = {
    songTitle : string,
    artistName : string
}

export const SongCard = ({songTitle, artistName} : SongCardProps) => {
    return(
        <div className="song-card">
            <h3>{songTitle}</h3>
            <h3>{artistName}</h3>
        </div>
    )
}