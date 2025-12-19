<script lang="ts">
  import { Input, Label, Button } from "flowbite-svelte";
  import { setUser } from "$lib/stores/user";
  import { enhance } from "$app/forms";
  import { goto } from '$app/navigation';

  let loading = $state(false);
  let errorMessage = $state('');

  async function handleResult(result: any) {
    loading = false;
    
    // SvelteKit returns 'success' type if the server didn't throw an error or fail()
    if (result.type === 'success' && result.data?.success) {
      setUser(result.data.user); // Fixed store assignment
      await goto('/');           // Manual redirect after store is ready
    } else if (result.type === 'failure') {
      // This catches the fail(400, { error: '...' }) from your server
      errorMessage = result.data?.error || 'Login failed';
    } else {
      errorMessage = 'Incorrect username or password.';
    }
  }
</script>

<form method="POST" action="?/login" use:enhance={() => {
    loading = true;
    errorMessage = '';
    return async ({ result }) => {
        await handleResult(result);
    };
}}>
    {#if errorMessage}
      <div class="mb-4 p-3 text-red-600 bg-red-100 rounded-lg text-center font-medium">
        {errorMessage}
      </div>
    {/if}

    <div class="mb-6 text-left">
      <Label for="user_name" class="mb-2 text-center block text-lg">Username</Label>
      <Input type="text" id="user_name" name="user_name" required disabled={loading}/>
    </div>

    <div class="mb-6 text-left">
      <Label for="password" class="mb-2 text-center block text-lg">Password</Label>
      <Input type="password" id="password" name="password" required disabled={loading}/>
    </div>

    <div class="flex justify-center">
        <Button type="submit" class="w-32 bg-orange-600" disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </Button>
    </div>
</form>