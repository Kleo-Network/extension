<script>
  import Button from "../components/ui/Button.svelte";
  import { toasts } from "svelte-toasts";
  import { ethers } from "ethers";

  const chains = [
    {
      chainId: 56,
      chainName: "Binance Smart Chain",
      url: "https://bsc-dataseed.binance.org/",
    },
    {
      chainId: 1,
      chainName: "Ethereum Mainnet",
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    {
      chainId: 137,
      chainName: "Polygon (Matic) Mainnet",
      url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    {
      chainId: 80001,
      chainName: "Binance Greenfield Testnet",
      url: "https://rpc-testnet.bobadov.dev/",
    },
  ];

  let chain = chains[0];
  let creatingAccount = false;

  const createNewAccount = () => {
    const provider = new ethers.JsonRpcProvider(chain.url);
    const wallet = ethers.Wallet.createRandom().connect(provider);

    const privateKey = wallet.privateKey;
    const address = wallet.address;

    console.log({ wallet, privateKey, address });

    toasts.add({
      type: "success",
      description: `Your new account is created!`,
    });
  };
</script>

<section
  class="flex flex-col space-y-4 p-4 justify-around items-center h-screen w-full"
>
  <h2 class="text-3xl">Welcome to Kleo</h2>

  {#if !creatingAccount}
    <div class="flex flex-col space-y-4 w-full">
      <Button
        on:click={() => {
          creatingAccount = true;
        }}
        primary>Create</Button
      >
      <Button>Import</Button>
    </div>
  {/if}

  {#if creatingAccount}
    <div class="flex flex-col space-y-4 w-full">
      <p class="text-md text-gray-800">Select the chain of your choice</p>
      <select bind:value={chain} class="p-2 text-md">
        {#each chains as provider}
          <option value={provider}>
            {provider.chainName}
          </option>
        {/each}
      </select>

      {#if chain}
        <p class="text-sm text-gray-800">
          Selected Chain: <span class="text-lg text-gray-900"
            >{chain.chainName}</span
          >
        </p>
      {/if}

      <Button classes="py-2" on:click={createNewAccount}>Create</Button>
    </div>
  {/if}
</section>
