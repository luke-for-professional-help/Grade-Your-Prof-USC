<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import usc from '$lib/assets/images/usc.svg';
	let { children } = $props();
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownGroup } from "flowbite-svelte";
	import Footer from "$lib/components/footer.svelte";
	import UserMenu from '$lib/components/UserMenu.svelte';
	import UserLogin from '$lib/components/UserLogin.svelte';
	import { isLoggedIn, isMember } from '$lib/stores/user.js';
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
<Navbar>
	<NavBrand href="/">
	  <img src={usc} class="me-3 h-6 shadow-none sm:h-9 logo-img" alt="gyp" />
	  <span class="self-center text-xl font-semibold whitespace-nowrap text-black logo-text">Grade Your <span class="prof-glow">Prof</span></span>
	</NavBrand>
	<!--CONDITIONAL FOR HANDLING USER LOG IN STATE-->
	{#if $isLoggedIn}
		<UserMenu /> <!--FOR BACKEND, PLEASE CHECK /src/lib/components for these component files-->
	{:else}
		<UserLogin />
	{/if}
</Navbar>

<Footer></Footer>
{@render children()}
