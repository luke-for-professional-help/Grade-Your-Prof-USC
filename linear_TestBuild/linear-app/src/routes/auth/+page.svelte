<script lang="ts">
    import { Card, Button } from "flowbite-svelte";
    import LoginForm from "$lib/components/auth/LoginForm.svelte";
    import SignUpForm from "$lib/components/auth/SignUpForm.svelte";
    //let {data} = $props();
    //console.log(data.accounts[0]?.Email);
    let mode = $state('signup');
    console.log(mode);
</script>
<!--USER AUTHENTICATION SCREEN-->
<div class="flex justify-center items-start mt-20">
	<div class="w-full max-w-2xl rounded-xl p-6">
		<Card size="lg" class="p-4 text-center sm:p-8 md:p-10">
            {#if mode === 'signup'}
            <h3 class="text-3xl font-extrabold leading-tight text-gray-900">Sign Up</h3><br>
            <SignUpForm />
            <p>
                Already have an account?
                <a href="#" on:click|preventDefault={() => (mode = 'login')}>Log In</a>
            </p>
            {:else}
            <h3 class="text-3xl font-extrabold leading-tight text-gray-900">Log In</h3><br>
            <LoginForm />
            <p>
                Dont have an account?
                <a href="#" on:click|preventDefault={() => (mode = 'signup')}>Sign Up</a>
            </p>
            {/if}
        </Card>
	</div>
</div>

    






