<script lang="ts">
    import { Label, Input, Button, Modal, Avatar } from "flowbite-svelte";
    import { enhance } from '$app/forms';

    // Svelte 5 way to receive props and bind the open state
    let { requestData, open = $bindable() } = $props();
</script>

<Modal title="Professor Request" bind:open size="md">
    <div class="space-y-4">
        <p class="text-sm text-gray-500">
            Request ID: {requestData.Request_ID}
        </p>
        
        <div class="flex flex-col items-center mb-4">
            {#if requestData.Professor_img}
                <Avatar src={requestData.Professor_img} size="xl" border />
            {:else}
                <Avatar size="xl" border /> 
            {/if}
        </div>

        <Label class="space-y-2">
            <span>Professor Name</span>
            <Input disabled value={requestData.profName} />
        </Label>

        {#if requestData.subName}
            <Label class="space-y-2">
                <span>Assigned Subject</span>
                <Input disabled value={`${requestData.subCode} - ${requestData.subName}`} />
            </Label>
        {/if}

        <Label class="space-y-2">
            <span>Information / Note</span>
            <Input disabled value="Pending verification of credentials" />
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