<script lang="ts">
import { defineComponent } from "vue";
import { getComponent, allComponentsList } from "@view-engine/core";
export default defineComponent({
  name: "renderBlock",
  props: {
    data: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      default: true,
    },
  },
  setup(props) {
    return () => {
      return props.data.map((item: any) => {
        return (getComponent(item.key) as any)[props.type](item);
      });
    };
  },
});
</script>
