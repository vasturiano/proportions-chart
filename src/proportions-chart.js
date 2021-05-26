import { select as d3Select, pointer as d3Pointer } from 'd3-selection';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { pie as d3Pie } from 'd3-shape';
import { transition as d3Transition } from 'd3-transition';
import Kapsule from 'kapsule';
import tinycolor from 'tinycolor2';
import accessorFn from 'accessor-fn';

const TRANSITION_DURATION = 800;
const HOVER_REL_MARGIN = 0.18; // How much (relative) margin to save for hover interaction enlarging
const CHAR_WIDTH_PER_FONT_SIZE = 0.55;

const MAIN_LABEL_FONTSIZE = 12;
const SUB_LABEL_FONTSIZE = 10;
const MAIN_LABEL_Y_OFFSET = -0.47;
const SUB_LABEL_Y_OFFSET = 0.77;

export default Kapsule({

  props: {
    width: { default: window.innerWidth },
    height: { default: window.innerHeight },
    data: { default: [], onChange: function() { this._parseData(); }},
    sort: { onChange: function() { this._parseData(); }},
    label: { default: d => d.name },
    size: {
      default: 'value',
      onChange: function() { this._parseData(); }
    },
    color: { default: d => 'lightgrey' },
    showLabels: { default: true },
    tooltipContent: { triggerUpdate: false },
    onClick: { triggerUpdate: false },
    onHover: { triggerUpdate: false }
  },

  methods: {
    _parseData: function(state) {
      const chartData = d3Pie()
        .endAngle(1) // stack values up to unity
        .sort(state.sort || null)
        .value(d => d.value)
        (state.data || []);

      chartData.forEach((d, i) => {
        d.id = i; // Mark each node with a unique ID
        d.data.__dataNode = d; // Dual-link data nodes
      });

      state.layoutData = chartData;
    }
  },

  stateInit: () => ({
    chartId: Math.round(Math.random() * 1e12), // Unique ID for DOM elems
    widthScale: d3ScaleLinear(),
    heightScale: d3ScaleLinear()
  }),

  init: function(domNode, state) {
    const el = d3Select(domNode)
      .append('div').attr('class', 'proportions-viz');

    state.svg = el.append('svg');
    state.canvas = state.svg.append('g');

    // tooltips
    state.tooltip = el.append('div')
      .attr('class', 'proportions-tooltip');

    state.canvas.on('mousemove', ev => {
      const mousePos = d3Pointer(ev);
      state.tooltip
        .style('left', mousePos[0] + 'px')
        .style('top', mousePos[1] + 'px')
        .style('transform', `translate(-${mousePos[0] / state.width * 100}%, 54px)`); // adjust horizontal position to not exceed canvas boundaries
    });

    // detect hover out events
    state.svg.on('mouseover', () => state.onHover && state.onHover(null));
  },

  update: function(state) {
    state.widthScale.range([0, state.width]);
    state.heightScale.range([0, state.height * (1 - HOVER_REL_MARGIN)]);

    state.svg
      .style('width', state.width + 'px')
      .style('height', state.height + 'px')
      .attr('viewBox', `0 ${-state.height/2} ${state.width} ${state.height}`);

    const valSum = state.layoutData.reduce((agg, d) => agg + d.value, 0);
    const getPerc = d => (d.value / valSum) * 100;

    const segment = state.canvas.selectAll('.segment')
      .data(state.layoutData, d => d.id);

    const nameOf = accessorFn(state.label);
    const colorOf = accessorFn(state.color);
    const transition = d3Transition().duration(TRANSITION_DURATION);

    // Exiting
    segment.exit().transition(transition).style('opacity', 0).remove();

    // Entering
    const newSegment = segment.enter().append('g')
      .attr('class', 'segment')
      .style('opacity', 0)
      .on('click', (ev, d) => {
        ev.stopPropagation();
        state.onClick && state.onClick(d.data);
      })
      .on('mouseover', (ev, d) => {
        ev.stopPropagation();
        state.onHover && state.onHover(d.data);

        state.tooltip.style('display', 'inline');
        state.tooltip.html(`<div class="tooltip-title">
          ${nameOf(d.data)}
        </div>${state.tooltipContent ? state.tooltipContent(d.data, d) : `<div>
          <b>${d.value}</b> (<i>${roundPercentage(getPerc(d), 2)}%</i>)
        </div`}`);
      })
      .on('mouseout', () => { state.tooltip.style('display', 'none'); });

    newSegment.append('rect')
      .attr('id', d => `segment-${d.id}`)
      .attr('x', d => state.widthScale((d.startAngle + d.endAngle) / 2))
      .attr('y', 0)
      .attr('width', 0)
      .attr('height', 0)
      .style('fill', d => colorOf(d.data, d.parent));

    newSegment.append('clipPath')
      .attr('id', d => `clip-${d.id}`)
      .append('use')
        .attr('xlink:href', d => `#segment-${d.id}`);

    const labels = newSegment.append('g')
      .attr('clip-path', d => `url(#clip-${d.id})`)
      .append('g')
        .attr('class', 'label-container')
        .attr('transform', d => `translate(${state.widthScale((d.startAngle + d.endAngle) / 2)}, 0) scale(0)`);

    labels.append('text')
      .attr('class', 'main-label')
      .attr('transform', `translate(0, ${MAIN_LABEL_FONTSIZE * MAIN_LABEL_Y_OFFSET})`);
    labels.append('text')
      .attr('class', 'sub-label')
      .attr('transform', `translate(0, ${SUB_LABEL_FONTSIZE * SUB_LABEL_Y_OFFSET})`);

    // Entering + Updating
    const allSegments = segment.merge(newSegment);

    allSegments
      .style('cursor', state.onClick ? 'pointer' : null)
      .transition(transition).style('opacity', 1);

    allSegments.select('rect')
      .transition(transition)
        .attr('id', d => `segment-${d.id}`)
        .attr('x', d => state.widthScale(d.startAngle))
        .attr('y', -state.heightScale(1) / 2)
        .attr('width', d => state.widthScale(d.endAngle - d.startAngle))
        .attr('height', state.heightScale(1))
        .style('fill', d => colorOf(d.data));

    allSegments.select('.label-container')
      .classed('light', d => !tinycolor(colorOf(d.data, d.parent)).isLight())
      .transition(transition)
        .attr('transform', d => `translate(${state.widthScale((d.startAngle + d.endAngle) / 2)}, 0) scale(1)`);

    allSegments.select('.main-label')
      .text(d => nameOf(d.data))
      .attr('transform', d => `translate(0, ${textFits(d, 'foo', SUB_LABEL_FONTSIZE * SUB_LABEL_Y_OFFSET, SUB_LABEL_FONTSIZE) ? MAIN_LABEL_FONTSIZE * MAIN_LABEL_Y_OFFSET : 0})`)
      .style('display', d => state.showLabels && textFits(d, nameOf(d.data),
        textFits(d, 'foo', SUB_LABEL_FONTSIZE * SUB_LABEL_Y_OFFSET, SUB_LABEL_FONTSIZE) ? MAIN_LABEL_FONTSIZE * MAIN_LABEL_Y_OFFSET : 0,
        MAIN_LABEL_FONTSIZE) ? null : 'none');

    allSegments.select('.sub-label')
      .text(d => `${roundPercentage(getPerc(d))}%`)
      .attr('transform', `translate(0, ${SUB_LABEL_FONTSIZE * SUB_LABEL_Y_OFFSET})`)
      .style('display', d => state.showLabels
        && textFits(d, nameOf(d.data), MAIN_LABEL_FONTSIZE * MAIN_LABEL_Y_OFFSET, MAIN_LABEL_FONTSIZE)
        && textFits(d, `${roundPercentage(getPerc(d))}%`, SUB_LABEL_FONTSIZE * SUB_LABEL_Y_OFFSET, SUB_LABEL_FONTSIZE)
          ? null : 'none'
      );

    //

    function textFits(d, text, yOffset = 0, fontSize) {
      const minRectHeight = fontSize + Math.abs(yOffset) * 2;
      const minRectWidth = text.length * fontSize * CHAR_WIDTH_PER_FONT_SIZE;

      return state.heightScale(1) >= minRectHeight && state.widthScale(d.endAngle - d.startAngle) >= minRectWidth;
    }
  }
});

//

function roundPercentage(val, roundDecimalCases = 0) {
  const roundDiv = Math.pow(10, roundDecimalCases);

  // Treat ~0% and ~100% values specially so the precision is surfaced
  return val > 99
    ? 100 - +(100 - val).toPrecision(1)
    : val < 1
    ? +val.toPrecision(1)
    : Math.round(val * roundDiv) / roundDiv;
}
