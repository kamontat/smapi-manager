<script lang="ts">
  import type { KeyValue } from "@common/utils/array";

  export let value: string;
  export let values: KeyValue<string>[];
</script>

<select bind:value>
  {#each values as item (item.key)}
    <option value={item.key}>{item.value}</option>
  {/each}
</select>

<style lang="scss">
  select {
    background-color: var(--bg-color);
    color: var(--font-color);

    width: 100%;
  }
</style>
