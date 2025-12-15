<script lang="ts">
	import { user  } from "$lib/stores/user";
    import { Card, Input, Search } from "flowbite-svelte";
    import { Tabs, TabItem, Button} from "flowbite-svelte";
    import AdminUserManagement from "$lib/components/user-management/adminUserManagement.svelte";
    let names=[
        "Ian Florentino"
    ]; //PLACEHOLDERS FOR NOW

</script>

<div class="flex justify-center items-start mt-20">
    <div class="w-full max-w-5xl rounded-xl p-6">
        <Card size="xl" class="p-4 text-center sm:p-8 md:p-10">
            <Card size="xl" class="p-4 text-justify sm:p-8 md:p-10 mb-4">
                <h1 class="text-2xl">Welcome, {$user.name}!</h1>
            </Card>
            <Tabs>
                <TabItem open title="My Admin Panel">

                </TabItem>
                <TabItem open title="User Management">
                    <AdminUserManagement />
                    <AdminUserManagement />
                </TabItem>
            </Tabs>
        </Card>
    </div>
</div>