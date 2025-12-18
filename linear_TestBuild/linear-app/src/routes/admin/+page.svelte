<script lang="ts">
    import { user } from "$lib/stores/user";
    import { Card, Tabs, TabItem, Button } from "flowbite-svelte";
    import { goto } from '$app/navigation';
    import AdminUserManagement from "$lib/components/user-management/adminUserManagement.svelte";

    let { data } = $props();

    function goToPage(p: number) {
        const url = new URL(window.location.href);
        url.searchParams.set('page', p.toString());
        goto(url.toString(), { noScroll: true });
    }
</script>

<div class="flex justify-center items-start mt-20 pb-20">
    <div class="w-full max-w-5xl rounded-xl p-6">
        <Card size="xl" class="p-4 text-center sm:p-8 md:p-10">
            <Card size="xl" class="p-4 text-justify sm:p-8 md:p-10 mb-4">
                <h1 class="text-2xl font-bold text-gray-800">Welcome, {$user.userName}!</h1>
            </Card>
            
            <Tabs style="underline">
                <TabItem title="My Admin Panel">
                    <div class="p-10 text-center text-gray-500">
                        <p>Administrator Dashboard - Stats & Reports Coming Soon.</p>
                    </div>
                </TabItem>
                
                <TabItem open title="User Management">
                    <div class="space-y-2 pt-4">
                        {#each data.users as userData (userData.User_ID)}
                            <AdminUserManagement {userData} />
                        {:else}
                            <p class="py-10">No users found in database.</p>
                        {/each}
                    </div>

                    {#if data.pagination.totalPages > 1}
                        <div class="flex justify-center items-center gap-4 mt-8">
                            <Button color="alternative" size="sm" onclick={() => goToPage(data.pagination.currentPage - 1)} disabled={data.pagination.currentPage <= 1}>
                                Previous
                            </Button>
                            <span class="text-sm font-medium">Page {data.pagination.currentPage} of {data.pagination.totalPages}</span>
                            <Button color="alternative" size="sm" onclick={() => goToPage(data.pagination.currentPage + 1)} disabled={data.pagination.currentPage >= data.pagination.totalPages}>
                                Next
                            </Button>
                        </div>
                    {/if}
                </TabItem>
            </Tabs>
        </Card>
    </div>
</div>