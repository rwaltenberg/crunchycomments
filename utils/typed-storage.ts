import { storage } from 'webextension-polyfill'

export interface Bucket<T extends object> {
  get(): Promise<T>
  get(getter: null): Promise<T>
  get<P extends Extract<keyof T, string>>(
    getter: P,
  ): Promise<T[P]>
  get<P extends Extract<keyof T, string>[]>(
    getter: P,
  ): Promise<Partial<T>>
  get<K extends Partial<T>>(getter: K): Promise<K>
  set(setter: Partial<T>): Promise<void>
  remove: (query: string | string[]) => Promise<void>
  clear: () => Promise<void>
}

enum StorageDomain {
  Local = 'local',
  Sync = 'sync',
  Managed = 'managed'
}

function defineStorage<T extends Record<string, any>>(domain: StorageDomain): Bucket<T> {
  return storage[domain] as unknown as Bucket<T>
}

export const localStorage = defineStorage<{
  isEnabled: boolean
}>(StorageDomain.Local)

export const syncStorage = defineStorage<Record<string, unknown>>(StorageDomain.Sync)
export const managedStorage = defineStorage<Record<string, unknown>>(StorageDomain.Managed)
