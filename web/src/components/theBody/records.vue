<script setup lang="ts">
import { recordsStore } from "@/stores/records"
let records = recordsStore()
</script>

<template>
    <div class="box">
        <div class="item" v-for="(item, index) in records.list" :key="index">
            <div class="que" v-if="item.type==0">
                <span>E://</span>
                <span v-show="item.path" v-for="(items, indexs) in item.path.split(',')" :key="indexs">{{ items }}/</span>
                <span>></span>
                <span class="highWord">{{ item.high }}</span>
                <span v-show="item.high">&nbsp;</span>
                <span>{{ item.text }}</span>
            </div>
            <div v-else-if="item.type==1">{{ item.text }}</div>
        </div>
    </div>
</template>

<style scoped>
.box {
    display: flex;
    flex-direction: column;
}
.que{
    display: flex;
}
.que .highWord{
    color: #28bfff;
}
</style>
