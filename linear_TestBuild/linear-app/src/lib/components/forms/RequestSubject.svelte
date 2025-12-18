<script lang="ts">
    import { Input, Card, Label, Button } from "flowbite-svelte";
    
    
</script>

<h2 class="text-2xl font-bold">Request a New Subject</h2>
<br>
<p>If you would like to add a subejct that doesn't exist in our database, please fill out the form below. We appreciate your input and we will review your request as soon as possible.</p>

<br>
<Label class="mb-2" for="subjectCode">Subject Code</Label>
<Input id="subjectCode" type="text" placeholder="Enter subject code (e.g. GE-ART, CIS1101, GE-LWR)" required class="mb-4"/>
<br>
<Label class="mb-2" for="subjectName">Subject Name</Label>
<Input id="subjectName" type="text" placeholder="Enter subject name (e.g. Art Appreciation, Programming I, Life and Works of Rizal)" required class="mb-4"/>
<br>
<p class="text-sm text-gray-400">Please make sure you've read the guidelines before submitting!</p>
<Button type="submit" class="mt-4">Submit Request</Button>

