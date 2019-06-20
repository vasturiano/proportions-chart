Proportions Chart
=================

[![NPM package][npm-img]][npm-url]
[![Build Size][build-size-img]][build-size-url]
[![Dependencies][dependencies-img]][dependencies-url]

<p align="center">
     <a href="https://vasturiano.github.io/proportions-chart/example/basic"><img width="80%" src="https://vasturiano.github.io/proportions-chart/example/preview.png"></a>
</p>

An interactive one-dimensional proportions chart for representing categorical data.

## Quick start

```
import ProportionsChart from 'proportions-chart';
```
or
```
const ProportionsChart = require('proportions-chart');
```
or even
```
<script src="//unpkg.com/proportions-chart"></script>
```
then
```
const myChart = ProportionsChart();
myChart(<myDOMElement>)
    .data(<myData>);
```

## API reference

| Method | Description | Default |
| --- | --- | :--: |
| <b>data</b>([<i>array</i>]) | Getter/setter for the chart data, as an array of series objects, each representing a chart segment. | `[]` |
| <b>width</b>([<i>number</i>]) | Getter/setter for the chart width in px. | *&lt;window width&gt;* |
| <b>height</b>([<i>number</i>]) | Getter/setter for the chart height in px. | *&lt;window height&gt;* |
| <b>label</b>([<i>string</i> or <i>fn</i>]) | Getter/setter for a series object label accessor, used to display labels on the segments and their tooltips. | `name` |
| <b>size</b>([<i>string</i> or <i>fn</i>]) | Getter/setter for a series object size accessor, used to compute the length of the segments. | `value` |
| <b>color</b>([<i>string</i> or <i>fn</i>]) | Getter/setter for a series object color accessor, used to color the segments. | <i>grey</i> |
| <b>sort</b>([<i>fn</i>]) | Getter/setter for the compare method used to sort the series. A value of `null` (*default*) maintains the existing order found in the input data structure. This method receives two arguments representing two series objects and expects a numeric return value (`-1`, `0` or `1`) indicating the order. For example, to order segments by size, use: `(a, b) => b.size - a.size`. | *&lt;existing order*&gt; |
| <b>showLabels</b>([<i>boolean</i>]) | Getter/setter for whether to show labels in the segments. Regardless of this setting, labels too large to fit within a segment's boundaries are automatically hidden. | `true` |
| <b>tooltipContent</b>([<i>string</i> or <i>fn</i>]) | Getter/setter for a series object tooltip content accessor. Use this to specify extra content in each of the segment's tooltips in addition to the series name that's included by default. | *&lt;value (%)*&gt; |
| <b>onClick</b>([<i>fn</i>]) | Callback function for click events. Includes the series object as single argument. | |


[npm-img]: https://img.shields.io/npm/v/proportions-chart.svg
[npm-url]: https://npmjs.org/package/proportions-chart
[build-size-img]: https://img.shields.io/bundlephobia/minzip/proportions-chart.svg
[build-size-url]: https://bundlephobia.com/result?p=proportions-chart
[dependencies-img]: https://img.shields.io/david/vasturiano/proportions-chart.svg
[dependencies-url]: https://david-dm.org/vasturiano/proportions-chart
