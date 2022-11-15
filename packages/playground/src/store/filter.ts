import { createFilter } from "@view-engine/core";
import { defineStore } from "pinia"


let { filter, state, setState } = createFilter({}, { exclude: ["blocks", "rawProps"] });
setState("value", "测试数据");

export const useState = defineStore("state", {
    state: () => ({
        filter, state, setState
    }),
    actions: {
        createState(initState: any = {}) {
            let { filter, state, setState } = createFilter(initState, { exclude: ["blocks", "rawProps"] });
            this.filter = filter
            this.state = state
            this.setState = setState
            // setState("value", "测试数据");

        }

    }
})