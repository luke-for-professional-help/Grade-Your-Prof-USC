<script lang="ts">
    import { Tabs, TabItem, Button, Input, Textarea } from "flowbite-svelte";
    import { Fileupload, Helper } from "flowbite-svelte";
    import { Label, Select } from "flowbite-svelte";

    //handles autocomplete for professor name 
    //to verify they exist in our database
    const professorNames = [
        "John Pork",
        "Mike Hunt",
        "Sigma Bouy",
        "Larry"
    ];

    //handle subject selection
    let selected = "";

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
    
</script>
  
<Tabs role="tablist">
    <TabItem open title="Make Review Form">
        <form method="POST">
            <div class="text-justify">
                <Label for="name" class="my-4">Professor Name</Label>
                <Input data={professorNames} clearable placeholder="Enter professor name here..." />
                <br>
                <Label>
                    Select a subject to review under this professor.
                    <Select class="mt-2" items={subjectCode} bind:value={selected} />
                </Label>
                <p class="text-xs">Subject not found? Click <a href="/request" class="underline text-blue-400">here</a></p>
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