<script lang="ts">
    import { Input, Label, Button, Checkbox, A } from "flowbite-svelte";
    import { isLoggedIn } from '$lib/stores/user.js';
</script>
    <!--NOTE TO BACKEND: THIS IS FOR SIGNING UP-->
    <!--DATA{
      user_id: RANDOMLY GENERATED
      user_password:
      user_IdNumber: **FROM USC**

    }-->
<form method="post" action="?/signup">
    <div class="mb-6">
      <Label for="text" class="mb-2">User name</Label>
      <Input type="text" id="user_name" placeholder="John Doe" name="user_name" required />
    </div>
    <div class="mb-6">
      <Label for="email" class="mb-2">Email address</Label>
      <Input type="email" id="email" placeholder="john.doe@gmail.com" name="email" required />
    </div>
    <div class="mb-6">
      <Label for="password" class="mb-2">Password</Label>
      <Input type="password" id="password" placeholder="•••••••••" name="pass" required />
    </div>
    <div class="mb-6">
      <Label for="confirm_password" class="mb-2">Confirm password</Label>
      <Input type="password" id="confirm_password" placeholder="•••••••••" required />
    </div>
    <Button type="submit" name="action" value="signup">Submit</Button>
</form>
<!--GUYS PLEASE MAKE SURE THAT THE USER HAS INPUTTED THEIR DETAILS BEFORE SIGNING IN

ALSO MAKE SURE isLoggedIn = true, isMember = true  -->