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

export interface ProportionsChartGenericInstance<ChainableInstance> {
  (element: HTMLElement): ChainableInstance;

  width(): number;
  width(width: number): ChainableInstance;
  height(): number;
  height(height: number): ChainableInstance;

  data(): SeriesD[];
  data(data: SeriesD[]): ChainableInstance;
  label(): SeriesAccessor<string>;
  label(textAccessor: SeriesAccessor<string>): ChainableInstance;
  size(): SeriesAccessor<number>;
  size(textAccessor: SeriesAccessor<number>): ChainableInstance;
  color(): SeriesAccessor<string>;
  color(textAccessor: SeriesAccessor<string>): ChainableInstance;
  sort(): SeriesCompareFn | null;
  sort(fn: SeriesCompareFn): ChainableInstance;
  showLabels(): boolean;
  showLabels(show: boolean): ChainableInstance;
  tooltipContent(): TooltipFn;
  tooltipContent(fn: TooltipFn): ChainableInstance;

  onClick(cb: (series: SeriesD) => void): ChainableInstance;
  onHover(cb: (series: SeriesD | null) => void): ChainableInstance;
}

export type ProportionsChartInstance = ProportionsChartGenericInstance<ProportionsChartInstance>;

declare function ProportionsChart(configOptions?: ConfigOptions): ProportionsChartInstance;

export default ProportionsChart;
