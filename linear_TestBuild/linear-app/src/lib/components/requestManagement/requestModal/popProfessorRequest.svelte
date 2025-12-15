<script lang="ts">
    import { Label, Card, Input, Button } from "flowbite-svelte";

//VALUES
    let requestId = 10009;
    let professorName = "JOHN DOE";
    let profilePicture = "FAAAAAAAAAAAAAAAAAA";
</script>

<div class="items-left">
    <Label class="text-md">
        <h2>Professor Request</h2>
    </Label>
    <Card class="max-w-full mt-2">
        <div class="m-3">
            <Label>
                <h3>
                    Request ID:
                </h3>
                <br>
                <h3 class="mb-2">Profile Picture:</h3>
                <!--PROFILE PICTURE HERE-->
                <br>
                <h3 class="mb-2">
                    Professor Name: 
                </h3>
                <Input disabled readonly value="PROFESSOR'S NAME PLACEHOLDER"/>
                <br>
                <h3 class="mb-2">
                    Subjects Taught:
                </h3>
                <Input disabled readonly value="SUBJECTS TAUGHT PLACEHOLDER"/>
            </Label>
        </div>
    </Card>
    <div class="ml-auto mt-4 mb-2 mr-4">
        <Button>
            Post this request
        </Button>
    </div>
</div>

