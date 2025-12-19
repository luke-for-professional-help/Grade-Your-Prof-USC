<script lang="ts">
    import { Card } from "flowbite-svelte";
    import LoginForm from "$lib/components/auth/LoginForm.svelte";
    import SignUpForm from "$lib/components/auth/SignUpForm.svelte";

    let { form } = $props();
    let mode = $state('signup');
</script>

<div class="flex justify-center items-start mt-20">
    <div class="w-full max-w-2xl p-6">
        <Card size="lg" class="p-4 text-center sm:p-8 md:p-10">
            {#if mode === 'signup'}
                <h3 class="text-3xl font-extrabold text-gray-900">Sign Up</h3>
                {#if form?.signupError}
                    <div class="p-4 mb-4 text-red-800 bg-red-100 rounded-lg">{form.signupError}</div>
                {/if}
                <SignUpForm />
                <p class="mt-4">Already have an account? 
                    <button class="text-blue-600 underline" onclick={() => mode = 'login'}>Log In</button>
                </p>
            {:else}
                <h3 class="text-3xl font-extrabold text-gray-900">Log In</h3>
                {#if form?.loginError}
                    <div class="p-4 mb-4 text-red-800 bg-red-100 rounded-lg">{form.loginError}</div>
                {/if}
                <LoginForm />
                <p class="mt-4">Don't have an account? 
                    <button class="text-blue-600 underline" onclick={() => mode = 'signup'}>Sign Up</button>
                </p>
            {/if}
        </Card>
    </div>
</div>