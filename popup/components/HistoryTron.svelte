<script lang="ts">
    export let title = '';
    export let url = '';
  </script>
<div
  class="card"
>
  <div>
    <a href={url} target="_blank">

    
     {title}
    
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6 icon_block"
    >
        <path
            fill-rule="evenodd"
            d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z"
            clip-rule="evenodd"
        />
    </svg>
    </a>
  </div>
  <div>
    
<svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6 icon_block"
        >
          <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
</svg>
<p>delete</p>

    
   
  </div>
</div>

<style lang="scss">
    @import "../styles/mixins";

 .icon_block {
    font-size: 16px;
    width: 25px;
  }
  div.card a {
    font-size: 4vw;
        color: var(--muted-color);
        line-height: 1rem;
        font-variant-ligatures: common-ligatures;
  }
  div.card {
    cursor: pointer;
		padding: 5px;
		margin: 3px;
		
		width: 300px;
		background-color: var(--card-color);
		box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
			rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

    @include flex-between-row;
    &:hover {
        @include border-radius(3px);
        border-left: solid 3px var(--success-color);
    }
    &.success {
      border-left: solid 5px var(--success-color);
    }
    &.error {
      border-left: solid 5px var(--danger-color);
    }
    &.loading {
      @include loading-gradient(var(--background-color), var(--card-color));
    }
    & > div {
      padding-left: 2px;
      padding-right: 2px;

      &:last-child {
        text-align: right;
      }
     
      & > p {
        font-size: 9pt;
      }
    }
  }
</style>