<script lang="ts">
    import { Input, Label, Helper, Button } from "flowbite-svelte";
    import { Tabs, TabItem, Fileupload, Select } from "flowbite-svelte";

    let selected: string = "TEST";

    let options: { value: string; name: string }[] = [
        { value: "prof", name: "Professors" },
        { value: "sub", name: "Subject" }
    ];

    let clearableSelected = $state("");
    //handle file upload for Study Load
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
    <TabItem open title="Request Form">
        <form method="POST">
            <div class="text-justify">
                
                <Label>
                    Select which item to request
                    <Select class="mt-2" items={options} bind:value={clearableSelected} clearable />
                </Label>
                {#if }

                {:else}

                {/if}
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

