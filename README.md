# 複数のGA4プロパティにカスタムディメンションを一括作成

[GA4で複数プロパティを自動作成](https://github.com/ajaxbarcelonacruyff/ga4_create_multi_properties/blob/e8858e91d93c028ee908a33d22c38fdd4c4f11ac/README.md)にて、GA4のプロパティを一括作成する方法を紹介しました。今回はその続きで、各プロパティにカスタムディメンションを一括作成する方法を紹介します。

手順は以下になります。

1. カスタムディメンションのリストを作成
2. 対象のGA4プロパティ一覧を読み込む（今回は省略）
3. カスタムディメンションのリストを読み込み一括作成

# カスタムディメンションのリストを作成

作成するカスタムディメンションの一覧をGoogle Sheetに作成します。

- シート名：customdimensions
- A列：カスタムディメンション名
- B列：スコープ（EVENT、USER）

# Google Apps Scriptの作成
今回もGoogle Analytics Admin APIをを使用しますが、この設定方法は[前回の記事]((https://github.com/ajaxbarcelonacruyff/ga4_create_multi_properties/blob/e8858e91d93c028ee908a33d22c38fdd4c4f11ac/README.md))を参照願います。

## 対象のGA4プロパティ一覧を読み込む
こちらはGoogle SheetにGA4プロパティの一覧を作成し、そのシートを読み込むだけなので、今回は省略して、Google Apps Script内の配列変数に直接入れます。

## カスタムディメンションの一覧を読み込む
先ほどGoogle Sheetに作成したカスタムディメンションの一覧を読み込む関数getCustomDimensionsFromSheet()を作成します。

このgetCustomDimensionsFromSheet()関数は下記の属性を含めた変数の配列を返します。

例：
- displayName: “customer_status”
- parameterName: “customer_status”
- scope: “USER”

## GA4プロパティにカスタムディメンションを作成

上記で取得した情報をGA4プロパティに1つずつ作成します。ここでは1つのカスタムディメンションを作成する関数createCustomDimension()を作成します。

最後に、上記をGA4プロパティ個数×カスタムディメンション個数分繰り返すmain()関数を作成します。



