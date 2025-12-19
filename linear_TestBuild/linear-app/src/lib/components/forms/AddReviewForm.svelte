<script lang="ts">
    import { Tabs, TabItem, Button, Textarea, Label, Fileupload, Rating, Select } from "flowbite-svelte";
    import { enhance } from '$app/forms';
    
    let { data } = $props();
    let rating = $state(5);

    // Map subjects into name/value pairs for the Select component
    let subjectOptions = $derived((data.profSubjects || []).map(s => ({
        value: s.Subject_ID,
        name: `${s.Subject_Code} - ${s.Subject_Name}`
    })));

    let professor = $derived(data.allProfs?.find(p => p.Prof_ID == data.profID));
</script>

<Tabs role="tablist">
    <TabItem open title="Make Review Form">
        <form method="POST" enctype="multipart/form-data" action="?/addReview&prof_ID={data.profID}" use:enhance>
            <div class="text-left space-y-4">
                <div>
                    <Label class="mb-2">Reviewing: <span class="font-bold">{professor?.Professor_Name}</span></Label>
                    <Select items={subjectOptions} name="subjectID" placeholder="Select the subject..." required />
                </div>

                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <Label class="mb-2">Rating: <span class="text-orange-600 font-bold">{rating} Stars</span></Label>
                    <div class="flex items-center gap-4">
                        <input type="range" name="rating" min="1" max="5" step="0.1" bind:value={rating} class="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-orange-500" />
                        <Rating total={5} rating={Number(rating)} />
                    </div>
                </div>

                <div>
                    <Label class="mb-2">Description</Label>
                    <Textarea name="message" placeholder="Write your review here..." rows={4} required />
                </div>

                <div>
                    <Label class="mb-2">Study Load (Verification)</Label>
                    <Fileupload name="studyLoad" required />
                </div>

                <Button type="submit" class="w-full bg-orange-600 hover:bg-orange-700">Submit Review</Button>
            </div>
        </form>
    </TabItem>
</Tabs>