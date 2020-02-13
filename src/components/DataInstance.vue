<template>
  <div class="chart">
    <div class="markers">
      <span v-for="m in markers" :key="m.label" :style="{ left: m.left }" class="x">
        <span>{{m.label}}</span>
      </span>
    </div>
    <div class="items">
      <span
        v-for="item in sortedByTime"
        :key="item.epoch"
        :style="itemStyle(item)"
        :class="{focused: active === item.epoch}"
        @click="activate(item.epoch)"
        class="item"
      >
        {{ icon }}
        <span>{{item.time}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    items: { type: Array, required: true }
  },
  data() {
    return {
      active: null,
      markers: this.buildMarkers()
    };
  },
  computed: {
    sortedByTime() {
      return Array.from(this.items).sort((a, b) => {
        if (a.time > b.time) return 1;
        if (a.time < b.time) return -1;
        return 0;
      });
    }
  },
  methods: {
    activate(epoch) {
      if (this.active === epoch) this.active = null;
      else this.active = epoch;
    },
    buildMarkers() {
      const x = [];
      for (let i = 0; i < 7; i++) {
        const label = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i];
        x.push({ left: `${(i / 7) * 100}%`, label });
      }
      return x;
    },
    itemStyle({ dayPosition, weekPosition }) {
      const top = `${(1 - dayPosition) * 100}%`;
      const left = `${(weekPosition + (dayPosition * 1) / 7) * 100}%`;
      return { top, left };
    }
  }
};
</script>

<style lang="scss" scoped>
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
.markers {
  .x {
    position: absolute;
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.2);
    bottom: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-content: flex-end;
    justify-content: flex-end;
    width: 1/7 * 100%;
    &:nth-child(even) {
      background: rgba(255, 255, 255, 0.0125);
    }
    &:nth-child(odd) {
      background: rgba(255, 255, 255, 0.025);
    }
  }
}
.items {
  .item {
    position: absolute;
    font-size: 0.8rem;
    transform: translate(-50%, -50%) translateZ(0);
    span {
      position: absolute;
      left: 50%;
      top: 100%;
      transform: translateX(-50%);
      color: white;
      display: none;
    }
    &.focused span {
      display: block;
    }
  }
}
</style>