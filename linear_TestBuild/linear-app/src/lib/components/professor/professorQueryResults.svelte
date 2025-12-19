<script lang="ts">
    import { Card, Avatar } from "flowbite-svelte";
    import {goto} from '$app/navigation';

    //STORE VARIABLES HERE
    let { profResult } = $props();
    console.log("yeah", profResult);
    console.log("yeah1", profResult.Prof_ID);
</script>

<a href="/professor-profile/{profResult.Prof_ID}" >
    <Card class="h-30 max-w-full p-4 sm:p-3 md:p-5 mb-3 mt-3">
        <div class="flex flex-row items-left pb-4 mr-5">
            <Avatar size="lg" class="mb-5" src={profResult.Professor_img && profResult.Professor_img !== 'null' ? `/img/${profResult.Professor_img}` : '/img/default-avatar.png'} />
            <div class="flex flex-col items-left pb-4 ml-5 pt-2">
                <h5 class="flex flex-col mb-1 text-xl font-medium text-gray-900 dark:text-white">{profResult.Professor_Name}</h5><!--PROFESSOR NAME-->
                <span class="flex flex-col text-sm text-gray-500 dark:text-gray-400">Teaches: {profResult.Subjects}</span><!--SUBJECTS TAUGHT/SUBJECT ID-->
            </div>
        </div>
    </Card>
</a>
