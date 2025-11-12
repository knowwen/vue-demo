<template>
    <!-- 1. 筛选表单：行内布局，紧凑展示 -->
   <!-- 1. 筛选表单：行内布局，紧凑显示 -->
  <a-form 
    :model="searchForm" 
    layout="inline" 
    @finish="handleSearch" 
    class="mb-4"
  >
    <!-- 筛选字段1：姓名模糊查询 -->
    <a-form-item label="姓名" name="username">
      <a-input 
        v-model:value="searchForm.username" 
        placeholder="请输入姓名" 
        style="width: 180px"
      />
    </a-form-item>

    <!-- 筛选字段2：状态下拉选择 -->
    <a-form-item label="状态" name="status">
      <a-select 
        v-model:value="searchForm.status" 
        placeholder="全部状态" 
        style="width: 180px"
      >
        <a-select-option value="">全部</a-select-option>
        <a-select-option value="active">启用</a-select-option>
        <a-select-option value="inactive">禁用</a-select-option>
      </a-select>
    </a-form-item>

    <!-- 筛选按钮组 -->
    <a-form-item>
      <a-button type="primary" html-type="submit">查询</a-button>
      <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
    </a-form-item>
  </a-form>

  <!-- 2. 数据表格：展示筛选后的数据 -->
  <a-table 
    :columns="tableColumns" 
    :data-source="filteredTableData"  
    rowKey="id"
    :pagination="{ pageSize: 5, showSizeChanger: true  }"  
    :loading="tableLoading"  
  />
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { Form, FormItem, Input, Select, Table, Button, Spin } from 'ant-design-vue';

// 1. 原始数据源（实际项目中可能从接口获取）
const originalTableData = ref([
  { id: 1, username: '张三', status: 'active', age: 25, role: '管理员' },
  { id: 2, username: '李四', status: 'inactive', age: 30, role: '普通用户' },
  { id: 3, username: '王五', status: 'active', age: 28, role: '普通用户' },
  { id: 4, username: '赵六', status: 'active', age: 35, role: '管理员' },
  { id: 5, username: '孙七', status: 'inactive', age: 22, role: '普通用户' }
]);

// 2. 筛选表单数据（初始为空，即“默认显示全部数据”）
const searchForm = ref({
  username: '',    // 姓名筛选条件
  status: ''       // 状态筛选条件
});

// 3. 表格加载状态（可选，模拟接口请求时的加载动画）
const tableLoading = ref(false);

// 4. 表格列配置
const tableColumns = ref([
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: '姓名', dataIndex: 'username', key: 'username' },
  { title: '年龄', dataIndex: 'age', key: 'age', width: 80 },
  { title: '状态', dataIndex: 'status', key: 'status', 
    render: (status) => status === 'active' ? `<span style="color: green">启用</span>` : `<span style="color: red">禁用</span>`
  },
  { title: '角色', dataIndex: 'role', key: 'role' }
]);

// 5. 筛选后的数据（用computed自动响应筛选条件变化）
const filteredTableData = computed(() => {
  const { username, status } = searchForm.value;
  return originalTableData.value.filter(item => {
    // 姓名模糊匹配（忽略大小写）
    const matchUsername = username 
      ? item.username.toLowerCase().includes(username.toLowerCase()) 
      : true;
    // 状态精确匹配（空则匹配所有）
    const matchStatus = status ? item.status === status : true;
    // 同时满足所有筛选条件
    return matchUsername && matchStatus;
  });
});

// 6. 点击“查询”触发的筛选事件（此处computed已自动响应，可加加载状态优化体验）
const handleSearch = () => {
  tableLoading.value = true;
  // 模拟接口请求延迟（实际项目中替换为接口调用）
  setTimeout(() => {
    tableLoading.value = false;
  }, 500);
};

// 7. 点击“重置”：清空筛选条件，恢复显示全部数据
const handleReset = () => {
  searchForm.value = { username: '', status: '' };
};
</script>
<style lang="css" scoped>
</style>