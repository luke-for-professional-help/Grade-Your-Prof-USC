<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Badge, Card, Tabs, TabItem } from "flowbite-svelte";
    import DeleteReviewBtn from "$lib/components/btns/deleteReviewBtn.svelte";

    let { data } = $props();

    const statusMap = {
        1: { text: 'Pending', color: 'yellow' },
        2: { text: 'Approved', color: 'green' },
        3: { text: 'Rejected', color: 'red' },
        0: { text: 'Unknown', color: 'gray' }
    } as const;

    function getStatus(id: any) {
        const numericId = Number(id);
        return statusMap[numericId as keyof typeof statusMap] || statusMap[0];
    }
</script>

<div class="flex justify-center items-start mt-20 pb-20 px-4">
    <div class="w-full max-w-5xl rounded-xl p-6">
        <h1 class="text-3xl font-bold tracking-tight text-gray-800 mb-6">Manage Your Submissions</h1>
        
        <Tabs style="underline">
            <TabItem open title="My Reviews">
                <Card size="xl" class="mt-4 p-0 shadow-sm overflow-hidden">
                    <Table striped={true}>
                        <TableHead class="bg-gray-50">
                            <TableHeadCell>Professor</TableHeadCell>
                            <TableHeadCell>Subject</TableHeadCell>
                            <TableHeadCell>Date</TableHeadCell>
                            <TableHeadCell>Status</TableHeadCell>
                            <TableHeadCell><span class="sr-only">Delete</span></TableHeadCell>
                        </TableHead>
                        <TableBody>
                            {#each data.reviews as review}
                                <TableBodyRow>
                                    <TableBodyCell class="font-bold text-gray-900">{review.Professor_Name}</TableBodyCell>
                                    <TableBodyCell>{review.Subject_Code}</TableBodyCell>
                                    <TableBodyCell>{new Date(review.Date).toLocaleDateString()}</TableBodyCell>
                                    <TableBodyCell>
                                        <Badge color={getStatus(review.Status_ID).color}>
                                            {getStatus(review.Status_ID).text}
                                        </Badge>
                                    </TableBodyCell>
                                    <TableBodyCell class="text-right">
                                        <DeleteReviewBtn 
                                            id={review.Review_ID} 
                                            inputName="reviewId" 
                                            action="?/deleteReview" 
                                        />
                                    </TableBodyCell>
                                </TableBodyRow>
                            {:else}
                                <TableBodyRow>
                                    <TableBodyCell colspan={5} class="text-center py-10 text-gray-400">No reviews found.</TableBodyCell>
                                </TableBodyRow>
                            {/each}
                        </TableBody>
                    </Table>
                </Card>
            </TabItem>

            <TabItem title="My Requests">
                <Card size="xl" class="mt-4 p-0 shadow-sm overflow-hidden">
                    <Table striped={true}>
                        <TableHead class="bg-gray-50">
                            <TableHeadCell>Type</TableHeadCell>
                            <TableHeadCell>Details</TableHeadCell>
                            <TableHeadCell>Status</TableHeadCell>
                            <TableHeadCell><span class="sr-only">Delete</span></TableHeadCell>
                        </TableHead>
                        <TableBody>
                            {#each data.requests as req}
                                <TableBodyRow>
                                    <TableBodyCell class="font-bold">
                                        {#if req.profName && req.subName} Reassignment 
                                        {:else if req.profName} Professor 
                                        {:else} Subject {/if}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {req.profName || ''} {req.subCode ? `(${req.subCode})` : (req.subName || '')}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        <Badge color={getStatus(req.Status_ID).color}>
                                            {getStatus(req.Status_ID).text}
                                        </Badge>
                                    </TableBodyCell>
                                    <TableBodyCell class="text-right">
                                        <DeleteReviewBtn 
                                            id={req.Request_ID} 
                                            inputName="requestId" 
                                            action="?/deleteRequest" 
                                        />
                                    </TableBodyCell>
                                </TableBodyRow>
                            {:else}
                                <TableBodyRow>
                                    <TableBodyCell colspan={4} class="text-center py-10 text-gray-400">No requests found.</TableBodyCell>
                                </TableBodyRow>
                            {/each}
                        </TableBody>
                    </Table>
                </Card>
            </TabItem>
        </Tabs>
    </div>
</div>