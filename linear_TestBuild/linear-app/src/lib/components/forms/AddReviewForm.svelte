<script lang="ts">
    import { Tabs, TabItem, Button, Input, Textarea, toast } from "flowbite-svelte";
    import { Fileupload, Helper } from "flowbite-svelte";
    import { Label, Select } from "flowbite-svelte";
    import { Modal, Checkbox, Toast } from "flowbite-svelte";
    import { slide } from "svelte/transition";
    import { CheckCircleSolid } from "flowbite-svelte-icons";

    //handles autocomplete for professor name 
    //to verify they exist in our database
    //currently these are just placeholder names
    //Professor will also have an ID in the backend so we can link subjects to them
    const professorName = [
        "John Pork",
        "Mike Hunt",
        "Sigma Bouy",
        "Miguel Florentino",
        "Anna Conda",
        "Justin Case",
        "Holly Wood",
        "Ima Pigg",
        "Ben Dover",
        "Larry"
    ];

    //handle subject selection
    let selected = "";
    //placeholder subjects
    //backend should load the list of subejcts binded to the selected professor's ID
    let subjectCode: { value: string; name: string }[] = [
        { value: "cis1101", name: "CIS1101: Programming I" },
        { value: "cis1201", name: "CIS1201: Programming II" },
        { value: "cis2102", name: "CIS2102: Web Development II" }
    ];


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
        <form method="POST">
            <div class="text-justify">
                <Label for="name" class="my-4">Professor Name</Label>
                <Input data={professorName} clearable placeholder="Enter professor name here..." />
                <p class="text-xs">Professor not found? Click <a href="/addProfessor" class="underline text-blue-400">here</a></p>
                <br>
                <Label>
                    Select a subject to review under this professor.
                    <Select class="mt-2" items={subjectCode} bind:value={selected} />
                </Label>
                <p class="text-xs">Subject not found? Click <a href="#" onclick={() => (formModal = true)} class="underline text-blue-400">here</a></p>
                <br>
                <Label for="textarea-id" class="mb-2">Review</Label>
                <Textarea id="textarea-id" placeholder="Write your review here..." rows={4} name="message" class="w-full" />
                <br>

                <Label for="textarea-id" class="mb-2">Upload a copy of your study load here</Label>
                <Fileupload clearable bind:files={selectedFiles} multiple />
                <Helper color="emerald" class="mt-2">Selected files: {fileNames}</Helper>
                <Button onclick={handleSubmit} class="mt-4">Submit</Button>
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
            <Button type="submit" onclick={popToast} value="request_subject">Submit</Button>
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
