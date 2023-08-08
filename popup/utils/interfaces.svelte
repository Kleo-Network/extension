<script context="module" lang="ts">
  export interface AccordionData {
    header: string;
    default: boolean;
    expanded?: boolean;
    subMenu: SubMenuItem[];
  }
  
  export interface SubMenuItem {
    index: string;
    times: number;
    days: number;
    default: boolean;
    state: ConnectStates;
  }
  
  export enum ConnectStates {
    SELECTED = 'selected',
    DISABLED = 'disabled',
    DESELECTED = 'deselected'
  }
</script>