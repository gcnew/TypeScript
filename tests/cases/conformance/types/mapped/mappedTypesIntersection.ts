// @strictNullChecks: true
// @declaration: true

type A<T> = ObjectHasKey<T, '0'>

type StringContains<S extends string, L extends string> = ({ [K in S]: 'true' } & {
  [key: string]: 'false'
})[L]

type ObjectHasKey<O, L extends string> = StringContains<keyof O, L>


type A1<T> = {
  true: 'true'
  false: 'false'
}[ObjectHasKey<T, '1'>]

type B = ObjectHasKey<[string, number], '1'> // B = "true"
type C = A<[string]> // C = "false"
type E = A1<[string]>
