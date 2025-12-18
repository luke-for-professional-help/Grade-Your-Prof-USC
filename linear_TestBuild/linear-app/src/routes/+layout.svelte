<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import usc from '$lib/assets/images/usc.svg';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownGroup } from "flowbite-svelte";
	import Footer from "$lib/components/footer.svelte";
	import UserMenu from '$lib/components/UserMenu.svelte';
	import UserLogin from '$lib/components/UserLogin.svelte';
	import { isLoggedIn } from '$lib/stores/user.js';
	
	let { children } = $props();
</script>

<style>
	:global(.logo-text .prof-glow) {
		transition: color 0.3s ease-in-out;
	}

	:global(.logo-text:hover .prof-glow) {
		color: #f97316;
	}

	:global(.logo-img) {
		border-radius: 100px;
		transition: box-shadow 0.3s ease-in-out, filter 0.3s ease-in-out;
	}

	:global(.logo-img:hover) {
		box-shadow: 0 0 15px #f97316, 0 0 25px rgba(249, 115, 22, 0.5);
	}
</style>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
	
  
  <!--NAVBAR PERSISTENT UI FOR THE ENTIRE WEBSITE-->
<div class="flex flex-col min-h-screen">
    
    <Navbar>
        <NavBrand href="/">
            <img src={usc} class="me-3 h-6 shadow-none sm:h-9 logo-img" alt="gyp" />
            <span class="self-center text-xl font-semibold whitespace-nowrap text-black logo-text">
                Grade Your <span class="prof-glow">Prof</span>
            </span>
        </NavBrand>
        {#if $isLoggedIn}
            <UserMenu /> 
        {:else}
            <UserLogin />
        {/if}
    </Navbar>

    <main class="flex-grow">
        {@render children?.()}
    </main>

    <Footer />
</div>

