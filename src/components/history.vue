<template>
  <div class="history-wrap">
    <section>
      <div class="datalist">
        <ul>
          <p class="title">2017年8月28日</p>
          <li>用户id为1781241在2015-10-23T23:00:00.打开了门磁为1</li>
          <li>用户id为1781241在2015-10-23T23:00:00.打开了门磁为1</li>
          <li>用户id为1781241在2015-10-23T23:00:00.打开了门磁为1</li>
        </ul>
      </div>
      <div class="datalist">
        <a href="javascript:;" class="morebtn">点击加载更多</a>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    insertDom(data) {
      const docFragment = document.createDocumentFragment();
      const elemDivWrap = document.createElement('<div class="datalist"><ul></ul></div>');
      const ul = elemDivWrap.querySelector('ul');
      for (let i = 0; i < data.length; i++) {
        const date = new Date(data[i].at);
        const li = document.createElement(`
        <li>用户ID:${data[i].Uid}在${date.getHours()}:${date.getMinutes()}</li>`);
        ul.insertAdjacentElement(li);
      }
    },
  },
  mounted() { // eslint-disable-next-line
    const that = this;
    const sensorPromise = {};
    let senData;
    sensorPromise.then((res) => {
      senData = this.getDataFormat(res);
    });
  },
};
</script>

