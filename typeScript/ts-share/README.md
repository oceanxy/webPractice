# 中文文档
https://www.tslang.cn/docs/home.html

# 哪些在用
- vue 3.0
- angular
- ant-design
- react-dnd
- mobx
- rxjs
- jest
- yarn

# 安装

``` 
npm install typescript
```

# vscode下调试

1. tsconfig.json

``` json
{
  "compilerOptions": {
    "removeComments": true,
    "moduleResolution": "node",
    "strict": true,
    "noImplicitAny": true,
    "rootDir": "./src", // 源码根目录
    "module": "commonjs",
    "target": "esnext",
    "outDir": "./dist",　// 编译后js路径
    "sourceMap": true,
    "resolveJsonModule": true,
    "allowJs": true
  },
  "include": [
    "./src"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

２. .vscode/launch.json
``` json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/src/index.ts",
      "preLaunchTask": "tsc: build - tsconfig.json",
      "outFiles": [
        "${workspaceFolder}/dist/**/*.js"
      ]
    }
  ]
}
```

3. F5调试

# 类型

1. 布尔值
2. 数字
3. 字符串
4. 数组
5. 元组 Tuple
6. 枚举
7. any
8. void
9. Null 和 Undefined
10. Never
11. Object

# 接口

1. 可选属性
2. 只读属性
3. 函数类型
4. 可索引的类型
5. 类类型

# 与react搭配使用