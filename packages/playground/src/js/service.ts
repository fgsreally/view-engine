import axios from "axios";
import { createService } from "@view-engine/core";
export let {
  context,
  addService,
  services,
  isValid,
  delService,
  addContext,
  applyService,
  getService,
} = createService(
  {
    $: {},
  },
  { type: "class", name: ["ctx", "state"] }
);
