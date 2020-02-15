<template>
  <div class="main">
    <div class="chart">
      <div class="markers">
        <span
          v-for="m in markers"
          :key="m.label"
          :style="{ left: m.left }"
          class="x"
        >
          <span>{{ m.label }}</span>
        </span>
      </div>
      <div class="items">
        <span
          v-for="item in sortedByTime"
          :key="item.epoch"
          :style="itemStyle(item)"
          :class="{ focused: active === item.epoch }"
          @click="activate(item.epoch)"
          class="item"
        >
          {{ icon }}
          <span>{{ item.time }}</span>
        </span>
      </div>
    </div>
    <div class="stats" v-if="stats.first">
      <ul>
        <li>
          {{ stats.first.ago.days }} days of {{ icon }} (est.
          {{ stats.first.date }})
        </li>
        <li>
          {{ stats.total }} &times; {{ icon }} ({{
            (stats.total / stats.first.ago.days).toFixed(3)
          }}
          per day)
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Time from '@/classes/Time';

interface Marker {
  left: string;
  label: string;
}
type Item = Time;

export type InstanceValue = number;

@Component
export default class DataInstance extends Vue {
  @Prop() private icon!: string;
  @Prop({ required: true }) private items!: Array<Item>;

  active: null | number = null;
  markers: Array<Marker> = this.buildMarkers();

  get sortedByTime() {
    return Array.from(this.items).sort((a: Item, b: Item) => {
      if (a.time > b.time) return 1;
      if (a.time < b.time) return -1;
      return 0;
    });
  }

  get stats() {
    const len = this.sortedByTime.length;
    const first = this.sortedByTime[len - 1];
    return {
      first,
      total: len,
    };
  }

  activate(epoch: number) {
    if (this.active === epoch) this.active = null;
    else this.active = epoch;
  }
  buildMarkers() {
    const x = [];
    for (let i = 0; i < 7; i++) {
      const label = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i];
      x.push({ left: `${(i / 7) * 100}%`, label });
    }
    return x;
  }
  itemStyle({ dayPosition, weekPosition }: Time) {
    const top = `${(1 - dayPosition) * 100}%`;
    const left = `${weekPosition * 100 + 14.2857143 / 2}%`;
    return { top, left };
  }
}
</script>

<style scoped>
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.chart {
  flex: 1;
  position: relative;
  margin-bottom: 2rem;
}
.markers,
.items {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.markers .x {
  position: absolute;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.2);
  bottom: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  justify-content: flex-end;
  width: 14.2857143%;
}
.markers .x:nth-child(even) {
  background: rgba(255, 255, 255, 0.0125);
}
.markers .x:nth-child(odd) {
  background: rgba(255, 255, 255, 0.025);
}
.items .item {
  position: absolute;
  font-size: 1.2rem;
  transform: translate(-50%, -50%) translateZ(0);
}
.items .item span {
  position: absolute;
  left: 50%;
  top: 100%;
  font-size: 0.8rem;
  transform: translateX(-50%);
  color: white;
  display: none;
}
.items .item.focused span {
  display: block;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 2rem;
}
</style>
