<script lang="ts">
    import { Card, Button, Select, Toast } from "flowbite-svelte";
    import { slide } from "svelte/transition";
    import { CheckCircleSolid, CloseCircleSolid } from "flowbite-svelte-icons";
    import { enhance } from "$app/forms";

    let { userData } = $props();

    // 1. Determine initial role based on DB data
    const initialRole = userData.isAdmin ? "admin" : (userData.isModerator ? "mod" : "regular");

    // 2. Separate the UI display from the dropdown selection
    let currentRole = $state(initialRole); // This tracks what is saved in DB
    let pendingRole = $state(initialRole); // This tracks what is selected in dropdown
    
    let roles = [
        { value: "regular", name: "Regular User" },
        { value: "mod", name: "Moderator" },
        { value: "admin", name: "Admin" }
    ];

    let toastStatus = $state(false);
    let isError = $state(false);

    function triggerToast(error = false) {
        isError = error;
        toastStatus = true;
        setTimeout(() => toastStatus = false, 3000);
    }
</script>

<Card class="max-w-full p-4 mb-3">
    <div class="flex flex-row items-center">
        <div class="text-left">
            <h3 class="text-lg font-bold">Name: {userData.Username}</h3>
            <p class="text-sm text-gray-400">Email: {userData.Email}</p>
            <p class="text-sm text-gray-500">Confirmed Role: 
                <span class="font-semibold text-blue-600">
                    {currentRole === 'admin' ? 'Administrator' : currentRole === 'mod' ? 'Moderator' : 'User'}
                </span>
            </p>
        </div>

        <div class="ml-auto">
            <form method="POST" action="?/updateRole" use:enhance={() => {
                return ({ result }) => {
                    if (result.type === 'success') {
                        // Only update the 'Confirmed Role' text if the DB update succeeded
                        currentRole = pendingRole; 
                        triggerToast(false);
                    } else {
                        triggerToast(true);
                    }
                };
            }}>
                <input type="hidden" name="userId" value={userData.User_ID} />
                <div class="flex gap-2">
                    <Select items={roles} name="newRole" bind:value={pendingRole} size="sm" class="w-40"/>
                    <Button type="submit" size="sm" disabled={pendingRole === currentRole}>
                        Update
                    </Button>
                </div>
            </form>
        </div>
    </div>
</Card>

{#if toastStatus}
    <div class="fixed bottom-5 right-5 z-50" transition:slide>
        <Toast color={isError ? "red" : "green"}>
            {#snippet icon()}
                {#if isError} <CloseCircleSolid class="w-5 h-5" /> 
                {:else} <CheckCircleSolid class="w-5 h-5" /> {/if}
            {/snippet}
            {isError ? "Failed to update role." : "User role updated successfully!"}
        </Toast>
    </div>
{/if}