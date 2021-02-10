<script lang="ts">
  import { fly } from "svelte/transition";
  import { elasticInOut } from "svelte/easing";
  import { Logger } from "@common/logger";

  import Icon from "./Icon.svelte";

  import notification, { reset, nonEmpty, isError, isInfo, isWarn, isPermanentMessage } from "@states/notification";

  const logger = Logger.Renderer("notification");

  let hidden: boolean = true;
  let permanent: boolean = false;

  notification.subscribe(value => {
    permanent = isPermanentMessage(value);

    if (nonEmpty(value)) {
      logger.debug(
        `Notify: ${value.message} (${value.type}) [${permanent ? "Permanent" : value.option.showTime + "ms"}]`
      );

      hidden = false;

      if (!permanent)
        setTimeout(() => {
          if (!hidden) {
            hidden = true;
            reset();
          } else {
            logger.debug(`already manually closed`);
          }
        }, value.option.showTime);
    }
  });

  const onClose = () => {
    hidden = true;
    reset();
  };
</script>

{#if !hidden}
  <div class="notification {$notification.type}" transition:fly={{ x: 100, duration: 500, easing: elasticInOut }}>
    {#if isError($notification)}
      <Icon size="sm" fill="var(--red-color)" on:click={onClose}>
        <path
          d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.094l-4.157-4.104 4.1-4.141-1.849-1.849-4.105 4.159-4.156-4.102-1.833 1.834 4.161 4.12-4.104 4.157 1.834 1.832 4.118-4.159 4.143 4.102 1.848-1.849z"
        />
      </Icon>
    {:else if isInfo($notification)}
      <Icon size="sm" fill="var(--green-color)" on:click={onClose}>
        <path
          d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z"
        />
      </Icon>
    {:else if isWarn($notification)}
      <Icon size="sm" fill="var(--yellow-color)" on:click={onClose}>
        <path
          d="M12 5.177l8.631 15.823h-17.262l8.631-15.823zm0-4.177l-12 22h24l-12-22zm-1 9h2v6h-2v-6zm1 9.75c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25z"
        />
      </Icon>
    {/if}

    <div class="message">
      <span>{$notification.message}</span>
    </div>
  </div>
{/if}

<style lang="scss">
  @import "../scss/variables.scss";

  .notification {
    position: absolute;
    top: 0;
    right: 0;

    display: grid;
    grid-template-columns: 35px auto;

    margin: $lg;

    padding-right: $md;
    padding-left: $md;
    padding-top: $sm;
    padding-bottom: $sm;

    border-radius: $md;

    background-color: var(--bg-color-2);

    z-index: 10;

    span {
      text-align: right;
    }
  }

  .message {
    display: flex;
    align-items: center;
  }
</style>
