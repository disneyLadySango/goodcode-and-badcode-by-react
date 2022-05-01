/** 変数名が適当すぎてどんな処理か全くわからない・・・ */
export const a = (b: number, ...c: number[]): number => {
  const d = c.reduce<number>((p, n) => p + n, 0)
  return d * (1 + b)
}

/** 本当は商品の合計金額（税込）を計算する処理だった */
export const totalPrice = (tax: number, ...itemPrices: number[]): number => {
  const sumPrice = itemPrices.reduce<number>(
    (prevTotal, price) => prevTotal + price,
    0
  )
  return sumPrice * (1 + tax)
}

/** 一人で開発・開発規模が小さければ問題ないかもしれないが規模が大きくなると何しているのかわからなくなる */
