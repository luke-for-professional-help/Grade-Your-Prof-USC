<script lang="ts">
    import { Label, Input, Button, Modal } from "flowbite-svelte";
    import { enhance } from '$app/forms';

    let { requestData, open = $bindable() } = $props();
</script>

<Modal title="Subject Request" bind:open size="md">
    <div class="space-y-4">
        <p class="text-sm text-gray-500">Request ID: {requestData?.Request_ID}</p>
        
        <Label class="space-y-2">
            <span>Subject Code</span>
            <Input disabled value={requestData?.subCode || 'No Code'} />
        </Label>

        <Label class="space-y-2">
            <span>Subject Name</span>
            <Input disabled value={requestData?.subName || 'No Name'} />
        </Label>
    </div>

    {#snippet footer()}
        <form method="POST" action="?/moderateRequest" use:enhance class="flex w-full justify-between">
            <input type="hidden" name="requestId" value={requestData?.Request_ID} />
            
            <Button color="red" name="action" value="reject" type="submit">
                Reject
            </Button>

            <div class="flex gap-2">
                <Button color="alternative" onclick={() => (open = false)}>Cancel</Button>
                <Button color="green" name="action" value="approve" type="submit">
                    Approve
                </Button>
            </div>
        </form>
    {/snippet}
</Modal>