<script lang="ts">
    import { Card, Label, Button, Modal } from "flowbite-svelte";
    import PopProfessorRequest from "./requestModal/popProfessorRequest.svelte";
    import PopSubjectRequest from "./requestModal/popSubjectRequest.svelte";
    
    //placeholder values
    let requestId = 10009;
    let formModal = $state(false);
    let requestType = "Professor"; 
    //THIS VARIABLE SHOULD BE CHANGABLE IN THE BACKEND, when calling this component, 
    //the ID of this request component should be binded to the type of request. 
</script>

<Card class="h-30 max-w-full p-4 mb-3 mt-3 sm:p-3 md:p-5">
    <div class="flex flex-row text-justify pt-3">
        <div>
            <h3>ID: {Request_ID}</h3>
            <h3>Type of request: {requestType}</h3>
        </div>
        <div class="ml-auto flex-row pt-2">
            <Button  class="pl-auto" onclick={() => (formModal = true)}>View Item</Button>
        </div>
    </div>
</Card>

{#if formModal == true}
<div class="text-justify">
    <Modal form bind:open={formModal} size="sm">
        {#if requestType=="Professor"}
            <PopProfessorRequest />
        {:else}
            <PopSubjectRequest />
        {/if}
    </Modal>
</div>
    
{/if}


<!--WTF
SEPERATE COMPONENTS TO DISPLAY THE SUBEJCT AND PROF MODAL

BECAUSE subejct field requires
Request ID
Subject Code
Subejct Name

While professor field requires
Request ID
Professor Name
Professor Profile Pic
-->
