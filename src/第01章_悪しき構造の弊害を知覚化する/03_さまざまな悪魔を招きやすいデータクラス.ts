/**
 * Reactで説明できないのでTypeScriptで説明します
 */

/**
 * ユーザ名を管理するデータクラス
 * - 苗字、名前を持つ
 * - 登録時はいずれも必須
 */
export class UserName {
  firstName: string | undefined /** ex. 太郎 */
  lastName: string | undefined /** ex. 田中 */
}

/** 1. 仕様変更時に牙を剥く */
/**
 * 例えば下記のコードはユーザ名を表示する処理です
 * ユーザ名は
 * - ヘッダー
 * - マイページ
 * などなどで表示されています
 */
const userName = new UserName()
userName.firstName = '太郎'
userName.lastName = '田中'
const name = `${userName.lastName} ${userName.firstName}`
console.log(name) // 田中 太郎

/*
 * もともと日本向けのサービスでしたが海外向けに展開することになりました
 * これまでは日本向けのだったので「lastName firstName」という並びで表示していましたが、
 * 海外向けにするため、これを「firstName lastName」という表示にしたいという要望が出ました
 *
 * そうなった際に表示するデータの生成ロジックがあちこちに点在しているので、
 * 修正箇所が山ほど出てきます
 *
 * 名前の表示は一貫しているのにデータやロジックが分散し、低凝集な状態です
 */

/** 2. 重複コード */
/**
 * 名前の表示についてはあちこちで生成処理が生まれているので重複コードが生まれます
 */

/** 3. 修正漏れ */
/**
 * もちろん上記のため修正漏れも発生しがちです
 */

/** 4.可読性低下 */
/**
 * 今回のような例ならいいですが、
 * 例えば消費税の計算などがあちこちに点在していると可読性も低下します
 * 本来同一のコードであるものが点在しているので、行数も増え読みにくいコードになります
 */

/** 5.未初期化状態（生焼けオブジェクト） */
/**
 * 例えば以下のような状態です
 */
const userNameInit = new UserName()
const emptyName = `${userNameInit.lastName} ${userNameInit.firstName}`
console.log(emptyName) // undefined undefined
/**
 * プロパティの初期化をさらに実行して初めて値が使えるのでnewしただけだとこのような状態になってしまいます
 */

/** 6.不正値の混入 */
const errorUserName = new UserName()
errorUserName.firstName = String(true)
errorUserName.lastName = JSON.stringify({ hoge: 1 })
/**
 * このように本来名前が入るところに想定外の値が入る可能性もあります
 */

/** 解消例 */
class UserNameImpl {
  /**
   * firstNameとlastNameが外に公開されていると個別で使用される可能性がある
   * そのためclass内でしか使えないようにprivateにしてあげることで制約をつける
   */

  private firstName: string /** ex. 太郎 */
  private lastName: string /** ex. 田中 */

  /**
   * UserName classを使うにはfirstNameとlastNameは値が入っている必要がある
   * そのため初期化＝コンストラクタで受け取れるようにする
   */
  constructor(firstName: string, lastName: string) {
    // さらにここにバリデーションを入れても良い
    // 今回は割愛します
    this.firstName = firstName
    this.lastName = lastName
  }

  /**
   * ユーザ名を取得する
   * 順番を入れ替える、名前を*でマスキングをするなどの条件が入ってきたらここで対応できる
   */
  getUserName(): string {
    return `${this.firstName} ${this.lastName}`
  }
}

// 利用側は初期化時に値を詰めるのであとは使いたいように使えば良い
const users: Array<UserNameImpl> = [
  new UserNameImpl('太郎', '田中'),
  new UserNameImpl('太郎', '山田'),
]
users.forEach((u) => {
  console.log(u.getUserName())
})
