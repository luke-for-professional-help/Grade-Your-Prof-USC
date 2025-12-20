<script lang="ts">
  import { Button, Modal } from "flowbite-svelte";
  import { ExclamationCircleOutline } from "flowbite-svelte-icons";
  
  // inputName and id are used by the hidden input
  let { id, inputName } = $props(); 
  let popupModal = $state(false);
</script>

<Button size="xs" color="red" outline onclick={() => (popupModal = true)}>Delete</Button>

<Modal bind:open={popupModal} size="xs" autoclose>
  <div class="text-center">
    <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12" />
    <h3 class="mb-5 text-lg font-normal text-gray-500">
      Are you sure you want to delete this submission?
    </h3>
    
    <input type="hidden" name={inputName} value={id} />
    
    <div class="flex justify-center gap-4">
      <Button type="submit" color="red">Yes, I'm sure</Button>
      <Button type="button" color="alternative" onclick={() => (popupModal = false)}>No, cancel</Button>
    </div>
  </div>
</Modal>