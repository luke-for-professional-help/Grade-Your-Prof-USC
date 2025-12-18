<script>
    import { Card, Button } from "flowbite-svelte";
    import { enhance } from "$app/forms";
    
    let { review } = $props(); 
</script>

<<<<<<< HEAD
    let formModal = $state(false);
    //placeholder values below
    //server will load the variables for the following fields
    // redview_id
    //professor_name
    //subject_selected //this means which subject is being selected + the professor that the user inputted in the "make review" page
    //
    let reviewId = 200089;
    let professorName = "John Doe";
    let subjectSelected = "CIS1101";

    let review: string ="PLACE HODLER REVIEW FOR THIS STUPID ASS BALD ASS PROFESSOR"
</script>   

<Card class="h-30 max-w-full mb-3 mt-3 sm:p-5"> 
    <div class="flex flex-row text-justify">
=======
<Card size="xl" class="mb-4">
    <div class="flex justify-between items-start">
>>>>>>> c23756fb3feb0d739a9d9111c8171510050a7b82
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