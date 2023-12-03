
<template>
    <div class="box">
        <div class="path" v-show="!isLoading">
            <span>E://</span>
            <span v-for="(item, index) in pathList" :key="index">{{ item }}/</span>
            <span>></span>
            <span class="highWord">{{ highWord }}</span>
        </div>
        <div class="input" ref="inputRef" v-show="!isLoading" :class="isFocus ? 'inputActive' : ''" contenteditable="true"
            @compositionstart="isInput = true" @compositionend="isInput = false" @keydown.enter.exact="submit"
            @input="change" @focus="isFocus = true" @blur="isFocus = false"></div>
        <div class="loading" v-show="isLoading">...</div>
    </div>
</template>

<script setup lang="ts">
import { ref, type Ref, watch } from "vue"
import { recordsStore } from "@/stores/records"
import { cmdStore } from "@/stores/cmds"
let records = recordsStore()
let cmds = cmdStore()
let isLoading = ref(false)
let isFocus = ref(false)
let isInput = ref(false)
let pathList = ref(<any>[])
let highWord = ref("")
let cmdList = cmds.getCmdList(pathList.value)
const inputRef: Ref<HTMLElement | null> = ref(null);
watch(pathList, (newItems, oldItems) => {
    cmdList = cmds.getCmdList(pathList.value)
}, { deep: true });

let submit = (e: any) => {
    if (window.event) window.event.returnValue = false;
    else e.preventDefault();
    let str = e.target.innerHTML.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, "");
    toAppend(str)
}


let change = (e: any) => {
    let str = e.target.innerHTML.replace(/<[^>]+>/g, "");
    for (let i = 0; i < cmdList.length; i++) {
        if (cmdList[i] == str && !highWord.value) {
            highWord.value = str;
            if (inputRef.value) {
                inputRef.value.innerHTML = "&nbsp;";
                let selection = document.getSelection();
                if (selection && selection.rangeCount > 0) {
                    document.execCommand('selectAll', false, "");
                    selection.collapseToEnd();
                }
            }
            return;
        }
    }
    if (highWord.value && !str) {
        if (inputRef.value) {
            inputRef.value.innerHTML = highWord.value;
            let selection = document.getSelection();
            if (selection && selection.rangeCount > 0) {
                document.execCommand('selectAll', false, "");
                selection.collapseToEnd();
            }
            highWord.value = ""
        }
    }
}
let toAppend = (text: string) => {
    toQue(text)
    cmds.toHandleCmd(pathList.value, highWord.value, text).then(res => {
        isLoading.value = false
        toClearCmdAndText()
        records.addRecords(res)
    })


    function toQue(text: string) {
        records.addRecords({
            type: 0,
            path: pathList.value.join(","),
            high: highWord.value,
            text
        })
        isLoading.value = true
    }
}
let toClearCmdAndText = () => {
    highWord.value = "";
    if (inputRef.value) {
        inputRef.value.innerHTML = "";
    }
}
</script>


<style scoped>
.box {
    width: 100%;
    flex: 1;
}

.path {
    float: left;
}

.highWord {
    color: #28bfff;
}

.input {


    width: 100%;
    height: 100%;
    outline: none;
    color: transparent;
    text-shadow: 0 0 0 #fff;
}

.inputActive {
    &::after {
        content: "_";
        animation: dot 1s infinite step-end;
    }
}

.loading {
    width: 0.6em;
    display: block;
    overflow: hidden;
    animation: dot2 1.2s infinite step-end;
}

@keyframes dot2 {
    33% {
        width: 1.3em;
    }

    66% {
        width: 2em;
    }
}

@keyframes dot {
    50% {
        color: #000;
    }

    100% {
        color: #fff;
    }
}
</style>
