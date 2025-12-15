<script lang="">
	import { user } from "$lib/stores/user";
    import { Card, Input, Select, Tabs, TabItem } from "flowbite-svelte";
    import RequestDisplayCard from "$lib/components/requestManagement/requestDisplayCard.svelte";
    import ReviewDisplayCard from "$lib/components/requestManagement/reviewDisplayCard.svelte";
    import DisplayGuidelines from "$lib/components/requestManagement/displayGuidelines.svelte";
</script>

<div class="flex justify-center items-start mt-20">
    <div class="w-full max-w-5xl rounded-xl p-6">
        <Card size="xl" class="pd-4 text-center sm:p-4 md:-8">
            <Card size="xl" class="p-4 text-justify sm:p-8 md:p-10 mb-4">
                <h3 class="text-2xl">Welcome, {$user.name}!</h3>
                <p class="text-gray-600 text-sm">You may cater our user's request and reviews in this page, please refer to the guidelines before approving any user requests.</p>
            </Card>
            <Tabs>
                <TabItem open title="Moderate Reviews">
                    <ReviewDisplayCard />
                </TabItem>
                <TabItem open title="Moderate Requests">
                    <RequestDisplayCard />
                    <RequestDisplayCard />
                </TabItem>
                <TabItem open title="Guidelines">
                    <DisplayGuidelines/>
                </TabItem>
            </Tabs>
        </Card>
    </div>
</div>


<!--IF USER ENTERS A REQUEST/REVIEW DSIPLAY CARD, IT LOADS THE
SPECIFIC ID FOR THE REQUESTED RESOURCE-->