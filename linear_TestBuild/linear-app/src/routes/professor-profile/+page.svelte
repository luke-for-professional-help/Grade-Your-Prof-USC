<script lang="ts">
    import { Card, Dropdown, DropdownItem, Avatar, Button, Img } from "flowbite-svelte";
    import { ButtonGroup } from "flowbite-svelte";
    import ProfessorReviewCard from "$lib/components/professor/professorReviewCard.svelte";
    import { Tabs, TabItem   } from "flowbite-svelte";
	import ProfessorQueryResults from "$lib/components/professor/professorQueryResults.svelte";
</script>


<!--THIS DISPLAYS THE PROFESSOR'S PROFILE AND REVIEWS WILL BE PLACED UNDER

Data{
professor_id:
professor_name:
subject_id:
subjectsTaught:
}-->
<div class="flex justify-center items-start mt-20">
    <div class="w-full max-w-5xl rounded-xl p-6">
        <Card size="xl">
            <div class="flex flex-row items-center m-5">
                <Img src="/images/examples/image-2@2x.jpg" alt="sample 1" class="max-w-xl shadow-xl dark:shadow-gray-800" />
                <div class="flex flex-col ml-5">
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">John Doe</h5>
                    <span class="text-sm text-gray-500 dark:text-gray-400">Teaches: CIS1101, CIS1201, CIS2102</span>
                </div>
                <div class="mt-4 flex space-x-3 lg:mt-2 rtl:space-x-reverses ml-auto">
                  <Button>Share</Button>
                </div>
            </div>
        </Card>        
    </div>
</div>

<!--THIS DISPLAYS THE INDIVIDUAL SUBJECTS THE PROFESSOR TEACHES INCLUDING ALL
Data{
subject_id
professor_id
review_id
user_id
}
-->

<!--Tabs display the options that the user can select
    Tab filters the individual subjects taught by that professor
    ProfessorReviewCard will display the component that contains the individual review made by a user under that same subject-->
<div class="flex justify-center items-start mt-5 pb-20">
    <div class="w-full max-w-5xl rounded-xl p-6">
        <Tabs tabStyle="underline">
            <TabItem open title="All">
                <ProfessorReviewCard />
                <ProfessorReviewCard />
            </TabItem>
            <TabItem open title="CIS1101">
                <ProfessorReviewCard />
                <ProfessorReviewCard />
                <ProfessorReviewCard />
                <ProfessorReviewCard />
            </TabItem>
            <TabItem open title="CIS1201">
                <ProfessorReviewCard />
                <ProfessorReviewCard />
            </TabItem>
            <TabItem open title="CIS2102">
                <ProfessorReviewCard />
                <ProfessorReviewCard />
                <ProfessorReviewCard />
            </TabItem>
        </Tabs>
    </div>
</div>

<!--TO LOAD PROFESSOR REVIEW CARDS
RUN A LOOP THAT WILL DISPLAY

FOR ALL DISPLAY ALL
FOR DISPLAY ALL IN [SUBJECT_ID]-->
