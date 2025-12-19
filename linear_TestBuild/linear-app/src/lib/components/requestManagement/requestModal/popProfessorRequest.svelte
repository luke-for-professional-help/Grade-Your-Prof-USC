<script>
    import { Modal, Button, Label, Badge, Avatar } from "flowbite-svelte";
    import { enhance } from "$app/forms";
    
    let { requestData, fileExt, open = $bindable() } = $props();

    const hasSubject = $derived(!!(requestData.subCode || requestData.subName));
</script>

<Modal title="Professor Request Details" bind:open size="xl" autoclose={false}>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div class="space-y-6">
            <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
                <div class="flex-shrink-0">
                    {#if requestData.profImg}
                        <img 
                            src={requestData.profImg} 
                            alt={requestData.profName} 
                            class="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                        />
                    {:else}
                        <Avatar size="lg" border class="w-20 h-20" />
                    {/if}
                </div>
                <div class="text-left">
                    <Label class="text-gray-500 text-xs uppercase tracking-wider">Professor Identity</Label>
                    <h3 class="text-xl font-black text-gray-900">{requestData.profName || 'Unknown'}</h3>
                </div>
            </div>

            <div class="text-left space-y-4">
                {#if hasSubject}
                    <div class="p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <Badge color="blue" class="mb-2">Linked Course</Badge>
                        <p class="font-medium text-gray-800">
                            {requestData.subCode} - {requestData.subName}
                        </p>
                    </div>
                {/if}

                <div class="pt-6 border-t">
                    <h4 class="font-bold mb-3 text-sm uppercase text-gray-500">Moderator Verdict</h4>
                    <form method="POST" action="?/moderateRequest" use:enhance={() => { open = false; }}>
                        <input type="hidden" name="requestId" value={requestData.Request_ID} />
                        <div class="grid grid-cols-2 gap-4">
                            <Button type="submit" name="action" value="approve" color="green" disabled={requestData.Status_ID === 2}>
                                {requestData.Status_ID === 2 ? 'Approved' : 'Approve'}
                            </Button>
                            <Button type="submit" name="action" value="reject" color="red" disabled={requestData.Status_ID === 3}>
                                {requestData.Status_ID === 3 ? 'Rejected' : 'Reject'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="bg-gray-100 rounded-xl p-2 flex flex-col h-[500px]">
            <h4 class="text-xs font-bold uppercase text-gray-500 mb-2 px-2 text-left">Verification Document</h4>
            <div class="flex-grow bg-white rounded-lg border overflow-hidden flex items-center justify-center">
                {#if requestData.Study_Load}
                    {#if fileExt === 'pdf'}
                        <iframe src={requestData.Study_Load} class="w-full h-full" title="PDF"></iframe>
                    {:else if ['jpg', 'jpeg', 'png'].includes(fileExt)}
                        <img src={requestData.Study_Load} alt="Proof" class="max-w-full max-h-full object-contain" />
                    {:else}
                        <div class="text-center p-4">
                            <p class="text-sm text-gray-600 mb-2">File type .{fileExt} cannot be previewed.</p>
                            <Button href={requestData.Study_Load} download size="xs" color="alternative">Download to View</Button>
                        </div>
                    {/if}
                {:else}
                    <p class="text-gray-400 italic">No study load document provided.</p>
                {/if}
            </div>
        </div>

    </div>
</Modal>