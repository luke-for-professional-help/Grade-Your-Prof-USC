<script lang="ts">
    import { Card, Avatar } from "flowbite-svelte";
    
    //STORE VARIABLES HERE
    
</script>

<a href="/professor-profile">
    <Card class="h-30 max-w-full p-4 sm:p-3 md:p-5 mb-3 mt-3">
        <div class="flex flex-row items-left pb-4 mr-5">
            <Avatar size="lg" class="mb-5" src="/images/profile-picture-3.webp" />
            <div class="flex flex-col items-left pb-4 ml-5 pt-2">
                <h5 class="flex flex-col mb-1 text-xl font-medium text-gray-900 dark:text-white">John Doe</h5><!--PROFESSOR NAME-->
                <span class="flex flex-col text-sm text-gray-500 dark:text-gray-400">Teaches:</span><!--SUBJECTS TAUGHT/SUBJECT ID-->
            </div>
        </div>
    </Card>
</a>
