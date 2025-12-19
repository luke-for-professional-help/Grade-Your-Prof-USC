<script lang="ts">
    import { Input, Label, Button, Helper } from "flowbite-svelte";
    import { setUser } from '$lib/stores/user.js';
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';

    let loading = $state(false);
    let errorMessage = $state('');
    let password = $state('');
    let confirm_password = $state('');

    // Instant check as the user types
    let passwordMatch = $derived(password === confirm_password || confirm_password === '');

    async function handleResult(result: any){
      loading = false; 
      if (result.type === 'success' && result.data?.success) {
        setUser(result.data.user);
        await goto('/');
      } else {
        errorMessage = result.data?.error || 'Sign-up failed!';
      }
    }
</script>

<form method="post" action="?/signup" use:enhance={() => {
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

    <div class="mb-4">
      <Label for="user_name" class="mb-2 text-center block">User name</Label>
      <Input type="text" id="user_name" name="user_name" required disabled={loading}/>
    </div>

    <div class="mb-4">
      <Label for="email" class="mb-2 text-center block">Email address</Label>
      <Input type="email" id="email" name="email" required disabled={loading}/>
    </div>

    <div class="mb-4">
      <Label for="password" class="mb-2 text-center block">Password</Label>
      <Input type="password" name="password" bind:value={password} required disabled={loading}/>
    </div>

    <div class="mb-6">
      <Label for="confirm_password" class="mb-2 text-center block">Confirm password</Label>
      <Input type="password" name="confirm_password" bind:value={confirm_password} required disabled={loading}/>
      {#if !passwordMatch && confirm_password !== ''}
        <Helper class="mt-2 text-red-600 text-center">Passwords do not match!</Helper>
      {/if}
    </div>

    <div class="flex justify-center">
        <Button type="submit" class="w-32 bg-orange-600" disabled={loading || (password !== confirm_password)}>
          {loading ? 'Saving...' : 'Submit'}
        </Button>
    </div>
</form>