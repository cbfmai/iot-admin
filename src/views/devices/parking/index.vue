<template>
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
  </el-table>
</template>

<script>

  import {_getDevicesBySpecification} from '../../../http/sitewhere-api-wrapper'
  import Utils from '../../../common/Utils'

  export default {
    data() {
      return {
        tableData: []
      }
    },

    computed: {},
    mounted() {
      let that = this;
      _getDevicesBySpecification(this.$store, '7ba18e6b-c749-4913-8a52-65eff849f4be', null)
        .then(function (response) {
          that.tableData = response.data.results
        }).catch(function (e) {
      })
    },
    methods: {
      formatDate(row, column) {
        return Utils.formatDate(row.createdDate);
      }
    }
  }
</script>
