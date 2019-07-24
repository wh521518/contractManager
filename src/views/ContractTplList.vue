<template>
  <div class="ContractList">
    <el-row>
      <router-link :to="{ name: 'ContractTplCreate', query: {id: founder}}">
        <el-button @>添加合同模板</el-button>
      </router-link>
    </el-row>
    <el-table ref="filterTable" :data="tableData" style="width: 100%">
      <el-table-column
        prop="addTime"
        label="创建时间"
        :formatter="timeFormat"
        sortable
        width="180"
        column-key="addTime"
      />
      <el-table-column prop="title" label="标题" width="220" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="description" label="主要属性" />
      <el-table-column prop="content" label="内容" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="viewContract(scope.row)">查看内容</el-button>
          <template v-if="scope.row.founder">
            <el-button type="text" size="small" @click="editContract(scope.row)">编辑内容</el-button>
          </template>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="attrList(scope.row)">属性列表</el-button>
          <el-button type="text" size="small" @click="useTpl(scope.row)">使用</el-button>
          <el-button type="text" size="small" @click="deleteTpl(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      founder: 0
    };
  },
  created() {
    this.founder = this.$route.query.id || 0;
    this.fetchDate();
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date');
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    viewContract(row) {
      this.$router.push({
        name: 'ContractView',
        query: { tplId: row._id }
      });
    },
    deleteTpl(row) {
      this.$axios
        .delete('/api/v1/contracttpl', {
          params: {
            _id: row._id
          }
        })
        .then(res => {
          if (!res.data.code) {
            this.fetchDate();
          }
        });
      this.$axios
        .delete('/api/v1/contracttplattrmany', {
          params: {
            tplId: row._id
          }
        })
        .then(res => {
          if (!res.data.code) {
            this.fetchDate();
          }
        });
    },
    editContract(row) {
      this.$router.push({
        name: 'ContractTplModify',
        query: { tplId: row._id }
      });
    },
    attrList(row) {
      this.$router.push({
        name: 'ContractTplAttrList',
        query: { tplId: row._id }
      });
    },
    timeFormat(row) {
      return this.formatTime(new Date(row.addTime), 'YYYY-MM-DD HH:mm');
    },
    useTpl(row) {
      this.$router.push({
        name: 'ContractCreateS1',
        query: { tplId: row._id }
      });
    },
    fetchDate() {
      this.$axios
        .get('/api/v1/contracttpl', {
          params: {
            founder: this.founder
          }
        })
        .then(
          res => {
            // console.log("----------------");
            // console.log(res);
            this.tableData = res.data.data;
          },
          err => {
            console.log('---------err---------');
            console.log(err);
          }
        );
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.founder = to.query.id;
    // console.log(this.founder);
    this.fetchDate();
    next();
  }
  // TODO 数据分页
};
</script>
<style lang="scss" scoped>
.el-row {
  height: 60px;
  line-height: 60px;
  background-color: white;
  border: 1px solid #dcdfe6;
  text-align: left;
  margin-bottom: 20px;
  padding-left: 20px;
}

.el-table {
  border: 1px solid #dcdfe6;
}
</style>
