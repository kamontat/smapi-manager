<script lang="ts">
  export let text: string;
</script>

<span>{text}</span>

<style lang="scss">
  @import "../scss/variables.scss";

  span {
    margin-left: $sm;
  }
</style>
