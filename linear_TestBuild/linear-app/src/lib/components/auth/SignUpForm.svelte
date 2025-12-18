<script lang="ts">
    import { Input, Label, Button, Helper } from "flowbite-svelte";
    import { setUser } from '$lib/stores/user.js';
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
	  import { error } from "@sveltejs/kit";
    
    let loading = $state(false);
    let errorMessage = $state('');
    let passwordMatch = $state(true);

    function validatePasswords(confirm_password: string, password: string){
      passwordMatch = password === confirm_password;
    }

    function handleSignup(){
      loading = true;
      errorMessage = '';
    }

    async function handleSuccess(result: any){
      loading = false; 

      if(result.data?.success){
        setUser(result.data.user);

        await goto('/');
      } else{
        errorMessage = result.data?.error || 'Sign-up failed!';
      }
    }
    
</script>
    <!--NOTE TO BACKEND: THIS IS FOR SIGNING UP-->
    <!--DATA{
      user_id: RANDOMLY GENERATED
      user_password:
      user_IdNumber: **FROM USC**

    }-->
<form method="post" 
      action="?/signup"
      
      use:enhance={() => {
          handleSignup();
          return async ({ result }) => {
            handleSuccess(result);
          };
      }}>

    {#if errorMessage}
      <div class="mb-4 p-3 text-red-600 bg-red-100 rounded-lg">
        {errorMessage}
      </div>
    {/if}

    <div class="mb-6">
      <Label for="text" class="mb-2">User name</Label>
      <Input type="text" 
              id="user_name" 
              placeholder="John Doe" 
              name="user_name" 
              required 
              disabled={loading}/>
    </div>
    <div class="mb-6">
      <Label for="email" class="mb-2">Email address</Label>
      <Input type="email" 
              id="email" 
              placeholder="john.doe@gmail.com" 
              name="email" 
              required 
              disabled={loading}/>
    </div>

    <div class="mb-6">
      <Label for="password" class="mb-2">Password</Label>
      <Input type="password" 
              id="password" 
              placeholder="•••••••••" 
              name="password" 
              required 
              disabled={loading}/>
    </div>

    <div class="mb-6">
      <Label for="confirm_password" class="mb-2">Confirm password</Label>
      <Input type="password" 
            id="confirm_password" 
            name="confirmPassword"
            placeholder="•••••••••" 
            name="confirm_password"
            required 
            disabled={loading}
      />  
            
      {#if !passwordMatch}
        <Helper class="mt-2 text-red-600">Passwords do not match!</Helper>
      {/if}
    </div>
    <Button type="submit" disabled={loading || !passwordMatch}>
      {loading ? 'Creating account...' : 'Submit'}
    </Button>
</form>
<!--GUYS PLEASE MAKE SURE THAT THE USER HAS INPUTTED THEIR DETAILS BEFORE SIGNING IN

ALSO MAKE SURE isLoggedIn = true, isMember = true  -->