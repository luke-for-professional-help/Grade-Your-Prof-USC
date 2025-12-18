<script lang="ts">
    import { Input, Label, Button, Checkbox, A } from "flowbite-svelte";
    import { isLoggedIn } from '$lib/stores/user.js';
</script>
  <!--NOTE FOR BACKEND: THIS IS FOR LOGGING IN-->
  <!--
  data{
    user_name:
    password:  
  }-->
<form method="POST" action="?/login">
    <div class="mb-6">
      <Label for="text" class="mb-2">Username</Label>
      <Input type="text" id="user_name" name="user_name" placeholder="John Doe" required />
    </div>
    <div class="mb-6">
      <Label for="password" class="mb-2">Password</Label>
      <Input type="password" id="password" name="pass" placeholder="•••••••••" required />
    </div>
    <Button type="submit" name="action" value="login" >Submit</Button>
</form>

<!--GUYS PLEASE MAKE SURE THAT THE USER HAS INPUTTED THEIR DETAILS BEFORE SIGNING IN

ALSO MAKE SURE isLoggedIn = true, isMember = true  -->