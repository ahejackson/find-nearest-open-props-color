import type { ColorDifference } from "../App";

function ColorRow({ name, hex, color, distance, deltaE }: ColorDifference) {
  const style = {
    "--text-color": color.textColor(),
    "--row-color": hex,
  } as React.CSSProperties;

  return (
    <li key={name}>
      <div className="color-row" style={style}>
        <ul>
          <li>
            {name} ({color.hex()})
          </li>
          <li>Distance: {distance}</li>
          <li>Delta-E: {deltaE}</li>
        </ul>
      </div>
    </li>
  );
}

export default ColorRow;
