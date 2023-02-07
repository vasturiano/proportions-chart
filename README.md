Proportions Chart
=================

[![NPM package][npm-img]][npm-url]
[![Build Size][build-size-img]][build-size-url]
[![NPM Downloads][npm-downloads-img]][npm-downloads-url]

<p align="center">
     <a href="https://vasturiano.github.io/proportions-chart/example/basic"><img width="100%" src="https://vasturiano.github.io/proportions-chart/example/preview.png"></a>
</p>

An interactive one-dimensional proportions chart for representing categorical data.

## Quick start

```js
import ProportionsChart from 'proportions-chart';
```
or using a *script* tag
```html
<script src="//unpkg.com/proportions-chart"></script>
```
then
```js
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
| <b>tooltipContent</b>([<i>fn</i>]) | Getter/setter for a series object tooltip content accessor function. Use this to specify extra content in each of the segment's tooltips in addition to the series name that's included by default. | *&lt;value (%)*&gt; |
| <b>onClick</b>([<i>fn</i>]) | Callback function for click events. Includes the series object as single argument. | |
| <b>onHover</b>([<i>fn</i>]) | Callback function for mouse hover events. Includes the series object (or `null` if hovering outside the chart area) as single argument. | |


[npm-img]: https://img.shields.io/npm/v/proportions-chart
[npm-url]: https://npmjs.org/package/proportions-chart
[build-size-img]: https://img.shields.io/bundlephobia/minzip/proportions-chart
[build-size-url]: https://bundlephobia.com/result?p=proportions-chart
[npm-downloads-img]: https://img.shields.io/npm/dt/proportions-chart
[npm-downloads-url]: https://www.npmtrends.com/proportions-chart
