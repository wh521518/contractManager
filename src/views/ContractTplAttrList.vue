<template>
  <div class="ContractList">
    <el-row>模板属性列表</el-row>
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="attrName"
        label="属性名"
        width="180"
      />
      <el-table-column
        prop="posTag"
        label="标签"
      />
      <el-table-column
        prop="unit"
        label="单位"
      />
      <el-table-column
        prop="isAbstract"
        label="摘要属性"
        :formatter="formatAbstract"
      />
      <el-table-column
        prop="sort"
        label="摘要排序"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="220"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="editAttr(scope.row)"
          >
            编辑
          </el-button>
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
      tplId: ""
    };
  },

  created() {
    console.log("---------create---------");
    this.tplId = this.$route.query.tplId;
    console.log(this.tplId);
    this.fetchDate();
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
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
      const property = column["property"];
      return row[property] === value;
    },
    formatAbstract(row) {
      console.log(row.isAbstract);

      row.isAbstract ? console.log("1") : console.log("2");

      return row.isAbstract ? "是" : "否";
    },
    editAttr(row) {
      console.log(row._id);
      this.$router.push({
        name: "TplAttrEdit",
        query: {
          attrId: row._id
        }
      });
    },
    fetchDate() {
      this.$axios
        .get("/api/v1/contracttplattr", {
          params: { tplId: this.tplId }
        })
        .then(
          res => {
            // console.log("-------res---------");
            // console.log(res);
            this.tableData = res.data.data;
            // console.log(this.tableData);
          },
          err => {
            // console.log("---------err---------");
            console.log(err);
          }
        );
    }
  }
};
</script>

<style lang="scss" scoped></style>
