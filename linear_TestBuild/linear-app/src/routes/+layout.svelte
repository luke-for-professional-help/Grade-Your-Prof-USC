<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	let { children } = $props();
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownGroup } from "flowbite-svelte";

	import UserMenu from '$lib/components/UserMenu.svelte';
	import UserLogin from '$lib/components/UserLogin.svelte';
	import { isLoggedIn, isMember } from '$lib/stores/user.js';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
	
  
  <!--NAVBAR PERSISTENT UI FOR THE ENTIRE WEBSITE-->
<Navbar>
	<NavBrand href="/">
	  <img src="$lib/assets/images/logo.jpg" class="me-3 h-6 sm:h-9" alt="gyp" />
	  <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Grade Your Prof</span>
	</NavBrand>
	<!--CONDITIONAL FOR HANDLING USER LOG IN STATE-->
	{#if $isLoggedIn}

		<UserMenu /> <!--FOR BACKEND, PLEASE CHECK /src/lib/components for these component files-->
	{:else}
		<UserLogin />
	{/if}
</Navbar>


{@render children()}
