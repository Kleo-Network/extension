<script lang="ts">
  import { trim } from 'popup/filters/trim';
  import { clipboardCopy } from 'lib/utils/clipboard';
	import { _ } from 'popup/i18n';


  import Tooltip from './Tooltip.svelte';

  let tip = $_('home.clipboard.copy');

  const handleOnCopy = () => {
    //clipboardCopy(account[$format]);
    tip = $_('home.clipboard.copied');
    setTimeout(() => {
      tip = $_('home.clipboard.copy');
    }, 500);
  };
</script>

<Tooltip
  tip={tip}
  bottom
>
  <div on:mouseup={handleOnCopy}>
    <b>
      polkadot 
    </b>
    <p>
      0x618...0A0e
    </p>
  </div>
</Tooltip>

<style lang="scss">
   @import "../styles/mixins";

  div {
    text-align: center;
    cursor: pointer;

    padding: 2px;
    margin: 0px;

    @include border-radius(20px);

    & > h1 {
      margin-block-start: 0;
      margin-block-end: 0.2em;
      font-size: clamp(0.8rem, 2vw, 1rem);
    }
    & > p {
      font-size: 9pt;
      color: var(--text-color);
      margin: 0;
    }
    &:hover {
      background-color: var(--hover-color);
    }
  }
</style>