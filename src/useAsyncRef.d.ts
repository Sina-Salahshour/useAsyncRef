import type { MutableRefObject, RefObject } from 'react'

export interface AsyncMutableRefObject<T> extends MutableRefObject<T> {
  readonly asyncCurrent: Promise<Exclude<T, null | undefined>>
}
export interface AsyncRefObject<T> extends RefObject<T> {
  readonly asyncCurrent: Promise<Exclude<T, null | undefined>>
}
export function useAsyncRef<T>(initialValue: T): AsyncMutableRefObject<T>
export function useAsyncRef<T>(initialValue: T | null): AsyncRefObject<T>
export function useAsyncRef<T = undefined>(): AsyncMutableRefObject<
  T | undefined
>
