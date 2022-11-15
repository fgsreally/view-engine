import { useContainerStore } from "../store/container";

export function responseScreen() {

    document.addEventListener("mousedown", (e) => {
        if (e.button === 1) {
            e.preventDefault()
            let containerState = useContainerStore();

            let initX = e.clientX;
            let { value: { width }, wLimit } = containerState
            function move(e: MouseEvent) {
                let offsetX = e.clientX - initX
                if (width + offsetX > wLimit[0] && width + offsetX < wLimit[1])
                    containerState.value.width = width + offsetX
            }

            function up(){
                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup",up)
            }
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup",up)
        }
    });
}
