<script>
    import { Card, Button } from "flowbite-svelte";
    import { enhance } from "$app/forms";
    
    let { review } = $props(); 
</script>

<Card size="xl" class="mb-4">
    <div class="flex justify-between items-start">
        <div>
            <h5 class="text-lg font-bold">Review for {review.Professor_Name}</h5>
            <p class="text-sm text-gray-500">By {review.Username} | {review.Subject_Name}</p>
            <p class="mt-2 italic">"{review.Description}"</p>
        </div>
        
        <form method="POST" action="?/moderateReview" use:enhance class="flex gap-2">
            <input type="hidden" name="reviewId" value={review.Review_ID} />
            
            <Button type="submit" name="action" value="2" color="green" size="xs">Approve</Button>
            <Button type="submit" name="action" value="3" color="red" size="xs">Reject</Button>
        </form>
    </div>
</Card>