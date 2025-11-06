<script lang="ts">
    import { Input, Label, Button, Checkbox, A } from "flowbite-svelte";
    import { isLoggedIn, isMember } from '$lib/stores/user.js';
</script>
  <!--NOTE FOR BACKEND: THIS IS FOR LOGGING IN-->
<form>
    <div class="mb-6">
      <Label for="email" class="mb-2">Email address</Label>
      <Input type="email" id="email" placeholder="john.doe@gmail.com" required />
    </div>
    <div class="mb-6">
      <Label for="password" class="mb-2">Password</Label>
      <Input type="password" id="password" placeholder="•••••••••" required />
    </div>
    <Button type="submit" href="/">Submit</Button>
</form>