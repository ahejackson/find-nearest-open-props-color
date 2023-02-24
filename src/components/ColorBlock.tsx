import type { Color } from "chroma.ts";

type ColorBlockProps = {
  color: Color;
};

function ColorRow({ color }: ColorBlockProps) {
  const style = {
    "--text-color": color.textColor(),
    "--block-color": color.hex(),
  } as React.CSSProperties;

  return (
    <span className="color-block" style={style}>
      {color.hex()}
    </span>
  );
}

export default ColorRow;
