<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{ notebooks.length }})</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" :key="notebook.id" :to="`/note?notebookId=${notebook.id}`" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span> {{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
              <!-- click.stop.prevent 阻止事件传播和默认事件    @click.prevent 阻止默认事件   现象：点击编辑会跳转（冒泡） -->
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{ notebook.friendlyCreatedAt }}</span>
            </div>
          </router-link>
        </div>
      </div>

    </main>

  </div>
</template>
  
<script>
import Auth from '@/apis/auth.js'
import Notebooks from '@/apis/notebooks.js'
import {friendlyDate} from '@/helpers/util.js'
import {mapState,mapActions,mapGetters} from 'vuex'


export default {
  data() {
    return {
      // notebooks: [],
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({ path: '/login' })
        }
        this.notebooks = res.data
      })
      // Notebooks.getAll() 
      //   .then(res => {
      //     this.notebooks = res.data
      //   })
      this.$store.dispatch('getNotebooks')
      
  },
  computed: {
    ...mapGetters(['notebooks'])
  },
  methods: {
    ...mapActions([
      'getNotebooks',
      'addNotebook',
      'updateNotebook',
      'deleteNotebook'
  ]),
    onCreate() {
      // console.log('用log做检查');
      let title = window.prompt('创建笔记本')
      if(title.trim() === '') {
        alert('笔记本不能为空')
        return
      }
      // 把增加的笔记本渲染到列表
      Notebooks.addNotebook({title})
        .then(res => {
          console.log(res);
          res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
          this.notebooks.unshift(res.data)
          alert(res.msg)
        })
    },
    onEdit(notebook) {
      let title = window.prompt('修改标题',notebook.title)
      Notebooks.updateNotebook(notebook.id,{title})
        .then(res => {
          console.log(res)
          notebook.title = title
          alert(res.msg)
        })
    },
    onDelete(notebook) {
      let isConfirm = window.confirm('你确定要删除嘛')
      if(isConfirm ) {
        Notebooks.deleteNotebook(notebook.id)
        .then(res => {
          console.log(res)
          this.notebooks.splice(this.notebooks.indexOf(notebook),1)
          alert(res.msg)
        })
      }
      
    }
  }
}
</script>
  

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>