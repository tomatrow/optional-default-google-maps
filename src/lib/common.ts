import type { MapContext } from "./index.type"
import type { InjectionKey } from "optional-default-site-kit/utility"
import { writable } from "svelte/store"

export const key: InjectionKey<MapContext> = Symbol("map-context-key")
export const isMapsLoaded = writable(false)
export const isMapsLoading = writable(false)
