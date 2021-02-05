<script lang="ts">
  export let name: string;
  export let checked: boolean;
  export let rounded: boolean;
</script>

<label {name} class="switch">
  <input type="checkbox" bind:checked />
  <span class:rounded />
</label>

<style lang="scss">
  @import "../scss/variables.scss";

  .switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 25px;

    margin-right: $sm;

    /* Hidden html default checkbox input */
    input {
      opacity: 0;
      width: 0;
      height: 0;

      &:focus {
        + span {
          box-shadow: 0 0 1px #2196f3;
        }
      }

      &:checked {
        + span {
          background-color: #2196f3;

          &:before {
            transform: translateX(21px);
          }
        }
      }
    }

    /* The slider */
    span {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;

      &:before {
        position: absolute;
        content: "";
        height: 17px;
        width: 17px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }

      &.rounded {
        border-radius: 17px;
        &:before {
          border-radius: 50%;
        }
      }
    }
  }
</style>
