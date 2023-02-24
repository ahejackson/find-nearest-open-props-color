import type { Color } from "chroma.ts";
import { color } from "chroma.ts";

type ColorSelectorProps = {
  onColorSelected: (color: Color) => void;
};

function ColorSelector({ onColorSelected }: ColorSelectorProps) {
  const regex = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

  return (
    <div>
      <h2>Enter a color, get an Open Props color prop</h2>
      <p>Type a hex color code like #ffffff or #ed3939</p>
      <input
        type="text"
        id="textColorPicker"
        placeholder="#ffffff"
        onChange={(e) => {
          if (regex.test(e.target.value)) {
            onColorSelected(color(e.target.value));
          }
        }}
      ></input>
      <input
        type="color"
        id="htmlColorPicker"
        defaultValue="#ff0000"
        onChange={(e) => onColorSelected(color(e.target.value))}
      ></input>
    </div>
  );
}

export default ColorSelector;
