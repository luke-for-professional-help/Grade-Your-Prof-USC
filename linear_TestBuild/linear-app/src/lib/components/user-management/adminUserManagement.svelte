<script lang="ts">
    import { Card, Button, Select, Toast, toast } from "flowbite-svelte";
    import { slide } from "svelte/transition";
    import { CheckCircleSolid, CloseCircleSolid } from "flowbite-svelte-icons";

    let userNames=[
        "Ian Florentino"
    ]

    let selected = null;
    
    let roles: { value: string; name: string }[] = [
        { value: "regular", name: "Regular User" },
        { value: "mod", name: "Moderator" },
        { value: "admin", name: "Admin" }
    ];

    let toastStatus = false;
    let counter = 3;

    function handleToast(){
        if(selected==null){
            popToast();
        } else{
            popToast();
        }
    }
    function popToast(){
        toastStatus = true;
        counter = 3;
        timeout();
    }

    function timeout(){
        if(--counter) return setTimeout(timeout, 1000);
        toastStatus = false;
    }

    let currRole = "Moderator"; // current role to be displayed
    let date = "10/13/2025"

</script>

<Card class="h-30 max-w-full p-4 sm:p-3 md:p-5 mb-3 mt-3">
    <div class="flex flex-row text-justify">
        <div>
            <h3>Name: {userNames}</h3>
            <p class="text-gray-400">Role: {currRole}</p>
            <p class="text-gray-400">Date Added: {date}</p>
        </div>
        <div class="ml-auto flex-row">
            <Select items={roles} bind:value={selected} size="md" class="flex mb-1"/>
            <Button onclick={handleToast} class="pl-auto">Update</Button>
        </div>
    </div>
</Card>

{#if selected==null}
    <div class="fixed bottom-5 right-5 text-justify">
        <Toast transition={slide} bind:toastStatus color="red">
            {#snippet icon()}
                <CloseCircleSolid class="h-5 w-5" />
            {/snippet}
            Please select a role to update first!
        </Toast>
    </div>  
{:else}
    <div class="fixed bottom-5 right-5">
        <Toast transition={slide} bind:toastStatus color="green">
            {#snippet icon()}
                <CheckCircleSolid class="h-5 w-5" />
            {/snippet}
            User role updated successfully!
        </Toast>
    </div>
{/if}

