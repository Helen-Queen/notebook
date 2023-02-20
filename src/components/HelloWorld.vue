<template>
    <div>
        <el-button @click="open">打开</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
    </div>
</template>
<script>
export default {
    methods: {
        open() {
            this.$message('open');
        }
    }
}

</script>
