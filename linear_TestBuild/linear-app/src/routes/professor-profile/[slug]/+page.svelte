<script lang="ts">
    import { Card, Dropdown, DropdownItem, Avatar, Button, Img } from "flowbite-svelte";
    import ProfessorReviewCard from "$lib/components/professor/professorReviewCard.svelte";
    import { Tabs, TabItem   } from "flowbite-svelte";
    import { isLoggedIn } from "$lib/stores/user";
    let {data} = $props();
    console.log("STUF",data.reviews[0]);
    console.log("data1: ", data.reviews[0].Subject_Code);
    console.log("data2: ", data.teacher[0].Subject_Code);
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
                <Img src={data.teacher[0].Professor_img && data.teacher[0].Professor_img !== 'null' ? `/img/${data.teacher[0].Professor_img}` : '/img/default-avatar.png'} alt="sample 1" class="max-w-full max-h-18 object-contain rounded-full shadow-xl dark:shadow-gray-800"  />
                <div class="flex flex-col ml-5">
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.teacher[0].Professor_Name}</h5>
                    <span class="text-sm text-gray-500 dark:text-gray-400">Teaches: {data.teacher.map(t => t.Subject_Code).join(', ')}</span>
                </div>
                <div class="mt-4 flex space-x-3 lg:mt-2 rtl:space-x-reverses ml-auto">
                    {#if $isLoggedIn}
                        <Button href="/createpage/?prof_ID={data.teacher[0].Prof_ID}">Add Review</Button>
                    {/if}
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
                    {#each data.reviews as review}
                        <ProfessorReviewCard data={review}/>
                    {/each}
                </TabItem>

            {#each data.teacher as teacher}
                <TabItem open title={teacher.Subject_Code}>
                    {#each data.reviews as review}
                        {#if review.Subject_Code == teacher.Subject_Code}
                            <ProfessorReviewCard data={review} />
                        {/if}
                    {/each}
                </TabItem>
            {/each}
        </Tabs>
    </div>
</div>

<!--TO LOAD PROFESSOR REVIEW CARDS
RUN A LOOP THAT WILL DISPLAY

FOR ALL DISPLAY ALL
FOR DISPLAY ALL IN [SUBJECT_ID]-->
