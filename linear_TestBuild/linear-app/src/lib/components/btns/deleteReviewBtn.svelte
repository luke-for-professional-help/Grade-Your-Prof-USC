<script lang="ts">
  import { Button, Modal } from "flowbite-svelte";
  import { ExclamationCircleOutline, CloseOutline } from "flowbite-svelte-icons";
  import { enhance } from '$app/forms';
  
  let { id, inputName, action } = $props(); 
  let popupModal = $state(false);
</script>

<button 
  type="button" 
  class="text-gray-400 hover:text-red-600 transition-colors p-2"
  onclick={() => (popupModal = true)}
>
  <CloseOutline class="w-5 h-5" />
</button>

<Modal bind:open={popupModal} size="xs" autoclose={false} outsideclose>
  <div class="text-center">
    <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12" />
    <h3 class="mb-5 text-lg font-normal text-gray-500">
      Are you sure you want to delete this {inputName === 'reviewId' ? 'review' : 'request'}?
    </h3>
    
    <div class="flex justify-center gap-4">
      <form method="POST" {action} use:enhance={() => {
        return async ({ update }) => {
          popupModal = false; // Close modal on finish
          await update();
        };
      }}>
        <input type="hidden" name={inputName} value={id} />
        <Button type="submit" color="red">Yes, delete it</Button>
      </form>

      <Button 
        type="button" 
        color="alternative" 
        onclick={() => (popupModal = false)}
      >
        No, cancel
      </Button>
    </div>
  </div>
</Modal>