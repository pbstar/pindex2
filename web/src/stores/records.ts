import { ref } from 'vue'
import { defineStore } from 'pinia'

export const recordsStore = defineStore('records', () => {
  const list = ref(<any>[])
  function addRecords(e:any) {
    list.value.push(e)
    
  }

  return { list, addRecords }
})
