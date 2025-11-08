<script lang="ts">

    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import DeleteReviewBtn from "$lib/components/btns/deleteReviewBtn.svelte";
    import { Card } from "flowbite-svelte";

</script>

<!--PROFILE PAGE-->
<div class="flex justify-center items-start mt-20">
	<div class="w-full max-w-5xl rounded-xl p-6">
		<h1 class="text-base md:text-3xl font-bold tracking-tight text-gray-600 pb-3">Your reviews:</h1>
        <Card size="xl" class="p-4 text-center sm:p-8 md:p-10">
            <Table striped={true}>
                <TableHead>
                    <TableHeadCell>Professor Name</TableHeadCell>
                    <TableHeadCell>Subject Code</TableHeadCell>
                    <TableHeadCell>Date</TableHeadCell>
                    <TableHeadCell>Status</TableHeadCell>
                    <TableHeadCell>
                        <span class="sr-only">Edit</span>
                    </TableHeadCell>
                </TableHead>
                <TableBody>
                    <TableBodyRow>
                        <TableBodyCell>Mr. P. Diddy</TableBodyCell>
                        <TableBodyCell>GE-FEL-DP101</TableBodyCell>
                        <TableBodyCell>09/23/2025</TableBodyCell>
                        <TableBodyCell>Pending</TableBodyCell>
                        <TableBodyCell>
                        <DeleteReviewBtn />
                    </TableBodyCell>
                </TableBodyRow>
                <TableBodyRow>
                    <TableBodyCell>Mrs. Sam Altman</TableBodyCell>
                    <TableBodyCell>CIS2101</TableBodyCell>
                    <TableBodyCell>10/13/2025</TableBodyCell>
                    <TableBodyCell>Posted</TableBodyCell>
                    <TableBodyCell>
                      <DeleteReviewBtn />
                    </TableBodyCell>
                </TableBodyRow>
                </TableBody>
            </Table>
        </Card>
	</div>
</div>
