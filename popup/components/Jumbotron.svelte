<script lang="ts">
    export let title = '';
    export let description = '';
  </script>
  
  <div class="card">
    <h3>
      {title}
    </h3>
    <p>
      {description}
    </p>
    <slot />
  </div>
  
  <style lang="scss">
    @import "../styles/mixins";
    .card {
          background-color: var(--card-color);
  
      min-width: 290px;
      max-width: 500px;
      width: 100vw;
      padding: 16px;
          margin-block-end: 16px;
  
          & > h2 {
              margin: 0;
        font-size: 11pt;
          }
      & > p {
        font-size: 9pt;
      }
      & > :global(.right) {
        position: relative;
        right: 0;
        left: 85%;
      }
  
          @media screen and (min-width: 400px) {
              @include border-radius(8px);
      }
      }
  </style>