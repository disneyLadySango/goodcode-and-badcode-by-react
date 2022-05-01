import { FC, useState, useEffect } from 'react'

/** 技術駆動命名 */
/** Bad */
export const NumberComponent: FC = () => {
  /** 数値なのはわかるが型名を表されても・・・ */
  const [int, setInt] = useState<number>(0)
  /** Flagはプログラミングやコンピュータ用語に基づいている */
  /** 他にはmemoryなどなど */
  const [autoFlag, setAutoFlag] = useState<boolean>(false)

  useEffect(() => {
    if (!autoFlag) return
    const intervalTime = setInterval(() => {
      setInt((prev) => prev + 1)
    }, 1000)

    return () => {
      clearTimeout(intervalTime)
    }
  }, [autoFlag])

  return (
    <div>
      <p>{int}</p>
      <button onClick={() => setInt((prev) => prev + 1)}>+1</button>
      <button onClick={() => setInt((prev) => prev - 1)}>-1</button>
      <button onClick={() => setAutoFlag(prev => !prev)}>
        {autoFlag ? '手動' : '自動'}加算に変更する
      </button>
    </div>
  )
}
/** Good */
export const Counter: FC = () => {
  const [count, setCount] = useState<number>(0)

  const [isAutoIncrement, setAutoIncrement] = useState<boolean>(false)

  useEffect(() => {
    if (!isAutoIncrement) return
    const intervalTime = setInterval(() => {
      setCount((prev) => prev + 1)
    }, 1000)

    return () => {
      clearTimeout(intervalTime)
    }
  }, [isAutoIncrement])

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      <button onClick={() => setCount((prev) => prev - 1)}>-1</button>
      <button onClick={() => setAutoIncrement(prev => !prev)}>
        {isAutoIncrement ? '手動' : '自動'}加算に変更する
      </button>
    </div>
  )
}

/** 連番命名 */
/** Bad */
const ChildComponent01: FC = () => {
  return <div>丸</div>
}
const ChildComponent02: FC = () => {
  return <div>三角</div>
}
export const ParentComponent: FC = () => {
  return (
    <div>
      {/* 例えば連番で作ると・・・デザイン変更で表示順が変わるとこのような結果になる */}
      {/* 連番だけど表示は連番にはならない矛盾 */}
      <ChildComponent02 />
      <ChildComponent01 />
    </div>
  )
}

/** Good */
const CircleText: FC = () => (
  <div>丸</div>
)
const TriangleText: FC = () => (
  <div>三角</div>
)
export const ShapeTexts: FC = () => (
  <div>
    <TriangleText />
    <CircleText />
  </div>
)
