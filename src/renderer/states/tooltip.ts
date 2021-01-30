import type { SvelteComponent } from "svelte";
import type { UseAction } from "./models/UseAction";

interface Tooltip {
  context: typeof SvelteComponent;
  disabled?: boolean;
  text: string;

  props?: Record<string, string | number | boolean>;
}

const onTooltip: UseAction<Tooltip> = (node, { context, text, disabled, props }) => {
  let component: SvelteComponent;

  const attachTooltip = () => {
    component = new context({
      target: node,
      props: Object.assign({ text }, props),
    });
  };

  const removeTooltip = () => {
    if (component) component.$destroy();
  };

  const setup = (disabled: boolean) => {
    if (disabled === true) {
      node.removeEventListener("mouseover", attachTooltip);
      node.removeEventListener("mouseout", removeTooltip);
    } else {
      node.addEventListener("mouseover", attachTooltip);
      node.addEventListener("mouseout", removeTooltip);
    }
  };

  setup(disabled);

  return {
    update({ disabled }) {
      setup(disabled);
    },
    destroy() {
      node.removeEventListener("mouseover", attachTooltip);
      node.removeEventListener("mouseout", removeTooltip);
    },
  };
};

export { onTooltip };
