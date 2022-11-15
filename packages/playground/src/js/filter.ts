import { createFilter } from "@view-engine/core";
let { filter, state, setState } = createFilter({}, { exclude: ["blocks","rawProps"] });

export { filter, state,setState };
