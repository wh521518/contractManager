<template>
  <div>
    <el-row :gutter="20">
      <el-col :offset="1" :span="6">
        <el-card class="box-card">
          <div class="base-info">
            <el-avatar class="avatar" :src="avatar"></el-avatar>
            <span class="name">{{username}}</span>
          </div>
          <div class="bind-info">
            <div class="phone-info">
              <i class="el-icon-mobile icon"></i>
              <span class="text">已绑定</span>
              <router-link :to="{name: 'VertifyCode', params:{userId:userId}}" class="rlink">
                <el-button type="primary" plain class="btn">修改手机号</el-button>
              </router-link>
            </div>

            <div class="pwd-info">
              <i class="el-icon-lock icon"></i>
              <span class="text">***</span>
              <router-link :to="{name: 'VertifyCode', params:{userId:userId}}" class="rlink">
                <el-button type="primary" plain>修改密码</el-button>
              </router-link>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card checkIn">
          <div>
            <div class="title">
              <span>每日签到</span>
              <el-button @click="todayCheckIn">签到</el-button>
            </div>
            <Calendar class="calendar" :markDate="markDateArr" @changeMonth="changeDate"></Calendar>
          </div>
        </el-card>
      </el-col>

      <el-col :span="9">
        <el-card class="box-card" body-style="padding: none">
          <div class="contract-data">
            <div>
              <span>签单数量: {{contractCount}}</span>
              <!-- <span>成单率:{{contractPercent}}%</span> -->
              <span>成单率:{{orderPercent}}%</span>
            </div>
            <div>
              <v-chart :options="pie" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Calendar from 'vue-calendar-component';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';

import moment from 'moment';

export default {
  components: {
    Calendar
  },
  methods: {
    todayCheckIn() {
      if (!this.isTodayCheckIn) {
        let now = moment().format('YYYY/MM/DD');
        this.markDateArr.push(now);
        this.isTodayCheckIn = true;
        let timeStamp = Date.parse(new Date());
        axios
          .post('/api/v1/ckeckin', {
            userId: this.getUserId(),
            timeStamp
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        this.$message({
          message: '今日已签到',
          type: 'success'
        });
      }
    },
    // 日历切换
    changeDate(date) {
      // console.log(date);
      let fd = moment(date, 'YYYY-MM-DD');
      // console.log(fd);
      let year = fd.year();
      let month = fd.month() + 1;
      let today = fd.date();
      // console.log(year, month, today);
      axios
        .get('/api/v1/ckeckin', {
          params: {
            month,
            year,
            userId: this.getUserId()
          }
        })
        .then(res => {
          if (res.data.data.length > 0) {
            if (res.data.data[0].day.indexOf(today) != -1) {
              this.isTodayCheckIn = true;
              // console.log(this.isTodayCheckIn);
            }
            for (let i = 0; i < res.data.data[0].day.length; i++) {
              this.markDateArr.push(
                year + '/' + month + '/' + res.data.data[0].day[i]
              );
            }
          }
        });
    }
  },
  data() {
    let data = [];

    for (let i = 0; i <= 360; i++) {
      let t = (i / 180) * Math.PI;
      let r = Math.sin(2 * t) * Math.cos(2 * t);
      data.push([r, i]);
    }
    return {
      markDateArr: [],
      isTodayCheckIn: false,
      username: this.$storage.get('username'),
      userId: this.getUserId(),
      value: new Date(),
      contractCount: '',
      orderPercent: '',
      avatar: this.$storage.get('avatar'),
      // echart
      pie: {
        series: {
          type: 'pie',
          data: []
        }
      }
    };
  },
  created() {
    //获取签到数据
    let myDate = new Date();
    let date =
      myDate.getFullYear() +
      '/' +
      (myDate.getMonth() + 1) +
      '/' +
      myDate.getDate();

    // console.log(date);
    this.changeDate(date);

    // 获取合同统计数据
    axios
      .get('/api/v1/contractstatistics', {
        params: {
          founder: this.getUserId()
        }
      })
      .then(res => {
        if (!res.data.code) {
          let data = res.data;
          this.contractCount = data.data.totalCount;
          this.orderPercent = Math.floor(data.data.successRate * 100);
          this.pie.series.data.push(
            {
              name: '未签约',
              value: data.data.state0
            },
            {
              name: '已签约',
              value: data.data.state1
            },
            {
              name: '履约',
              value: data.data.state2
            },
            {
              name: '违约',
              value: data.data.state3
            }
          );
        }
      });
  }
};
</script>

<style lang="scss">
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  /* width: 480px; */
  width: 100%;
  height: 480px;
  // padding-top: 0px;
}

// 基本信息
.base-info {
  height: 160px;
  width: 100%px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .avatar {
    margin-top: 20px;
    width: 80px;
    height: 80px;
  }
  .name {
    margin: 10px 0;
    height: 40px;
    width: 100%;
    line-height: 40px;
    font-size: 20px;
  }
}

// 绑定电话
.bind-info {
  display: flex;
  margin: 0 auto;
  width: 9 0%;
  height: 260px;
  // background-color: green;
  justify-content: center;
  & div {
    width: 40%;
    height: 100%;
  }
}

.phone-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  i {
    font-size: 40px;
  }
  & > span:first-of-type {
    margin-top: 10px;
    width: 100%;
    height: 20px;
    line-height: 20px;
  }
  .rlink {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
  }
}

.pwd-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  i {
    font-size: 40px;
  }
  & > span:first-of-type {
    margin-top: 10px;
    width: 100%;
    height: 20px;
    line-height: 20px;
  }
  .rlink {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
  }
}

//每日签到
.checkIn {
  .title {
    // background-color: green;
    width: 100%;
    height: 80px;
    line-height: 100px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    .el-button {
      width: 100px;
      height: 50px;
    }
  }
}

// 签单数据
.contract-data {
  width: 100%;
  height: 100%;
  height: 400px;
  padding-top: 20px;
  & div:first-child {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }

  & div:last-child {
    .echarts {
      width: 100%;
      height: 100%;
    }
    width: 100%;
    height: 100%;
  }
}

// 日历样式
.calendar {
  .wh_item_date:hover {
    background: #faf7f5;
  }

  .wh_content_all {
    background-color: white;
    border: 2px solid #faf7f5;
  }

  .wh_content_item,
  .wh_content_item_tag {
    color: black;
    // background-color: #ddd;
  }

  .wh_content_item .wh_other_dayhide {
    color: faf7f5;
  }
  .wh_content_item .wh_want_dayhide {
    color: #bfbfbf;
  }

  .wh_content_item .wh_isToday {
    background: #ffd04b;
  }

  .wh_jiantou2 {
    border-top: 2px solid black;
    border-right: 2px solid black;
  }
  .wh_jiantou1 {
    border-top: 2px solid black;
    border-left: 2px solid black;
  }

  .wh_content:first-child .wh_content_item_tag,
  .wh_content:first-child .wh_content_item {
    color: purple;
    font-size: 16px;
  }

  .wh_content_li .wh_top_changge {
    color: black;
  }

  .wh_top_changge li {
    color: black;
  }

  .wh_content_item .wh_chose_day {
    background: #ffd04b;
  }

  .wh_content_item > .wh_isMark {
    background: skyblue;
  }
}
</style>