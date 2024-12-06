export interface ConfigOptions {}

type Accessor<In, Out> = Out | string | ((obj: In) => Out);
type SeriesAccessor<T> = Accessor<SeriesD, T>;

export interface SeriesD {
  __dataNode?: DataNode;
}

export interface DataNode {
  data: SeriesD;
  id: number;
  value: number;
  startAngle?: number;
  endAngle?: number;
  padAngle?: number;
}

type SeriesCompareFn = (a: SeriesD, b: SeriesD) => number;
type TooltipFn = (series: SeriesD, dataNode: DataNode) => string;

declare class ProportionsChart {
  constructor(element: HTMLElement, configOptions?: ConfigOptions);

  width(): number;
  width(width: number): ProportionsChart;
  height(): number;
  height(height: number): ProportionsChart;

  data(): SeriesD[];
  data(data: SeriesD[]): ProportionsChart;
  label(): SeriesAccessor<string>;
  label(textAccessor: SeriesAccessor<string>): ProportionsChart;
  size(): SeriesAccessor<number>;
  size(textAccessor: SeriesAccessor<number>): ProportionsChart;
  color(): SeriesAccessor<string>;
  color(textAccessor: SeriesAccessor<string>): ProportionsChart;
  sort(): SeriesCompareFn | null;
  sort(fn: SeriesCompareFn): ProportionsChart;
  showLabels(): boolean;
  showLabels(show: boolean): ProportionsChart;
  tooltipContent(): TooltipFn;
  tooltipContent(fn: TooltipFn): ProportionsChart;

  onClick(cb: (series: SeriesD, event: MouseEvent) => void): ProportionsChart;
  onRightClick(cb: (series: SeriesD, event: MouseEvent) => void): ProportionsChart;
  onHover(cb: (series: SeriesD | null, event: MouseEvent) => void): ProportionsChart;
}

export default ProportionsChart;
