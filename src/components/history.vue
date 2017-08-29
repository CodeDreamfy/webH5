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
      const elemDivWrap = document.createElement('div');
      elemDivWrap.className = 'datalist';
      elemDivWrap.innerHTML = '<ul></ul>';
      const ul = elemDivWrap.querySelector('ul');
      console.log('insertData', data);
      if (data.length === 0) {
        const li = document.createElement(`
        <li>暂无数据</li>`);
        ul.appendChild(li);
      } else {
        for (let i = 0; i < data.length; i += 1) {
          const date = new Date(data[i].at);
          const li = document.createElement('li');
          li.innerHTML = `
        <li>用户ID:${data[i].Uid}在${date.getHours()}:${date.getMinutes()}打开门磁ID为${data[i].Did}的门</li>`;
          ul.appendChild(li);
        }
      }

      docFragment.appendChild(elemDivWrap);
      const wrap = document.getElementsByTagName('section')[0];
      wrap.appendChild(docFragment);
    },
    clearDom() {
      const wrap = document.getElementsByTagName('section')[0];
      wrap.innerHTML = '';
    },
  },
  mounted() { // eslint-disable-next-line
    const that = this;
    const sensorPromise = this.getSensordata();
    sensorPromise.then((res) => {
      this.clearDom();
      const ms = new Promise((resolve) => {
        const da = this.getDataFormat(res.data.data);
        resolve(da);
      });
      ms.then((data) => {
        this.insertDom(data);
      });
    });
  },
};
</script>

