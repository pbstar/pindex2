<script setup lang="ts">
import TheHeader from '@/components/theHeader/index.vue'
import TheBody from '@/components/theBody/index.vue'
</script>

<template>
    <TheHeader class="TheHeader"/>
    <TheBody class="TheBody"/>
</template>

<style scoped>
.TheHeader{
  height: 60px;
  width: 100%;
  background-color: rgb(30, 30, 30);
  position: fixed;
  top: 0;
  left: 0;
}
.TheBody{
  height: calc(100vh - 60px);
  width: 100%;
  margin-top: 60px;
  background-color: rgb(30, 30, 30);
  overflow: auto;
}
.TheBody::-webkit-scrollbar {
  width: 10px;
}
.TheBody::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #444;
}
.TheBody::-webkit-scrollbar-track-piece {
  background-color: #111;
}
</style>
