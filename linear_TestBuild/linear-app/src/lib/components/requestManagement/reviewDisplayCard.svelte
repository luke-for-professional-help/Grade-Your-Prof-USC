<script>
    import { Card, Button, Badge } from "flowbite-svelte";
    import { enhance } from '$app/forms';

    let { review } = $props();

    // Mapping for Review Status
    const statusMap = {
        1: { text: 'Pending', color: 'yellow' },
        2: { text: 'Approved', color: 'green' },
        3: { text: 'Rejected', color: 'red' }
    };

    const currentStatus = $derived(statusMap[review.Status_ID] || { text: 'Pending', color: 'yellow' });
</script>

<Card class="mb-4 relative p-5 max-w-full">
    <div class="absolute top-4 right-4">
        <Badge color={currentStatus.color} class="px-3 py-1 text-xs font-bold uppercase">
            {currentStatus.text}
        </Badge>
    </div>

    <div class="flex items-center justify-between gap-6">
        
        <div class="flex-grow">
            <h3 class="text-xl font-bold text-gray-900">
                Review for {review.Professor_Name}
            </h3>
            <p class="text-sm text-gray-500 mb-2">
                By <span class="font-semibold">{review.Username}</span> | {review.Subject_Code}
            </p>
            <p class="italic text-gray-700 bg-gray-50 p-3 rounded-lg border-l-4 border-gray-200">
                "{review.Description}"
            </p>
        </div>

        <div class="flex flex-shrink-0 gap-2">
            <form method="POST" action="?/moderateReview" use:enhance class="flex gap-2">
                <input type="hidden" name="reviewId" value={review.Review_ID} />
                
                <Button type="submit" name="action" value="approve" color="green" class="w-24 h-12 gap-1 font-bold">
                    Post
                </Button>

                <Button type="submit" name="action" value="reject" color="red" class="w-24 h-12 gap-1 font-bold">
                    Deny
                </Button>
            </form>
        </div>
    </div>
</Card>