import request from '@/helpers/request.js'
import {friendlyDate} from '@/helpers/util.js'

const URL = {
    GET: 'notebooks',
    ADD: 'notebooks',
    UPDATE: '/notebooks/:id',
    DELETE: '/notebooks/:id'
}

export default {
    getAll() {
        return new Promise((resolve,reject) => {
            request(URL.GET)
            .then(res => {
                res.data = res.data.sort((notebook1,notebook2) => notebook1.createdAt < notebook2.createdAt)
                res.data.forEach(notebook => {
                    console.log(friendlyDate(notebook.createdAt));
                    notebook.createdAtfriendly = friendlyDate(notebook.createdAt)
                    notebook.updatedAtFriendly = friendlyDate(notebook.updatedAt)
                })
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateNotebook(notebookId,{title = ''} = {title: ''}) {
        return request(URL.UPDATE.replace(':id',notebookId),'PATCH',{title: title})
    },
    deleteNotebook(notebookId) {
        return request(URL.DELETE.replace(':id',notebookId),'DELETE') 
    },
    addNotebook({title = ''} = {title: ''}) {
        return new Promise(function(resolve, reject) {
            request(URL.ADD,'POST',{title})
            .then(res => {
                res.data.createdAtfriendly = friendlyDate(res.data.createdAt)
                res.data.updatedAtFriendly = friendlyDate(res.data.updatedAt)
            }).catch(err => {
                reject(err);
            })
        })
    }
}