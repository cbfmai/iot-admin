<template>
  <div>
    <div class="dataListBox">
      <div class="dataList">
        <div class="subNav cf">
          <h5><em class="fa fa-desktop"></em>车位检测器－实时数据</h5>
          <div class="toolBox">
            <div class="searchBox">
              <div class="mapSearch">
                <input type="text" placeholder="资产/设备编号"/>
                <a href="#" class="searchBtn"><i></i></a>
              </div>
            </div>
          </div>
        </div>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            label="日期"
            :formatter="formatDate">
          </el-table-column>
          <el-table-column
            prop="hardwareId"
            label="硬件ID"
          >
          </el-table-column>
          <el-table-column
            prop="metadata.parkingSpace"
            label="地址">
          </el-table-column>

          <el-table-column label="硬件ID">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.deleted === true ? 'warn' : 'success'"
                close-transition><span v-if="scope.row.deleted ==true">无效</span> <span v-else>有效</span></el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[20, 50, 500, 1000]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {_getDevicesBySpecification} from "../../../http/sitewhere-api-wrapper";
  import Utils from "../../../common/Utils";

  export default {
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSize: 20,
        total: 10,
        authTenants: '',
        filterStatus: [{text: "无效", value: false}, {text: "有效", value: true}]
      };
    },

    computed: {
      redirect() {
          return this.$store.getters.authTenants;
      }

    },

    watch: {

    },


    mounted() {
      this.getData();
    }
    ,
    methods: {
      formatDate(row, column) {
        return Utils.formatDate(row.createdDate);
      }
      ,
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getData();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getData();
      },
      getData() {
        let that = this;
        _getDevicesBySpecification(
          this.$store,
          "7ba18e6b-c749-4913-8a52-65eff849f4be",
          "page=" + this.currentPage + "&pageSize=" + this.pageSize
        )
          .then(function (response) {
            that.tableData = response.data.results;
            that.total = response.data.numResults;
          })
          .catch(function (e) {
          });
      }
    }
  }
  ;
</script>
