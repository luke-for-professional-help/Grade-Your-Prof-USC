<script lang="ts">

    import { Card, Input, Label, Helper, Button } from "flowbite-svelte";
    import { Tabs, TabItem, Fileupload, Select } from "flowbite-svelte";
    import AddProf from "$lib/components/forms/AddProf.svelte";
    import AddSub from "$lib/components/forms/AddSub.svelte";

    let clearableSelected = $state(""); 
    let selectedValue = $derived(clearableSelected);

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
    let profRules = "PROFESSOR RULES";
    let subRules = "SUBJECT RULES";
    
</script>


<div class="flex justify-center items-start mt-15">
    <div class="w-full max-w-3xl rounded-xl p-6">
        <Card size="lg" class="p-4 text-center sm:p-8 md:p-10">
            <Tabs role="tablist">
                <TabItem open title="Request Form">
                    <form method="POST">
                        <div class="text-justify">
                
                        <Label>
                            Select which item to request
                            <Select items={[
                                            { value: "AddProfessor", name: "Professors" },
                                            { value: "AddSubject",   name: "Subject" }
                                        ]} bind:value={clearableSelected} clearable />
                        </Label>
                        
                        {#if selectedValue === "AddProfessor"}
                            <AddProf />
                        {:else if selectedValue === "AddSubject"}
                            <AddSub />
                        {:else}
                            <p class="text-gray-500 text-sm mt-3">Please select a request type to continue.</p>
                        {/if}
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
                        {#if selectedValue === "AddSubject"}
                            {subRules}
                        {:else if selectedValue === "AddProfessor"}
                             {profRules}
                        {:else}
                            Please select a request type to view the rules.
                        {/if}
                    </p>
                </TabItem>
            </Tabs>
        </Card>
    </div>
</div>
