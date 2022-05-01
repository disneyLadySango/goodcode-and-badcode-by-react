export const calcChangeMeter = (
  money: number,
  ...itemPrices: number[]
): number => {
  /** 商品全部の合計金額を出して・・・ */
  let sumPrice = itemPrices.reduce<number>(
    (prevTotal, price) => prevTotal + price,
    0
  )
  const tax = 0.1
  /** 税込価格を出す */
  sumPrice = sumPrice * (1 + tax)
  /** お釣りを計算する */
  return money - sumPrice
}

/**
 * この実装でも良いかもしれないが変数が目的外のもので使われている
 * 商品の合計金額の税抜き価格と税込価格では意味が異なる
 * 変数を使い回してしまっているが意味通り使うのであれば使いまわさない方がいい
 * （JS/TSではそのためconst定義することで変数の使い回しを制御することが一般的なコーディングとして推奨される）
 */
export const calcChangeMeterFix = (
  money: number,
  ...itemPrices: number[]
): number => {
  /** 商品全部の合計金額を出して・・・ */
  const sumPrice = itemPrices.reduce<number>(
    (prevTotal, price) => prevTotal + price,
    0
  )
  const tax = 0.1
  /** 税込価格を出す */
  const sumPriceInTax = sumPrice * (1 + tax)
  /** お釣りを計算する */
  return money - sumPriceInTax
}
