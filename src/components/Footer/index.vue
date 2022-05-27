<template>
  <div class="footer">
    <div class="w clearfix">
      <hr />
      <ul class="help clearfix">
        <li class="help-item">
          <h5>购物指南</h5>
          <ul>
            <li><a href="javascript:;">购物流程</a></li>
            <li><a href="javascript:;">会员介绍</a></li>
            <li><a href="javascript:;">生活旅行</a></li>
            <li><a href="javascript:;">常见问题</a></li>
            <li><a href="javascript:;">大家电</a></li>
            <li><a href="javascript:;">联系客服</a></li>
          </ul>
        </li>
        <li class="help-item">
          <h5>配送方式</h5>
          <ul>
            <li><a href="javascript:;">上门自提</a></li>
            <li><a href="javascript:;">211限时达</a></li>
            <li><a href="javascript:;">配送服务查询</a></li>
            <li><a href="javascript:;">配送费收取标准</a></li>
            <li><a href="javascript:;">海外配送</a></li>
          </ul>
        </li>
        <li class="help-item">
          <h5>支付方式</h5>
          <ul>
            <li><a href="javascript:;">货到付款</a></li>
            <li><a href="javascript:;">在线支付</a></li>
            <li><a href="javascript:;">分期付款</a></li>
            <li><a href="javascript:;">公司转账</a></li>
          </ul>
        </li>
        <li class="help-item">
          <h5>售后服务</h5>
          <ul>
            <li><a href="javascript:;">售后政策</a></li>
            <li><a href="javascript:;">价格保护</a></li>
            <li><a href="javascript:;">退款说明</a></li>
            <li><a href="javascript:;">返修/退换货</a></li>
            <li><a href="javascript:;">取消订单</a></li>
          </ul>
        </li>
        <li class="help-item">
          <h5>特色服务</h5>
          <ul>
            <li><a href="javascript:;">夺宝岛</a></li>
            <li><a href="javascript:;">DIY装机</a></li>
            <li><a href="javascript:;">延保服务</a></li>
            <li><a href="javascript:;">优汇E卡</a></li>
            <li><a href="javascript:;">优汇通信</a></li>
          </ul>
        </li>
        <li class="help-item">
          <h5>个人博客</h5>
          <div>
            <img src="./images/blog.jpg" />
          </div>
        </li>
      </ul>
      <hr />
      <div class="copyright">
        <div class="copyright-links">
          <a href="javascript:;">关于我们</a><span>丨</span>
          <a href="javascript:;">联系我们</a><span>丨</span>
          <a href="javascript:;">联系客服</a><span>丨</span>
          <a href="javascript:;">合作招商</a><span>丨</span>
          <a href="javascript:;">商家帮助</a><span>丨</span>
          <a href="javascript:;">营销中心</a><span>丨</span>
          <a href="javascript:;">手机优汇</a><span>丨</span>
          <a href="javascript:;">友情链接</a><span>丨</span>
          <a href="javascript:;">销售联盟</a><span>丨</span>
          <a href="javascript:;">优汇社区</a><span>丨</span>
          <a href="javascript:;">风险监测</a><span>丨</span>
          <a href="javascript:;">隐私政策</a>
        </div>
        <div class="school">
          学校：<a href="https://www.cug.edu.cn/">中国地质大学（武汉）</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@color: #e1251b;
.footer {
  padding-bottom: 30px;
  .w {
    .help {
      margin-top: 20px;
      .help-item {
        float: left;
        width: 198px;
        height: 158px;
        h5 {
          user-select: none;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 5px;
          color: #333;
        }
        a {
          line-height: 22px;
          font-size: 12px;
          color: #666;
        }
        img {
          width: 100px;
        }
      }
    }
    .copyright {
      .copyright-links {
        text-align: center;
        a {
          font-size: 12px;
          color: #666;
        }
        span {
          font-size: 12px;
          display: inline-block;
          margin: 0 7px;
          color: #ccc;
          user-select: none;
        }
      }
      .school {
        margin-top: 10px;
        text-align: center;
        font-size: 12px;
        color: #666;
        user-select: none;
        a {
          color: #666;
        }
      }
    }
  }
}
</style>