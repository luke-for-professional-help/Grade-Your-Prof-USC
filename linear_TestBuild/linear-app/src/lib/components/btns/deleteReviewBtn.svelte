<script lang="ts">
    import { Button, Modal } from "flowbite-svelte";
    import { slide } from "svelte/transition";
    let popupModal = $state(false);

  </script>
  
  <Button onclick={() => (popupModal = true)}>Delete</Button>
  
  <Modal form bind:open={popupModal} size="xs" transition={slide} permanent>
    <div class="text-center">
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this review?</h3>
      <div class="space-x-2">
        <Button type="submit" value="yes" color="red">Yes, I'm sure</Button>
        <Button type="submit" value="no" color="alternative">No, cancel</Button>
      </div>
    </div>
  </Modal>