import { Button } from "../Button/Button";

type ButtonConfig = {
    name: string
    type: string
    onClick: () => void
}

type MusicControlsProps = {
    buttonConfigs : ButtonConfig[]
}

export const MusicControls = ({buttonConfigs} : MusicControlsProps) => {
  const testFunction = () => {
    console.log("Test");
  };

  const renderButtons = buttonConfigs.map((btn, index) => (
    <Button
      key={index}
      buttonName={btn.name}
      buttonType={btn.type}
      onClick={btn.onClick}
    />
  ));

  return <div className="music-controls-component">{renderButtons}</div>;
};
