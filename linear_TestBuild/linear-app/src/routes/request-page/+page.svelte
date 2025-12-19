<script lang="ts">
    import { Card, Input, Label, MultiSelect, Button } from "flowbite-svelte";
    import { Tabs, TabItem, Dropzone, Img} from "flowbite-svelte";
    import RequestSubject from "$lib/components/forms/RequestSubject.svelte";


    let filesInDropzone: FileList | null = $state(null);
    let imagePreview: string | null = $state(null);


    function handleOnChange(event: Event) {
        console.log("handleOnChange fired.");
        const target = event.target as HTMLInputElement;
        filesInDropzone = target.files;
        if (filesInDropzone && filesInDropzone.length > 0) {
            const file = filesInDropzone[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview = null;
        }
    }
//HANDLING FILE DROP
    function handleOnDrop(event: DragEvent) {
        console.log("handleOnDrop fired.");
        event.preventDefault();
        filesInDropzone = event.dataTransfer?.files ?? null;

        if (filesInDropzone && filesInDropzone.length > 0) {
            const file = filesInDropzone[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview = e.target?.result as string;
            };

            reader.readAsDataURL(file);
        } else {
            imagePreview = null;
        }
    }

    function showFiles(files: FileList | null): string {
        console.log("showFiles fired.");
        if (!files || files.length === 0) return "No files selected.";
            return Array.from(files)
            .map((file) => file.name)
            .join(", ");
    }


    //BACKEND!
    //THIS IS FOR LOADING AVAILABLE SUBS THAT THE USER CAN
    //INITIALLY SET
    let availableSubjects = [
        { value: "GE-ART", name: "GE-ART" },
        { value: "GE-PC", name: "GE-PC" },
        { value: "EDM1", name: "EDM1" },
        { value: "MATH1101", name: "MATH1101" },
        { value: "CIS1101", name: "CIS1101" }
    ];

    let selectedValues: string[] = [];
</script>

<div class="flex justify-center items-start mt-20">
    <div class="w-full max-w-5xl rounded-xl p-6">
        <Card size="xl" class="p-4 text-center sm:p-8 md:p-10">
            <Tabs>
                <TabItem open title="Request a Professor">
                    <form method="POST" action="?/addProf">
                        <div class="text-justify">
                            <h2 class="text-2xl font-bold mb-4">Request a New Professor</h2>
                            <p class="mb-4">If you would like to request the addition of a new professor to our database, please fill out the appropriate form below. We appreciate your input and will review your request as soon as possible.</p>
                            
                            <p class="mb-2">Upload Professor Profile Image.</p>
                            <Label class="mb-2" for="profileImage">(Only if available, placeholder image will be placed if image is unavailable)</Label>

                            <Dropzone 
                            id="image-dropzone" 
                            name="profImg"
                            bind:files={filesInDropzone} 
                            onChange={handleOnChange} 
                            onDrop={handleOnDrop} 
                            multiple accept=".jpg,.png,.gif">

                                <svg aria-hidden="true" class="mb-3 h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>

                                {#if !filesInDropzone || filesInDropzone.length === 0}
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span class="font-semibold">Click to upload</span>
                                    or drag and drop
                                    </p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">JPG or PNG(MAX. 300x300px)</p>
                                {:else}
                                    <p class="text-sm text-green-600">{showFiles(filesInDropzone)}</p>
                                    <button class="mt-2 text-sm text-red-500 hover:underline" 
                                    onclick={() => {filesInDropzone = null;
                                                    imagePreview = null;
                                                    }}>Clear Files</button>
                                {/if}
                            </Dropzone>

                            {#if imagePreview}
                                <div class="mt-4">
                                    <Label class="mb-2" for="profileImage">Profile Image Preview:</Label>
                                    <Img src={imagePreview} alt="Professor Profile Image"/>
                                </div>
                            {/if}

                            <br>
                            <Label class="mb-2" for="professor-name">Professor Name </Label>
                            <Input id="professor-name" name="profName" type="text" placeholder="Enter professor's full name (e.g., John Doe)" required class="mb-4"/>
                            
                            <Button type="submit" class="mt-4">Submit Request</Button>
                        </div>
                    </form>
                </TabItem>
                <TabItem open title="Request a Subject">
                    <div class="text-justify">
                        <RequestSubject />
                    </div>
                </TabItem>
            </Tabs>
        </Card>
    </div>
</div>