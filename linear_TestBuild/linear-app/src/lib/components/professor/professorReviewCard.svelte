<script lang="ts">
    import { Card } from "flowbite-svelte";
    import { Hr } from "flowbite-svelte";
</script>

<!--EACH CARD DISPLAYS INDIVIDUAL REVIEWS MADE BY STUDENTS

Data{
review_id:
user_id:
professor_id:
subject_id:
}

-->
<Card size="lg" class="max-w-full mt-4 mb-4">
    <div class="m-5 flex-col">
        <h3 class="text-md text-black-500">Review ID: [REVIEW_ID]</h3>
        <h4 class="text-sm text-gray-700">[SUBJECT_ID]</h4>
        <Hr />
        <p class="text-md text-gray-500 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
    </div>
    
</Card>