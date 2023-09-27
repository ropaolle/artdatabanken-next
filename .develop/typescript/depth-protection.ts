// DeepKey type. Move along...

type ComputeRange<
  N extends number,
  Result extends Array<unknown> = []
> = Result['length'] extends N
  ? Result
  : ComputeRange<N, [...Result, Result['length']]>
type Index40 = ComputeRange<40>[number]

// Is this type a tuple?
type IsTuple<T> = T extends readonly any[] & { length: infer Length }
  ? Length extends Index40
    ? T
    : never
  : never

type AllowedIndexes<
  Tuple extends ReadonlyArray<any>,
  Keys extends number = never
> = Tuple extends readonly []
  ? Keys
  : Tuple extends readonly [infer _, ...infer Tail]
  ? AllowedIndexes<Tail, Keys | Tail['length']>
  : Keys

export type DeepKeys<T, TDepth extends any[] = []> = unknown extends T
  ? string
  : object extends T
  ? string
  : T extends readonly any[] & IsTuple<T>
  ? AllowedIndexes<T> | DeepKeysPrefix<T, AllowedIndexes<T>, TDepth>
  : T extends any[]
  ? DeepKeys<T[number], [...TDepth, any]>
  : T extends Date
  ? never
  : T extends object
  ? (keyof T & string) | DeepKeysPrefix<T, keyof T, TDepth>
  : never

type DeepKeysPrefix<
  T,
  TPrefix,
  TDepth extends any[]
> = TPrefix extends keyof T & (number | string)
  ? `${TPrefix}.${DeepKeys<T[TPrefix], [...TDepth, any]> & string}`
  : never

// Oooo, a recursive type!

type Foo = {
  foo: Foo
}

// Give me the keys please!
type FooKeys = DeepKeys<Foo> // Yikes.

// Depth protection!
type LimitDepth<
  T,
  TLength = 5,
  TDepth extends any[] = []
> = TDepth['length'] extends TLength
  ? never
  : T extends object
  ? {
      [K in keyof T]: LimitDepth<T[K], TLength, [any, ...TDepth]>
    }
  : T extends Array<infer U>
  ? Array<LimitDepth<U, TLength, [any, ...TDepth]>>
  : T

type SafeFoo = DeepKeys<LimitDepth<Foo>>

