<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "preview",
  props: {
    value: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: "preview",
    },
    width: Number,
    height: Number,
  },
  setup(props) {
    return () => {
      return props.value[props.type](props.width, props.height);
    };
  },
});
</script>
