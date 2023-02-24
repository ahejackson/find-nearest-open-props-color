import { useState } from "react";
import "./App.css";
import Colors from "open-props/src/props.colors";
import ColorSelector from "./components/ColorSelector";
import ColorBlock from "./components/ColorBlock";
import ColorRow from "./components/ColorRow";
import type { Color } from "chroma.ts";
import * as chroma from "chroma.ts";

export type OpenPropsColor = {
  name: string;
  hex: string;
  color: Color;
};

export type ColorDifference = OpenPropsColor & {
  distance?: number;
  deltaE?: number;
};

const opColors = Object.entries(Colors).map(([name, hex]) => ({
  name: name,
  hex: hex,
  color: chroma.color(hex),
}));

function calculateColorDifferences(
  color: Color,
  palette: OpenPropsColor[]
): ColorDifference[] {
  return palette
    .map((paletteColor) => ({
      ...paletteColor,
      distance: chroma.distance(color, paletteColor.color),
      deltaE: chroma.deltaE(color, paletteColor.color),
    }))
    .sort((c1, c2) => c1.deltaE - c2.deltaE);
}

function App() {
  const [selectedColor, setSelectedColor] = useState<Color | null>();
  const [colorDifferences, setColorDifferences] = useState<ColorDifference[]>(
    []
  );

  function onColorSelected(color: Color) {
    setSelectedColor(color);
    setColorDifferences(calculateColorDifferences(color, opColors));
  }

  return (
    <div className="App">
      <header>
        <h1>Find the nearest Open Props color</h1>
        <p>
          A tool to find the nearest color from{" "}
          <a href="https://open-props.style/#colors">
            the Open Props color palette
          </a>
        </p>
      </header>

      <main>
        <ColorSelector onColorSelected={onColorSelected}></ColorSelector>

        {selectedColor ? (
          <p>
            The selected color is: <ColorBlock color={selectedColor} />
          </p>
        ) : (
          <p>No color selected</p>
        )}

        <ul>
          {colorDifferences.map((colorDiff) => (
            <ColorRow {...colorDiff} key={colorDiff.name}></ColorRow>
          ))}
        </ul>
      </main>

      <footer>
        <p>
          Made by <a href="https://github.com/ahejackson/">Adam Jackson</a>
        </p>
        <p>
          Inspired by{" "}
          <a href="https://find-nearest-tailwind-colour.netlify.app/">
            Find the nearest Tailwind colour
          </a>
        </p>
        <p>
          Built using <a href="https://open-props.style">Open Props</a> and{" "}
          <a href="https://github.com/NaridaL/chroma.ts">chroma.ts</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
