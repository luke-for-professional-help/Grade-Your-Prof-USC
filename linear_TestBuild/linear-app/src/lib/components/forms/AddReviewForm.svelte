<script lang="ts">
    import { Tabs, TabItem, Button, Input, Textarea, toast } from "flowbite-svelte";
    import { Fileupload, Helper } from "flowbite-svelte";
    import { Label, Select } from "flowbite-svelte";
    import { Modal, Checkbox, Toast } from "flowbite-svelte";
    import { slide } from "svelte/transition";
    import { CheckCircleSolid } from "flowbite-svelte-icons";
    let {data} =$props();
    let prof=$state("");
    let sub= $state("");
    let review = $state("");
    console.log("Rev: ", data.allProfs[0]);
    //handles autocomplete for professor name 
    //to verify they exist in our database
    //currently these are just placeholder names
    //Professor will also have an ID in the backend so we can link subjects to them
    
    const professorName = data.allProfs.map(row => row.Professor_Name);
    console.log(professorName);

    //handle subject selection
    // svelte-ignore non_reactive_update
        let selected = "";
    const subjects = data.subsUnderProfFlattened.map(t => t.Full_Subject);
    console.log("Subs: ", subjects);


    let selectedFiles = $state<FileList | null>(null);
    let fileNames = $derived(
    selectedFiles
        ? Array.from(selectedFiles)
            .map((file) => file.name)
            .join(", ")
        : "No files selected"
    );

    const handleSubmit = (e: Event): void => {
      e.preventDefault();

    };
    
    let formModal = $state(false);
    let toastStatus = $state(false);
    let counter = 5; 

//handles toast notification after user presses the button
    function popToast() {
        toastStatus = true;
        counter = 5; 
        timeout();
    }

    function timeout() {
        if (--counter) return setTimeout(timeout, 1000);
        toastStatus = false;
    }


</script>
  
    <Tabs role="tablist">
        <TabItem open title="Make Review Form">
            <form method="POST" enctype="multipart/form-data" action="?/addReview&prof_ID={data.allProfs[0]?.Prof_ID ?? ''}">
                <div class="text-justify">
                    <Label for="name" class="my-4">Professor Name</Label>
                    <Input bind:value={prof} data={professorName} name="profName" clearable placeholder="Enter professor name here..." />
                    <p class="text-xs">Professor not found? Click <a href="/request-page" class="underline text-blue-400">here</a></p>
                    <br>
                    <Label>
                        Search for a subject to review with this professor
                    </Label>
                    <Input bind:value={sub} data={subjects} name="subName" clearable placeholder="Search for subject code here..."/>
                    <p class="text-xs">Subject not found? Click <a href="/request-page?prof_ID={data.allProfs[0].Prof_ID}" class="underline text-blue-400">here</a></p>
                    <br>
                    <Label for="textarea-id" class="mb-2" >Review</Label>
                    <Textarea bind:value={review} id="textarea-id" placeholder="Write your review here..." rows={4} name="message" class="w-full" />
                    <br>

                    <Label for="textarea-id" class="mb-2" >Upload a copy of your study load here</Label>
                    <Fileupload name="studyLoad" clearable bind:files={selectedFiles} multiple />
                    <Helper color="emerald" class="mt-2">Selected files: {fileNames}</Helper>
                    <Button type="submit" class="mt-4">Submit</Button>
                </div>
            </form>
        </TabItem>

        <TabItem title="Rules">
            <h3>Rules</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </TabItem>
    </Tabs>
{#if formModal == true}
    <div class="text-justify">
        <Modal form bind:open={formModal} size="xs">
                <div class="flex flex-col space-y-6">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add a subject for this professor</h3>
            <Label class="space-y-2">
                <span>Subject Code</span>
                <Input type="Subject_Code" name="subject code" placeholder="GE-PC" required />
            </Label>
            <Label class="space-y-2">
                <span>Subject Name</span>
                <Input type="Subject_Name" name="subject name" placeholder="General Elective - Purposive Communication" required />
            </Label>
                <Button type="submit" onclick={popToast} name="action" value="request_subject">Submit</Button>
                </div>
        </Modal>
    </div>

{/if}

<div class="fixed bottom-5 right-5">
    <Toast transition={slide} bind:toastStatus>
        {#snippet icon()}
            <CheckCircleSolid class="h-5 w-5" />
        {/snippet}
        Request sent! 
    </Toast>
</div>
