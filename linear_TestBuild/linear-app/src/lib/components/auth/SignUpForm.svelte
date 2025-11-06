<script lang="ts">
    import { Input, Label, Button, Checkbox, A } from "flowbite-svelte";
    import { isLoggedIn, isMember } from '$lib/stores/user.js';
</script>
    <!--NOTE TO BACKEND: THIS IS FOR SIGNING UP-->
<form>
    <div class="mb-6 grid gap-6 md:grid-cols-2">
      <div>
        <Label for="first_name" class="mb-2">First name</Label>
        <Input type="text" id="first_name" placeholder="John" required />
      </div>
      <div>
        <Label for="last_name" class="mb-2">Last name</Label>
        <Input type="text" id="last_name" placeholder="Doe" required />
      </div>
    </div>
    <div class="mb-6">
      <Label for="email" class="mb-2">Email address</Label>
      <Input type="email" id="email" placeholder="john.doe@gmail.com" required />
    </div>
    <div class="mb-6">
      <Label for="password" class="mb-2">Password</Label>
      <Input type="password" id="password" placeholder="•••••••••" required />
    </div>
    <div class="mb-6">
      <Label for="confirm_password" class="mb-2">Confirm password</Label>
      <Input type="password" id="confirm_password" placeholder="•••••••••" required />
    </div>
    <Button type="submit" href="/">Submit</Button>
</form>
<!--GUYS PLEASE MAKE SURE THAT THE USER HAS INPUTTED THEIR DETAILS BEFORE SIGNING IN

ALSO MAKE SURE isLoggedIn = true, isMember = true  -->