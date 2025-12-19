<script>
    import { Modal, Button, Label, Badge, Rating, Tooltip } from "flowbite-svelte";
    import { InfoCircleOutline } from "flowbite-svelte-icons";
    import { enhance } from "$app/forms";
    
    let { review, fileExt, open = $bindable() } = $props();

    // Logic to enforce verification
    const hasProof = $derived(!!review.Study_Load);
</script>

<Modal title="Review Verification" bind:open size="xl" autoclose={false}>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div class="space-y-6 text-left">
            <div>
                <h3 class="text-2xl font-black text-gray-900">{review.Professor_Name}</h3>
                <p class="text-gray-500 font-mono">{review.Subject_Code}</p>
                
                <div class="mt-4 p-4 bg-gray-50 rounded-lg border border-dashed">
                    <div class="flex items-center justify-between mb-2">
                        <Rating total={5} rating={review.Rating} size="24" />
                        <span class="font-bold text-lg">{review.Rating} / 5</span>
                    </div>
                    <p class="text-gray-800 leading-relaxed whitespace-pre-wrap">
                        "{review.Description || 'No detailed comment.'}"
                    </p>
                </div>
            </div>

            <div class="pt-6 border-t">
                <div class="flex items-center justify-between mb-3">
                    <h4 class="font-bold text-sm uppercase text-gray-500">Moderation Action</h4>
                    {#if !hasProof}
                        <Badge color="red" class="flex items-center gap-1">
                            <InfoCircleOutline class="w-3 h-3" /> Verification Required
                        </Badge>
                    {/if}
                </div>

                <form method="POST" action="?/moderateReview" use:enhance={() => { open = false; }}>
                    <input type="hidden" name="reviewId" value={review.Review_ID} />
                    <div class="grid grid-cols-2 gap-4">
                        <Button 
                            type="submit" 
                            name="action" 
                            value="approve" 
                            color="green" 
                            disabled={!hasProof || review.Status_ID === 2}
                            id="approve-btn"
                        >
                            {review.Status_ID === 2 ? 'Approved' : 'Approve Review'}
                        </Button>
                        
                        {#if !hasProof}
                            <Tooltip triggeredBy="#approve-btn" class="bg-red-600 text-white">
                                Cannot approve without Study Load verification.
                            </Tooltip>
                        {/if}

                        <Button type="submit" name="action" value="reject" color="red" disabled={review.Status_ID === 3}>
                            {review.Status_ID === 3 ? 'Rejected' : 'Reject Review'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>

        <div class="bg-gray-100 rounded-xl p-2 flex flex-col h-[550px]">
            <h4 class="text-xs font-bold uppercase text-gray-500 mb-2 px-2 text-left">Student Study Load</h4>
            <div class="flex-grow bg-white rounded-lg border overflow-hidden flex items-center justify-center">
                {#if hasProof}
                    {#if fileExt === 'pdf'}
                        <iframe src={review.Study_Load} class="w-full h-full" title="Review Proof"></iframe>
                    {:else if ['jpg', 'jpeg', 'png'].includes(fileExt)}
                        <img src={review.Study_Load} alt="Proof" class="max-w-full max-h-full object-contain" />
                    {:else}
                        <div class="text-center p-4">
                            <p class="text-sm text-gray-600 mb-2">File type .{fileExt} cannot be previewed.</p>
                            <Button href={review.Study_Load} download size="xs" color="alternative">Download Proof</Button>
                        </div>
                    {/if}
                {:else}
                    <div class="text-center p-10 flex flex-col items-center">
                        <div class="bg-red-50 p-4 rounded-full mb-4">
                            <InfoCircleOutline class="w-12 h-12 text-red-500" />
                        </div>
                        <p class="text-red-600 font-bold">No Document Provided</p>
                        <p class="text-gray-500 text-sm mt-2 px-6">
                            This user has not submitted a study load. According to policy, this review must be rejected.
                        </p>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</Modal>