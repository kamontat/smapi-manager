<script lang="ts">
  export let text: string;

  export let bottom: number = -20;
  export let shift: number = -20;

  $: bottomVar = bottom ? `--dynamic-bottom: ${bottom}px;` : ``;
  $: shiftVar = shift ? `--dynamic-shift: ${shift}px;` : ``;
</script>

<div class="container" style={bottomVar + shiftVar}>
  <svg x="0px" y="0px" viewBox="0 0 255 255">
    <polygon points="0 255,127.5 0,255 255" />
  </svg>
  <span>{text}</span>
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
    bottom: var(--dynamic-bottom);
    left: var(--dynamic-shift);
    right: var(--dynamic-shift);

    text-align: center;
    font-size: $font-sm;

    pointer-events: none;
    border-radius: $md;

    span {
      border-color: var(--border-color);
      border-width: $border-sm;
      border-radius: $sm;

      background-color: var(--bg-color-2);
      color: var(--font-color-2);

      padding-top: $xs;
      padding-bottom: $xs;
      padding-left: $sm;
      padding-right: $sm;
    }

    svg {
      height: $md;
      width: 100%;

      color: var(--font-color-2);
    }
  }
</style>
