<script lang="ts">
    import { Card } from "flowbite-svelte";
    import RequestForm from "$lib/components/forms/RequestForm.svelte";
</script>


<div class="flex justify-center items-start mt-15">
    <div class="w-full max-w-3xl rounded-xl p-6">
        <Card size="lg" class="p-4 text-center sm:p-8 md:p-10">
            <RequestForm />
        </Card>
    </div>
</div>
