<script lang="ts">
    import { Input, Card, Label, Button } from "flowbite-svelte";
    
    
</script>

<form method="POST" action="?/addSubject" class="space-y-4">
    <h2 class="text-2xl font-bold">Request a New Subject</h2>
    <p>Submit a subject that is currently missing from our database.</p>
    
    <div>
        <Label for="subCode" class="mb-2">Subject Code</Label>
        <Input id="subCode" name="subCode" placeholder="e.g., CIS 2101" required />
    </div>

    <div>
        <Label for="subName" class="mb-2">Subject Name</Label>
        <Input id="subName" name="subName" placeholder="e.g., Web Development" required />
    </div>

    <Button type="submit" color="orange">Submit Subject Request</Button>
</form>