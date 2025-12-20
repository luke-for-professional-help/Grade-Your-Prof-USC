<script lang="ts">
    import { Tabs, TabItem, Card, Li, List, Heading } from "flowbite-svelte";
</script>

<div class="flex justify-center items start mt-10 pb-10">
    <div class="w-full max-w-5xl p-6">
        <Tabs style="underline">
            <TabItem open title="Request guidelines">
                
            <Heading tag="h2" class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Request guidelines</Heading>
            <List tag="ul" class="space-y-1 text-gray-500 dark:text-gray-400">
                <Li>Only request relevant professors and subjects that exist and are taught at USC</Li>
                <Li>Requests will be rejected if they are inappropriate, offensive, or contain harmful language</Li>
                <Li>Do not submit duplicate requests for the same professor or subject</Li>
                <Li>Provide accurate information about the professor or subject you are requesting</Li>
                <Li>Do not submit requests with intent to harass or target individuals</Li>
                <Li>All requests are subject to moderation and approval by administrators</Li>
                <Li>Abusive or spammy requests may result in account restrictions</Li>
            </List>
            </TabItem>   
            <TabItem open title="Review guidelines">
            <Heading tag="h2" class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Review guidelines</Heading>
            <List tag="ul" class="space-y-1 text-gray-500 dark:text-gray-400">
                <Li>Please make constructive criticisms focused on the teaching and course delivery</Li>
                <Li>It is highly recommended to list down specific pros and cons of the professor</Li>
                <Li>Any kind of personal attack or harassment will be subject to immediate rejection</Li>
                <Li>Be specific - provide examples or anecdotes that illustrate your points</Li>
                <Li>Review the professor's teaching methods, clarity, and effectiveness, not their appearance or personal characteristics</Li>
                <Li>Be honest but fair - avoid exaggeration and maintain objectivity</Li>
                <Li>Focus on actionable feedback that could help improve the course experience</Li>
                <Li>Do not include profanity, slurs, or derogatory language</Li>
                <Li>Do not submit reviews with intent to defame or intentionally harm the professor's reputation</Li>
                <Li>Reviews must be at least 10 characters and up to 500 characters in length</Li>
                <Li>Use appropriate tone and language - keep reviews professional and respectful</Li>
                <Li>Do not include personal information or identifying details about other students</Li>
            </List>
            </TabItem>   
        </Tabs>
    </div>
</div>
