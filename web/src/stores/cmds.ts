// import { ref } from 'vue'
import { defineStore } from 'pinia'
import { osCmdList, cmdList, keyList } from "@/assets/json/cmds.json"

export const cmdStore = defineStore('cmds', () => {
    let list = <any>[]
    function getCmdList(pathList: Array<any>) {
        list = []
        for (let i = 0; i < osCmdList.length; i++) {
            if (osCmdList[i].cmd != "cd.." || pathList.length != 0) {
                list.push(osCmdList[i].cmd)
            }
        }
        list = list.concat(getListByPath(pathList, "cmd"));
        return list
    }

    function getListByPath(pathList: Array<any>, type: string) {
        let result = <any>[];
        if (pathList.length == 0) {
            getResult(cmdList)
        } else {
            getResultForRecursion(0, cmdList)
        }

        function getResult(list: Array<any>) {

            for (let i = 0; i < list.length; i++) {
                if (type == "cmd") {
                    if (list[i].cmd) {
                        result.push(list[i].cmd)
                    }
                } else if (type == "path") {
                    if (list[i].path) {
                        result.push(list[i].path)
                    }
                }

            }
        }
        function getResultForRecursion(index: number, list: Array<any>) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].path == pathList[index]) {
                    if (index < pathList.length - 1) {
                        getResultForRecursion(index++, list[i].list)
                    } else {
                        getResult(list[i].list)
                    }
                }
            }

        }
        return result
    }

    function toHandleCmd(pathList: Array<any>, cmd: string, text: string) {
        return new Promise((resolve, reject) => {
            let result = null
            if (cmd) {
                result = toCmd()
            } else {
                result = toText()
            }
            resolve(result)
        });
        function toCmd() {
            if (cmd == "cd") {
                return toCd()
            } else if (cmd == "cd..") {
                return toCd__()
            } else {
                return {
                    type: 1,
                    text: "No Found"
                }
            }
            function toCd() {
                let pathArr = getListByPath(pathList, "path")

                if (pathArr.includes(text)) {
                    pathList.push(text)
                    return {
                        type: -1
                    }
                } else {
                    return {
                        type: 1,
                        text: "No Found"
                    }
                }
            }
            function toCd__() {
                pathList.pop()
                return {
                    type: -1
                }
            }
        }
        function toText() {
            if (text) {
                return {
                    type: 1,
                    text: "No Found"
                }
            } else {
                return {
                    type: -1
                }
            }

        }
    }

    return { getCmdList, toHandleCmd }
})
