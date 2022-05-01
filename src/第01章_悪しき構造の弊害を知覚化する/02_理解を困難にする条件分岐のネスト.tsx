import { FC, useState, useMemo } from 'react'

const useForm = (initValue: string = '') => {
  const [value, setValue] = useState<string>(initValue)

  const onChange = (newValue: string): void => {
    setValue(newValue)
  }

  return [value, onChange] as const
}

/** 何重にもネストしたロジック */
/** Bad */
export const BadAccountForm:FC = () => {
  const [firstName, setFirstName] = useForm()
  const [lastName, setLastName] = useForm()
  const [age, setAge] = useForm('0')
  const [address, setAddress] = useForm()

  const disabled = useMemo(() => {
    /** 何重にもネストした構造になっている */
    if (firstName) {
      if (lastName) {
        if (age) {
          if (address) {
            return false
          }
        }
      }
    }
    return true
    /** 例えば以下のようにしても条件が増えると読みづらくなっていくので気をつけたい */
    /** return !firstName || !lastName || !age || !address */
  }, [firstName, lastName, age, address])

  return (
    <div>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <input value={age} onChange={(e) => setAge(e.target.value)} />
      <input value={address} onChange={(e) => setAddress(e.target.value)} />
      <button disabled={disabled}>
        submit
      </button>
    </div>
  )
}

/** Good */
export const GoodAccountForm:FC = () => {
  const [firstName, setFirstName] = useForm()
  const [lastName, setLastName] = useForm()
  const [age, setAge] = useForm('0')
  const [address, setAddress] = useForm()

  const disabled = useMemo(() => {
    /** 条件が途切れるならreturnできるタイミングでreturnしてしまう */
    if (!firstName) return true
    if (!lastName) return true
    if (!age) return true
    if (!address) return true
    return false
  }, [firstName, lastName, age, address])

  return (
    <div>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <input value={age} onChange={(e) => setAge(e.target.value)} />
      <input value={address} onChange={(e) => setAddress(e.target.value)} />
      <button disabled={disabled}>
        submit
      </button>
    </div>
  )
}

/** 巨大なネスト */
export const nestLogicUtils = (condition1: boolean, condition2: boolean) => {
  let hoge = 'fuga'
  if (condition1) {
    /**
     * こ
     * ん
     * な
     * 感
     * じ
     * で
     * と
     * に
     * か
     * く
     * 長
     * い
     * 処
     * 理
     * が
     * 書
     * か
     * れ
     * て
     * い
     * る
     * と
     * 読
     * み
     * に
     * く
     * い
     * し
     * 、
     * も
     * う
     * i
     * f
     * 文
     * の
     * t
     * r
     * u
     * e
     * の
     * 処
     * 理
     * だ
     * っ
     * た
     * こ
     * と
     * を
     * 忘
     * れ
     * て
     * い
     * る
     */
    if (condition2) {
      hoge = 'test'
      /**
       * ここもやたら長い処理があるともはや何も覚えていない
       * というかこのifってどこのネストに入っているんだっけ？レベル
       */
    } else {
      hoge = 'sample'
      /**
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       * という感じで
       * こうやってifの中でさらに長い文章があると
       * もう読めない
       *
       *
       *
       *
       * なんでこの処理に
       * 来ていたのかももはや忘れる
       * そしてこんだけ長いんだから
       * この中にもifがあるかもしれない
       */
    }
  } else {
    /**
     * 突如現れたelse文
     * お前・・・誰のifのelseだっけ？状態
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     */
  }

  /** え？このhogeってどこにいたんだっけ・・・そしてどういう時に何が返却されるんだっけ・・・状態になる */
  return hoge
}
