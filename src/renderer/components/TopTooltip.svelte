<script lang="ts">
  export let text: string;

  export let top: number = -20;
  export let left: number = -10;
  export let right: number = -10;

  $: topVar = top ? `--dynamic-top: ${top}px;` : ``;
  $: leftVar = left ? `--dynamic-left: ${left}px;` : ``;
  $: rightVar = right ? `--dynamic-right: ${right}px;` : ``;
</script>

<div class="container" style={topVar + leftVar + rightVar}>
  <span>{text}</span>
  <svg x="0px" y="0px" viewBox="0 0 255 255">
    <polygon points="0,0 127.5,127.5 255,0" />
  </svg>
</div>

<!-- absolute z-10 bottom-full
py-2 ml-14 px-3

opacity-0 hover:opacity-100 group-hover:opacity-100
bg-black text-white
text-center text-xs
rounded-lg pointer-events-none

transition-opacity duration-300 ease-in-out -->
<style lang="scss">
  @import "../scss/variables.scss";

  .container {
    position: absolute;
    top: var(--dynamic-top);
    left: var(--dynamic-left);
    right: var(--dynamic-right);

    text-align: center;
    font-size: $font-sm;

    pointer-events: none;
    border-radius: $md;

    span {
      border-color: var(--font-color);
      border-width: $border-sm;
      border-radius: $sm;

      background-color: var(--bg-color);
      color: var(--font-color);

      padding-top: $xs;
      padding-bottom: $xs;
      padding-left: $sm;
      padding-right: $sm;
    }

    svg {
      height: $md;
      width: 100%;

      color: var(--font-color);
    }
  }
</style>
