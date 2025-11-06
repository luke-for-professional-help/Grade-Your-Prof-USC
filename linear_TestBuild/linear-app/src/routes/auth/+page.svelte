<script lang="ts">
    import { Card, Button } from "flowbite-svelte";
    import LoginForm from "$lib/components/auth/LoginForm.svelte";
    import SignUpForm from "$lib/components/auth/SignUpForm.svelte";

    let mode = 'signup';
</script>

<div class="flex justify-center items-start mt-20">
	<div class="w-full max-w-2xl rounded-xl p-6">
		<Card size="lg" class="p-4 text-center sm:p-8 md:p-10">
            {#if mode === 'signup'}
            <SignUpForm />
            <p>
                Already have an account?
                <a href="#" on:click|preventDefault={() => (mode = 'login')}>Log In</a>
            </p>
            {:else}
            <LoginForm />
            <p>
                Dont have an account?
                <a href="#" on:click|preventDefault={() => (mode = 'signup')}>Sign Up</a>
            </p>
            {/if}
        </Card>
	</div>
</div>

    






