<script lang="ts">
    import { Label, Card, Input, Button } from "flowbite-svelte";

//VALUES
    let requestID = 10009;
    let subjectCode = "CIS1101"
    let subejctName = "Programming I"
</script>

<div class="items-left">
    <Label class="text-md">
        <h2>Professor Request</h2>
    </Label>
    <Card class="max-w-full mt-2">
        <div class="m-3">
            <Label>
                <h3>
                    Request ID: {requestID}
                </h3>
                <br>
                <h3 class="mb-2">
                   Subject Code: 
                </h3>
                <Input />
                <br>
                <h3 class="mb-2">
                    Subject Name: 
                </h3>
                <Input />
            </Label>
        </div>
    </Card>
    <div class="ml-auto mt-4 mb-2 mr-4">
        <Button>
            Post this request
        </Button>
    </div>
</div>

