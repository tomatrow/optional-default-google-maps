import type { MapContext } from "./index.type"
import type { InjectionKey } from "svelte-typed-context"

export const key: InjectionKey<MapContext> = Symbol("map-context-key")

export const clustererImagePath =
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
