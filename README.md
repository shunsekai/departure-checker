# Departure Checker

##　使用技術

- React
- Typescript
- Vite
- React Router
- CSS Modules
- Open-Meteo API

## 機能

- 港一覧表示
- 港名検索
- お気に入り登録・解除
- 閲覧履歴表示
- 現在の天気情報取得
- ボートサイズ別の出港判断

## 工夫した点

- React Routerを使用してページごとのルーティングを実装
- LocalStorageを利用してお気に入りと閲覧履歴を保存
- Open-Meteo APIから現在の天気情報を取得
- 天気情報の取得中・取得失敗時の表示を分けて、状態が分かるようにした
- ボートサイズごとに風速の基準を設定し、出港可能・出港注意・出港不可を判定できるようにした
- TypeScriptを使用して状態やデータに型を設定した

## 起動方法

```bash
npm install
npm run dev
```

ターミナルに表示されたURLにアクセスしてください

## ビルド

```bash
npm run build
```

## 注意事項

このアプリの出港判断は安全を保障するものではありません。
実際の出港については、気象情報や現地の状況を確認したうえで、ご自身で判断してください。

Weather data: Open-Meteo
