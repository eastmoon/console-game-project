# Document

## § Introduction

這是一個使用 node.js 製作的文字地圖冒險遊戲。
計畫目標上，各階段目標如下：

##### 1、基礎系統
> 以 Pipe & Filter 架構為主，合併使用 MVC 的管理架構，時做一個文字互動系統。

##### 2、建立命令
> 完成地圖冒險遊戲的基本命令與操作行為。

##### 3、遊戲時鐘
> 完成初步遊戲時鐘系統，可供各類 AI 演算法掛入，簡單的計算生物、物品再生。

##### 4、世界聯線
> 開啟世界，提供其他完家連入，並互動。
> 連入其他世界時，系統命令僅對個人系統有效，對其他世界無效。

## § Directory

+ [Install](./wiki/install.md)
+ [CLI](./wiki/cli.md)
+ [Configuration](./wiki/configuration.md)

## § Command

+ system
  - exit
  - create
  - describe

+ common
  - goto
  - state
  - equip
  - say

+ praser
  - kill
  - take
  - drop
  - look
  - direction(east, west, north, south, up, down)

## § UI

+ input
+ check
+ radio

## § Update

+ item
+ npc
