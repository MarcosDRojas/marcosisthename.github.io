<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { select } from 'd3-selection'
import { zoom as d3zoom, zoomIdentity, type D3ZoomEvent } from 'd3-zoom'
import { feature } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import landTopology from 'world-atlas/land-110m.json'
import { photoLocations } from '../data/photoLocations'

const emit = defineEmits<{
  locationClick: [id: string]
}>()

const width = 960
const height = 500

const projection = geoNaturalEarth1()
  .scale(155)
  .translate([width / 2, height / 2])

const pathGenerator = geoPath(projection)

const landShape = feature(
  landTopology as unknown as Topology,
  (landTopology as unknown as Topology).objects.land as GeometryCollection,
)

const landPath = pathGenerator(landShape as never) ?? ''

const markers = computed(() =>
  photoLocations
    .map((location) => {
      const projected = projection([location.lon, location.lat])
      if (!projected) return null
      return { location, x: projected[0], y: projected[1] }
    })
    .filter((m): m is { location: (typeof photoLocations)[number]; x: number; y: number } => m !== null),
)

const svgRef = ref<SVGSVGElement | null>(null)
const transform = ref({ x: 0, y: 0, k: 1 })

onMounted(() => {
  if (!svgRef.value) return
  const behavior = d3zoom<SVGSVGElement, unknown>()
    .scaleExtent([1, 8])
    .translateExtent([
      [0, 0],
      [width, height],
    ])
    .on('zoom', (event: D3ZoomEvent<SVGSVGElement, unknown>) => {
      transform.value = { x: event.transform.x, y: event.transform.y, k: event.transform.k }
    })

  select(svgRef.value).call(behavior).call(behavior.transform, zoomIdentity)
})
</script>

<template>
  <div class="map-wrap">
    <svg
      ref="svgRef"
      class="map-svg"
      :viewBox="`0 0 ${width} ${height}`"
      role="img"
      aria-label="World map with markers for places I've taken photos"
    >
      <g :transform="`translate(${transform.x},${transform.y}) scale(${transform.k})`">
        <path :d="landPath" class="land" />
        <g
          v-for="marker in markers"
          :key="marker.location.id"
          class="marker"
          :class="{ 'has-photos': marker.location.photos.length > 0 }"
          tabindex="0"
          role="button"
          :aria-label="`${marker.location.name}${marker.location.photos.length ? ' — view photos' : ' — no photos yet'}`"
          @click="emit('locationClick', marker.location.id)"
          @keydown.enter="emit('locationClick', marker.location.id)"
        >
          <circle :cx="marker.x" :cy="marker.y" :r="7 / transform.k" class="marker-ring" />
          <circle :cx="marker.x" :cy="marker.y" :r="3 / transform.k" class="marker-dot" />
        </g>
      </g>
    </svg>
    <p class="map-hint">scroll or pinch to zoom · click a marker to view photos</p>
  </div>
</template>

<style scoped>
.map-wrap {
  border: 1px solid var(--sys-panel-border);
  border-radius: 4px;
  background: var(--sys-panel);
  overflow: hidden;
}

.map-svg {
  width: 100%;
  height: auto;
  display: block;
  cursor: grab;
  touch-action: none;
}

.map-svg:active {
  cursor: grabbing;
}

.land {
  fill: var(--sys-panel-border);
  stroke: var(--sys-ground);
  stroke-width: 0.5;
}

.marker {
  cursor: pointer;
  outline: none;
}

.marker-ring {
  fill: var(--sys-amber-dim);
  stroke: var(--sys-amber);
  stroke-width: 1;
}

.marker-dot {
  fill: var(--sys-amber);
}

.marker:not(.has-photos) .marker-ring {
  fill: transparent;
  stroke: var(--sys-text-soft);
}

.marker:not(.has-photos) .marker-dot {
  fill: var(--sys-text-soft);
}

.marker:hover .marker-ring,
.marker:focus-visible .marker-ring {
  fill: var(--sys-amber);
  fill-opacity: 0.4;
}

.map-hint {
  padding: 0.6rem 0.9rem;
  font-family: var(--sys-mono);
  font-size: 0.7rem;
  color: var(--sys-text-soft);
  border-top: 1px solid var(--sys-panel-border);
  margin: 0;
}
</style>
