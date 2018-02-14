# Configuration

```
{
    // 系統狀態。
    // 此設置在系統初始、啟動時所需要的主要參數，最初命令、使用呈現模板等。
    status: {
        command: {
            cmd: "",
            param: []
        },
        view: ""
    },
    // 插件配置
    // 系統啟動時會由 plugin/macro 下取得命令並儲存。
    // 在任何情況下命令共有四個來源，系統、共用、解析、指定、忽略，前三者為此處設定，後兩者則是地圖夾帶資訊。
    plugin: {
        system: [],
        common: [],
        parser: {}
    }
}
```

## § Status

## § Plugin
