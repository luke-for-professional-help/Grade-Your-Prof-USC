<script lang="ts">
    import { Card } from "flowbite-svelte";
    import { Hr } from "flowbite-svelte";
    let {data} = $props();
</script>

<!--EACH CARD DISPLAYS INDIVIDUAL REVIEWS MADE BY STUDENTS

Data{
Review_ID
User_ID
Professor_ID
Subject_ID
Review //the content of the review
}

-->
<Card size="lg" class="max-w-full mt-4 mb-4">
    <div class="m-5 flex-col">
        <h3 class="text-md text-black-500">Review ID: [REVIEW_ID]</h3>
        <h4 class="text-sm text-gray-700">[SUBJECT_ID]</h4>
        <h5 class="text-sm text-gray-700">09/23/2024</h5>

        <Hr />
        <p class="text-md text-gray-500 dark:text-gray-400">
            <!--This is the field where the review is displayed-->
            <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. -->
            {data.Description}
        </p>
    </div>
    
</Card>