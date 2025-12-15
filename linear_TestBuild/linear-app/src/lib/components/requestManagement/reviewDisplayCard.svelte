<script lang="ts">
	import { user } from "$lib/stores/user";
    import { Button, Card, Modal, Input, Label, Textarea } from "flowbite-svelte";
    

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

<Card class="h-30 max-w-full mb-3 mt-3 sm:p-3 sm:p-5"> 
    <div class="flex flex-row text-justify">
        <div>
            <h3>Review ID: {reviewId}</h3>
            <h3>Professor Name: {professorName}</h3>
            <h3>Subject Selected: {subjectSelected}</h3>
        </div>
        <div class="ml-auto flex-row pt-3.5">
            <Button onclick={() => (formModal = true)}>View</Button>
        </div>
    </div>
</Card>


{#if formModal == true}
<div class="text-justify">
    <Modal form bind:open={formModal} size="sm">
        <Label>
            <h2>Professor review</h2>
        </Label>
        <Card class="max-w-full">
            <div class="m-4">
                <Label>
                    <h3 class="mt-2">
                        Review ID: {reviewId}
                    </h3>
                </Label>
                <Label>
                    <h3 class="mt-2">
                        Professor Name: 
                    </h3>
                    <Input disabled readonly value="John Pork"/>
                </Label>
                    <br>
                <Label>
                    <h3 class="mt-2">
                    Subject Code:
                    </h3>
                    <Input disabled readonly value="CIS1101"/>
                </Label>        
                    <br>
                <Label>
                    <h3 class="mt-2">
                        User's review: 
                    </h3>
                    <Textarea id="textarea-id" placeholder={review} disabled rows={4} name="message" class="w-full" />
                </Label>
            </div>    
            <div class="ml-4 mt-2 mb-2 ">
                <Button>
                    Post this review
                </Button>
            </div>
        </Card>
    </Modal>
</div>
    
{/if}

