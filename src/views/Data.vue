<template>
  <section>
    <div class="chart">
      <div class="markers">
        <span v-for="m in markers" :key="m.label" :style="{ left: m.left }" class="x">
          <span>{{m.label}}</span>
        </span>
      </div>
      <div class="poops">
        <span
          v-for="poop in sortedByTime"
          :key="poop.epoch"
          :style="poopStyle(poop)"
          :class="{focused: active === poop.epoch}"
          @click="activate(poop.epoch)"
          class="poop"
        >
          💩
          <span>{{poop.time}}</span>
        </span>
      </div>
    </div>
    <router-link to="/">Controller</router-link>
  </section>
</template>

<script>
export default {
  name: "data",
  props: {
    poops: { type: Array, required: true }
  },
  data() {
    return {
      active: null,
      markers: this.buildMarkers()
    };
  },
  computed: {
    sortedByTime() {
      return Array.from(this.poops).sort((a, b) => {
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
    poopStyle({ dayPosition, weekPosition }) {
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
.poops {
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
.poops {
  .poop {
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