import Trash from '@/apis/trash'
import {Message} from 'element-ui'

const state = {
  trashNotes: null,
  curTrashNoteId: null
}

const getters = {
  trashNotes: state => state.trashNotes || [],
  curTrashNote: (state,getters) => {
    if(!state.curTrashNoteId) return getters.trashNotes[0] || {}
    return state.trashNotes.find(note => note.id == state.curTrashNoteId) || {}
  },
  // 跨模块去获取数据
  belongTo:(state,getters,rootState,rootGetters) => {
    // 打印出来就很喜欢谁是谁
    // console.log(state,getters,rootState,rootGetters)
    // 当前模块getters.trashNotes
    let notebook = rootGetters.notebooks.find(notebook => notebook.id == getters.curTrashNote.notebookId) || {}
    return notebook.title || ''
  }
}


// 对数据进行处理
const mutations = {
  setTrashNotes(state,payload ) {
    state.trashNotes = payload.trashNotes
  },
  addTrashNote(state,payload) {
    setTrashNotes.unshift(payload.note)
  },
  deleteTrashNote(state,payload) {
    // 移除删除向
    state.trashNotes = state.trashNotes.filter(note => note.id != payload.noteId)
  },
  setCurTrashNote(state,payload = {}) {
    state.curTrashNoteId = payload.curTrashNoteId
  }
}


// 发请求  获取数据
const actions = {
  // 没有要参数
  //用getTrashNotes 获取getAll里面的数据
  getTrashNotes({commit}) {
    return Trash.getAll() 
      .then(res => {
        // 提交setTrashNotes,把参数{trashNotes: res.data}传给payload,payload={trashNotes: res.data}
        commit('setTrashNotes',{trashNotes: res.data})
      })
  },
  deleteTrashNote({commit},{noteId}) {
    return Trash.deleteNote({noteId})
    .then(res => {
      commit('deleteTrashNote',{noteId})
      Message.success(res.msg)
    })
  },
  revertTrashNote({commit},{noteId}) {
    return Trash.revertNote({noteId})
    .then(res => {
      commit('deleteTrashNote',{noteId})
      Message.success(res.msg)
    })
  },
}


export default {
  state,
  getters,
  mutations,
  actions
}