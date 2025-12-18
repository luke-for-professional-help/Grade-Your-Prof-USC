<script lang="ts">
  import { Input, Label, Button } from "flowbite-svelte";
  import { setUser } from "$lib/stores/user";
  import { enhance } from "$app/forms";
  import { goto } from '$app/navigation';

  let loading = $state(false);
  let errorMessage = $state('');


  function handleLogin({ formData }: any){
    loading = true;
    errorMessage = '';
  }

  async function handleSuccess(result: any) {
    loading = false;
    
    if(result.data?.success){

      setUser(result.data.user);

      await goto('/');
    } else {
      errorMessage = result.data.error || 'Login failed';
    }
  }
</script>
  <!--NOTE FOR BACKEND: THIS IS FOR LOGGING IN-->
  <!--
  data{
    user_name:
    password:  
  }-->
<form method="POST" 
      action="?/login"
      use:enhance={({formData}) => {
          handleLogin({ formData});
          return async ({ result }) => {
            handleSuccess(result);
          };
      }}
>

    {#if errorMessage}
      <div class="mb-4 p-3 text-red-600 bg-red-100 rounded-lg">
        {errorMessage}
      </div>
    {/if}
    <div class="mb-6">
      <Label for="text" class="mb-2">Username</Label>
      <Input type="text" 
              id="user_name" 
              name="user_name" 
              placeholder="John Doe" 
              required 
              disabled={loading}/>
    </div>

    <div class="mb-6">
      <Label for="password" class="mb-2">Password</Label>
      <Input type="password" 
              id="password" 
              name="pass" 
              placeholder="•••••••••" 
              required 
              disabled={loading}/>
    </div>

    <Button type="submit" disabled={loading}>
      {loading ? 'Logging In...' : 'Submit'}
    </Button>
</form>

<!--GUYS PLEASE MAKE SURE THAT THE USER HAS INPUTTED THEIR DETAILS BEFORE SIGNING IN

ALSO MAKE SURE isLoggedIn = true, isMember = true  -->