# a-table-query-header

[![npm](https://img.shields.io/npm/v/@ssgeek/a-table-query-header)](https://www.npmjs.com/package/@ssgeek/a-table-query-header)

一个基于 [Arco Design Vue](https://arco.design/vue/docs/start) 的通用查询表单组件，快速构建带有查询、重置和展开/收起功能的表单头部

项目参考`@dangojs/a-query-header`，但本项目为完全实现（因为不知道`@dangojs/a-query-header`的源码），利用 Arco Design Grid 的原生特性（如 `collapsed` 和 `suffix`），

## ✨ 特性

在`@dangojs/a-query-header`的基础上

- 支持`showButtonIcon`属性，可以设置是否显示默认按钮的图标
- 支持通过父组件传入按钮的文案，这在需要本地化时非常有用
- 支持自定义添加额外的按钮，通过`#extra`插槽实现，例如你觉得这些按钮不够用

## 📦 安装

```bash
npm install @ssgeek/a-table-query-header
```

## 🚀 使用

只需将你的 `<a-form-item>` 元素作为子组件传入即可，组件会自动处理布局和交互。

```vue
<template>
  <a-card>
    <a-table-query-header
      :model="formModel"
      :num-col="4"
      @submit="handleSearch"
      @reset="handleReset"
    >
      <!-- 在这里放置 a-form-item 元素 -->
      <a-form-item field="name" label="姓名">
        <a-input v-model="formModel.name" placeholder="请输入姓名" />
      </a-form-item>
      <a-form-item field="age" label="年龄">
        <a-input-number v-model="formModel.age" placeholder="请输入年龄" />
      </a-form-item>
      <a-form-item field="status" label="状态">
        <a-select v-model="formModel.status" placeholder="请选择状态">
          <a-option :value="1">在线</a-option>
          <a-option :value="0">离线</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="address" label="地址">
        <a-input v-model="formModel.address" placeholder="请输入地址" />
      </a-form-item>
      <a-form-item field="date" label="日期">
        <a-date-picker v-model="formModel.date" />
      </a-form-item>

      <!-- 通过 #extra 插槽添加额外按钮 -->
      <template #extra>
        <a-button @click="handleExport">导出</a-button>
      </template>
    </a-table-query-header>
  </a-card>
</template>

<script setup>
import { reactive } from 'vue';
// 如果没有全局注册，请确保导入组件
// import AQueryHeader from '@ssgeek/a-table-query-header';

const formModel = reactive({
  name: '',
  age: null,
  status: null,
  address: '',
  date: '',
});

const handleSearch = (model) => {
  console.log('查��参数:', model);
  // 在此执行查询逻辑
};

const handleReset = () => {
  console.log('重置表单');
  // 在此执行重置逻辑
  Object.keys(formModel).forEach(key => {
    formModel[key] = null;
  });
};

const handleExport = () => {
  console.log('导出数据...');
}
</script>
```

## 📚 API

### Props 属性

| 属性名           | 说明                   | 类型      | 默认值     |
| ---------------- | ---------------------- | --------- | ---------- |
| `model`          | 表单数据对象           | `Object`  | `required` |
| `layout`         | 表单布局               | `String`  | `'inline'` |
| `numCol`         | 每行显示的列数         | `Number`  | `4`        |
| `searchText`     | 查询按钮的文本         | `String`  | `'查询'`   |
| `resetText`      | 重置按钮的文本         | `String`  | `'重置'`   |
| `expandText`     | 展开按钮的文本         | `String`  | `'展开'`   |
| `collapseText`   | 收起按钮的文本         | `String`  | `'收起'`   |
| `hideSearchBtn`  | 是否隐藏查询按钮       | `Boolean` | `false`    |
| `hideResetBtn`   | 是否隐藏重置按钮       | `Boolean` | `false`    |
| `showButtonIcon` | 是否显示默认按钮的图标 | `Boolean` | `false`    |

### Events 事件

| 事件名        | 说明                     | 回调参数                         |
| ------------- | ------------------------ | -------------------------------- |
| `submit`      | 点击查询按钮时触发       | `(model: Object)` - 当前表单数据 |
| `reset`       | 点击重置按钮时触发       | -                                |
| `auto-submit` | 在表单内按下回车键时触发 | `(model: Object)` - 当前表单数据 |

### Slots 插槽

| 插槽名    | 说明                                  |
| --------- | ------------------------------------- |
| `default` | 用于放置 `<a-form-item>` 组件的主插槽 |
| `extra`   | 用于在按钮组右侧添加额外按钮或内容    |
