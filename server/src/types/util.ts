export type Maybe<T> = T | null | undefined

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type Remove<T, U extends T> = T extends U ? never : T

// export type ExcludeUndefined<T> = {
// 	[P in keyof T]: undefined extends T[P]
// 		? ExcludeUndefined<Remove<T[P], undefined>>
// 		: T[P] extends (infer U)[]
// 		? undefined extends U
// 			? Remove<U, undefined>[]
// 			: T[P]
// 		: T[P] extends object
// 		? ExcludeUndefined<T[P]>
// 		: T[P]
// }
