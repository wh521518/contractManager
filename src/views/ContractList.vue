<template>
  <div class="ContractList">
    <el-table ref="filterTable" :data="tableData" style="width: 100%; border: 2px solid #DCDFE6">
      <el-table-column prop="addTime" label="创建时间" :formatter="timeFormat" width="155" />
      <el-table-column prop="title" label="合同名称" />
      <el-table-column prop="attrName" label="模板名称" />
      <el-table-column prop="state" label="合同状态" :formatter="stateFormat" />
      <el-table-column prop="partyB" label="客户" />
      <el-table-column prop="posTag" label="内容" width="220">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="viewContract(scope.row)">查看内容</el-button>
          <el-button type="text" size="small" @click="editAttr(scope.row)">编辑属性</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="getPDF(scope.row)">下载PDF</el-button>
          <el-button type="text" size="small" @click="deleteContract(scope.row)">删除</el-button>
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
    this.founder = this.$route.query.id;
    this.fetchDate();
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date');
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    // formatter(row, column) {
    //   return row.address;
    // },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },

    getPDF(row) {
      axios
        .get('/api/v1/pdfforpc', { params: { contractId: row._id } })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    },

    deleteContract(row) {
      this.$axios
        .delete('/api/v1/contract', {
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
        .delete('/api/v1/contractattrmany', {
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

    viewContract(row) {
      this.$router.push({
        name: 'ContractPreview',
        query: { contractId: row._id }
      });
    },

    editAttr(row) {
      this.$router.push({ name: 'AttrEdit', query: { contractId: row._id } });
    },

    fetchDate() {
      this.$axios
        .get('/api/v1/contract', {
          params: {
            founder: this.founder
          }
        })
        .then(
          res => {
            // console.log("----------------");
            // console.log(res);
            this.tableData = res.data.data;
            // console.log(this.tableData);
          },
          err => {
            // console.log("---------err---------");
            console.log(err);
          }
        );
    },

    timeFormat(row) {
      return this.formatTime(new Date(row.addTime), 'YYYY-MM-DD HH:mm');
    },

    stateFormat(row) {
      let state = '';
      switch (row.state) {
        case 0:
          state = '待签约';
          break;
        case 1:
          state = '已签约';
          break;
        case 2:
          state = '已履约';
          break;
        case 3:
          state = '已违约';
          break;
        default:
          break;
      }
      return state;
    }
  }
};
</script>

<style lang="scss" scoped></style>
