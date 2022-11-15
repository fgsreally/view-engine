import A from "./A.vue";
import B from "./B.vue";
import { registerComponent } from "../../js/register";
import { ElDialog } from "element-plus"
import C from "./C.vue"
registerComponent('addon', A, "test1", { url: "#", isShare: false });
registerComponent('addon', B, "test2", { url: "#", isShare: false },);

registerComponent('local', C, "dialog", { url: "element-plus", isShare: false, }, { map: ElDialog, category: 'mask' },);
