<script lang="ts">
  import { openDashboard } from "@states/pages";
  export let pageName: string;
</script>

<div>
  <button on:click={openDashboard}>back</button>
  <h1>{pageName}</h1>
</div>
