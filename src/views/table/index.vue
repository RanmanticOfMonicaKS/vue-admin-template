<template>
  <div class="app-container">
    <!-- 添加pathUrl --> 
    <el-card>
      <div slot="header"> 添加pathUrl </div>
    <el-form ref="addPath" :model="addParams" inline :rules="addFormRules">
      <el-form-item label="跳转起点" prop="path_url">
        <el-input v-model="addParams.path_url" /> 
      </el-form-item>
      <el-form-item label="跳转终点" prop="point_url">
        <el-input v-model="addParams.point_url" /> 
      </el-form-item>
      <el-button type="success" @click="handleAdd"> 添加</el-button>
      <el-button type="primary" @click="fetchData"> 查询</el-button>
    </el-form>
    </el-card>
    <!--列表 -->
    <el-table

      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="点击次数" width="110">
        <template slot-scope="scope">
          {{ scope.row.click_num }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time | cont }}</span>
        </template>
      </el-table-column>
      <el-table-column label="跳转起点" align="center">
        <template slot-scope="scope">
          {{ scope.row.path_url }}
        </template>
      </el-table-column>
    <el-table-column label="跳转终点" align="center">
        <template slot-scope="scope">
          {{ scope.row.point_url }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleDetails(scope.row.id)">详情</el-button>
          <el-button type="danger" @click="handleDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出时间和ip列表 -->
    <el-dialog
    title="详情列表"
    :visible.sync="timeListDialog"
    width="60%"
    >
      <el-table :data="timeAndIp.list" border max-height="500px" height="500px" :loading="timeAndIpLoading" class="timeAndIp">
        <el-table-column type="index" :index="0" width="50px" align="center" label="序号" />
        <el-table-column prop="url_id" label="url_id" align="center" />
        <el-table-column prop="click_time" label="时间" align="center">
          <template slot-scope="scope">
            <span> {{ scope.row.click_time | cont }} </span>
          </template>
        </el-table-column>
        <el-table-column prop="remote_addr" label="IP" align="center" />
      </el-table>
    <el-pagination
      style="margin-top: 10px;"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="searchQuery.page"
      :page-sizes="[20, 50, 100, 200]"
      :page-size="searchQuery.pageSize"
      layout="sizes, prev, pager, next"
      :total="timeAndIp.total">
    </el-pagination>
    <span slot="footer" class="dialog-footer">
      <el-button @click="timeListDialog = false">取 消</el-button>
      <el-button type="primary" @click="timeListDialog = false">确 定</el-button>
    </span>
</el-dialog>
  </div>
</template>

<script>
import { getList, delPath, addPath, getTimeAndIp } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      addParams: {
        path_url: '',
        point_url: '',
      },
      searchQuery: {
        page: 1,
        pageSize: 20,
        urlId: '',
      },
      addFormRules: {
        path_url: [{ required: true,  message: '请输入pathUrl', trigger: 'blur'  }],
        point_url: [{ required: true,  message: '请输入pathUrl', trigger: 'blur'  }]
      },
      timeListDialog: false,  // 时间和IP列表
      timeAndIp: {
        list: [],
        total: 0,
      },
      timeAndIpLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data;
        this.listLoading = false
      }).catch(e => {
        // 如果出现问题也能关闭loading
        this.listLoading = false
      })
    },
    // 添加pathUrl 
    handleAdd () {
      this.$refs.addPath.validate((valid,obj) => {
        if(valid) {
          addPath(this.addParams).then( response => {
            this.$message(
              {
                type: 'success',
                message: response.msg,
                onClose: () => {
                  this.fetchData();
                }
              }
            )
          })
        }else {
        }
      })
      
    },
    // 删除操作 
    handleDel(id) {
     this.$confirm('此操作将当前项从列表中删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => { 
          delPath({ id }).then( response => {
            console.log(response);
            this.$message(
              {
                type: 'success',
                message: response.msg,
                onClose: () => {
                  this.fetchData();
                }
              }
            )
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    handleDetails(urlId) {
      this.timeAndIpLoading =  true;
      this.timeListDialog = true;
      this.searchQuery.urlId = urlId;
      getTimeAndIp(this.searchQuery).then(r => {
        this.timeAndIp.total = parseInt(r.data.count) ;
        this.timeAndIp.list =  r.data.list;
        this.timeAndIpLoading = false;
      }).catch( e =>  {

        this.timeAndIpLoading =  true;
      }
      )
    },
    // 改变每一页次数
    handleSizeChange(pageSize) {
      this.searchQuery.pageSize = pageSize;
      this.handleDetails(this.searchQuery.urlId);

      
    },
    // 改变页数 
    handleCurrentChange(page) {
      this.searchQuery.page = page;
      this.handleDetails(this.searchQuery.urlId);
    }
    
  }
}
</script>

<style lang="scss" scoped>
  .timeAndIp {
    margin-bottom: 10px;
  }
</style>
