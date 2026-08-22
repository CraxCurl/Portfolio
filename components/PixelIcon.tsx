import { cn } from "@/lib/utils";

/**
 * Hand-drawn pixel glyphs.
 *
 * lucide-react v1 dropped brand icons, and its stroked outlines would look
 * out of place next to 8bitcn's blocky components anyway. Each icon is a
 * 16x16 grid authored as text: `#` is a filled pixel, anything else is empty.
 */
type Grid = readonly string[];

const GITHUB: Grid = [
  "................",
  "...##......##...",
  "..####....####..",
  "..############..",
  ".##############.",
  ".##############.",
  ".##############.",
  ".##############.",
  "..############..",
  "..############..",
  "..###......###..",
  "..###......###..",
  "..###......###..",
  "...##......##...",
  "................",
  "................",
];

const LINKEDIN: Grid = [
  "################",
  "#..............#",
  "#..............#",
  "#..##..........#",
  "#..##..........#",
  "#..............#",
  "#..##..######..#",
  "#..##..##..##..#",
  "#..##..##..##..#",
  "#..##..##..##..#",
  "#..##..##..##..#",
  "#..##..##..##..#",
  "#..##..##..##..#",
  "#..##..##..##..#",
  "#..............#",
  "################",
];

const MAIL: Grid = [
  "................",
  "................",
  ".##############.",
  ".##############.",
  ".##..######..##.",
  ".###..####..###.",
  ".#.##..##..##.#.",
  ".#..##....##..#.",
  ".#...##..##...#.",
  ".#....####....#.",
  ".#.....##.....#.",
  ".#............#.",
  ".##############.",
  "................",
  "................",
  "................",
];

const HEART: Grid = [
  "................",
  "................",
  "..###....###....",
  ".#####..#####...",
  "##############..",
  "##############..",
  "##############..",
  ".############...",
  "..##########....",
  "...########.....",
  "....######......",
  ".....####.......",
  "......##........",
  "................",
  "................",
  "................",
];

/** Turns a grid into `<rect>`s, merging horizontal runs to keep the DOM small. */
function cells(grid: Grid) {
  const rects: React.ReactElement[] = [];

  grid.forEach((row, y) => {
    let x = 0;

    while (x < row.length) {
      if (row[x] !== "#") {
        x += 1;
        continue;
      }

      const start = x;
      while (x < row.length && row[x] === "#") {
        x += 1;
      }

      rects.push(
        <rect key={`${y}-${start}`} x={start} y={y} width={x - start} height={1} />,
      );
    }
  });

  return rects;
}

function PixelGlyph({
  grid,
  className,
  ...props
}: React.ComponentProps<"svg"> & { grid: Grid }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      className={cn("size-4", className)}
      {...props}
    >
      {cells(grid)}
    </svg>
  );
}

export function GithubIcon(props: React.ComponentProps<"svg">) {
  return <PixelGlyph grid={GITHUB} {...props} />;
}

export function LinkedinIcon(props: React.ComponentProps<"svg">) {
  return <PixelGlyph grid={LINKEDIN} {...props} />;
}

export function MailIcon(props: React.ComponentProps<"svg">) {
  return <PixelGlyph grid={MAIL} {...props} />;
}

export function HeartIcon(props: React.ComponentProps<"svg">) {
  return <PixelGlyph grid={HEART} {...props} />;
}
