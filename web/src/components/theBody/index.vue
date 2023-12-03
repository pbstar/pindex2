<script setup lang="ts">
import TheRecords from "@/components/theBody/records.vue"
import TheAppend from "@/components/theBody/append.vue"
import {recordsStore} from "@/stores/records"
let records=recordsStore()

</script>

<template>
  <div class="body">
    <div v-if="records.list.length==0">Welcome to PINDEX, please use 'help'.</div>
    <TheRecords v-else/>
    <TheAppend />
  </div>
</template>

<style scoped>
.body {
  padding:10px 20px 20px;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
}
</style>