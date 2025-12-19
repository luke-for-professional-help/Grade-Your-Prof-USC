<script lang="ts">
    import { user } from "$lib/stores/user";
    import { Card, Tabs, TabItem, Button, Badge, Label, Input } from "flowbite-svelte";
    import { MessageCaptionOutline, UserCircleOutline, InboxOutline } from "flowbite-svelte-icons";
    import { goto } from '$app/navigation';
    import { enhance } from '$app/forms';
    import AdminUserManagement from "$lib/components/user-management/adminUserManagement.svelte";

    let { data } = $props();

    function goToPage(param: string, p: number) {
        const url = new URL(window.location.href);
        url.searchParams.set(param, p.toString());
        goto(url.toString(), { noScroll: true });
    }
</script>

<div class="flex justify-center items-start mt-10 pb-20 px-4">
    <div class="w-full max-w-6xl">
        <Card size="xl" class="p-6">
            <Card size="xl" class="p-4 text-justify sm:p-8 md:p-10 mb-4">
                <h1 class="text-2xl font-bold text-gray-800">Welcome, {$user.Username}!</h1>
            </Card>            
            <Tabs style="underline">
                <TabItem open title="My Admin Panel">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                        <Card class="bg-blue-50 p-4 border-none shadow-none text-center">
                            <h5 class="text-xs font-bold text-blue-600 uppercase">Total Users</h5>
                            <p class="text-4xl font-black">{data.globalStats.totalUsers}</p>
                        </Card>
                        <Card class="bg-green-50 p-4 border-none shadow-none text-center">
                            <h5 class="text-xs font-bold text-green-600 uppercase">Total Reviews</h5>
                            <p class="text-4xl font-black">{data.globalStats.totalReviews}</p>
                        </Card>
                        <Card class="bg-yellow-50 p-4 border-none shadow-none text-center">
                            <h5 class="text-xs font-bold text-yellow-600 uppercase">Pending Req.</h5>
                            <p class="text-4xl font-black">{data.globalStats.pendingReqs}</p>
                        </Card>
                        <Card class="bg-red-50 p-4 border-none shadow-none text-center">
                            <h5 class="text-xs font-bold text-red-600 uppercase">Banned</h5>
                            <p class="text-4xl font-black">{data.globalStats.totalBanned}</p>
                        </Card>
                    </div>
                </TabItem>

                <TabItem title="User Management">
                    <div class="space-y-4 mt-6">
                        {#each data.users as userData}
                            <Card size="xl" class="p-4">
                                <div class="flex justify-between gap-4">
                                    <AdminUserManagement {userData} />
                                    <div class="flex flex-col items-end justify-center gap-2">
                                        <Badge color="indigo">
                                            <MessageCaptionOutline class="w-3 h-3 me-1" />
                                            {userData.reviewCount} Reviews
                                        </Badge>
                                        <Badge color="purple">
                                            {userData.requestCount} Requests
                                        </Badge>
                                    </div>
                                </div>
                                <div class="mt-4 pt-4 border-t flex items-center justify-between">
                                    <form method="POST" action="?/banUser" use:enhance 
                                          onsubmit={(e) => { if(!confirm('Apply ban?')) e.preventDefault(); }}>
                                        <input type="hidden" name="userId" value={userData.User_ID} />
                                        <div class="flex justify-between items-end w-full">
                                            <div class="flex flex-col">
                                                <Label class="text-xs mb-1">Ban (Hours):</Label>
                                                <Input size="sm" type="number" name="banHours" value="24" class="w-24" />
                                            </div>
                                            <Button type="submit" color="yellow" size="sm" class="ml-4">
                                                Ban User
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </Card>
                        {/each}
                    </div>
                    {#if data.pagination.totalUserPages > 1}
                        <div class="flex justify-center items-center gap-4 mt-8">
                            <Button color="alternative" size="sm" onclick={() => goToPage('page', data.pagination.userPage - 1)} disabled={data.pagination.userPage <= 1}>Previous</Button>
                            <span class="text-xs">Page {data.pagination.userPage} of {data.pagination.totalUserPages}</span>
                            <Button color="alternative" size="sm" onclick={() => goToPage('page', data.pagination.userPage + 1)} disabled={data.pagination.userPage >= data.pagination.totalUserPages}>Next</Button>
                        </div>
                    {/if}
                </TabItem>

                <TabItem title="Requests">
                    <div class="space-y-4 mt-6">
                        {#each data.userRequests as req (req.User_ID)}
                            <Card size="xl" class="flex flex-row justify-between items-center p-4">
                                <div class="text-left">
                                    <h5 class="font-bold">{req.Username}</h5>
                                    <p class="text-sm text-gray-500">{req.Email}</p>
                                </div>
                                <form method="POST" action="?/moderateUser" use:enhance class="flex gap-2">
                                    <input type="hidden" name="userId" value={req.User_ID} />
                                    <Button type="submit" name="action" value="approve" color="green" size="xs">Approve</Button>
                                    <Button type="submit" name="action" value="reject" color="red" size="xs">Reject</Button>
                                </form>
                            </Card>
                        {:else}
                            <p class="py-10 text-gray-500 text-center">No pending access requests.</p>
                        {/each}
                    </div>
                    {#if data.pagination.totalReqPages > 1}
                        <div class="flex justify-center items-center gap-4 mt-8">
                            <Button color="alternative" size="sm" onclick={() => goToPage('reqPage', data.pagination.reqPage - 1)} disabled={data.pagination.reqPage <= 1}>Previous</Button>
                            <span class="text-xs">Page {data.pagination.reqPage} of {data.pagination.totalReqPages}</span>
                            <Button color="alternative" size="sm" onclick={() => goToPage('reqPage', data.pagination.reqPage + 1)} disabled={data.pagination.reqPage >= data.pagination.totalReqPages}>Next</Button>
                        </div>
                    {/if}
                </TabItem>

                <TabItem title="Blacklist">
                    <div class="space-y-4 mt-6">
                        {#each data.blacklist as blackUser}
                            <Card size="xl" class="flex flex-row justify-between items-center p-4 border-l-4 border-red-500">
                                <div class="text-left">
                                    <h5 class="font-bold">{blackUser.Username}</h5>
                                    <p class="text-xs text-gray-500">{blackUser.Email}</p>
                                    {#if blackUser.Ban_Time}
                                        <Badge color="red" class="mt-1">Ban Ends: {new Date(blackUser.Ban_Time).toLocaleString()}</Badge>
                                    {/if}
                                </div>
                                <div class="flex gap-2">
                                    <form method="POST" action="?/moderateUser" use:enhance>
                                        <input type="hidden" name="userId" value={blackUser.User_ID} />
                                        <Button type="submit" name="action" value="approve" color="light" size="xs">Restore</Button>
                                    </form>
                                    <form method="POST" action="?/deleteUser" use:enhance onsubmit={(e) => { if(!confirm('Delete permanently?')) e.preventDefault(); }}>
                                        <input type="hidden" name="userId" value={blackUser.User_ID} />
                                        <Button type="submit" color="red" size="xs">Delete</Button>
                                    </form>
                                </div>
                            </Card>
                        {:else}
                            <p class="py-10 text-gray-500 text-center">Blacklist is empty.</p>
                        {/each}
                    </div>
                </TabItem>
            </Tabs>
        </Card>
    </div>
</div>