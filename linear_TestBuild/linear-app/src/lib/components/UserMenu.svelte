<script>
	import { Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownGroup, NavHamburger} from "flowbite-svelte";
	import { user, isLoggedIn, isModerator, isAdmin, clearUser } from '$lib/stores/user.js';
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import userPic from '$lib/assets/images/user.png';

    // Helper to ensure we leave the page immediately on logout
    async function handleLogout() {
        clearUser();
        await goto('/'); // Redirects to the landing page
    }
</script>

<div class="flex items-center md:order-2">
    <Avatar id="avatar-menu" src={userPic} class="cursor-pointer" />
    <NavHamburger />
</div>

<Dropdown placement="bottom" triggeredBy="#avatar-menu">
    <DropdownHeader>
          <span class="block text-sm font-bold">{$user.Username}</span>
          <span class="block truncate text-xs text-gray-500">{$user.Email}</span>
    </DropdownHeader>
    <DropdownGroup>
        <DropdownItem href="/reviewmanage">Manage Your Reviews</DropdownItem>
        
        {#if $isModerator}
            <DropdownItem href="/moderator">Moderator Panel</DropdownItem>
        {/if}
        
        {#if $isAdmin}
            <DropdownItem href="/admin">Admin Panel</DropdownItem>
        {/if}

        <DropdownItem>
            Please work </DropdownItem>

        <hr class="my-1 border-gray-200" />

        <form 
            method="POST" 
            action="/auth?/logout" 
            use:enhance={() => {
                return async ({ result }) => {
                    await handleLogout();
                };
            }}
        >
            <button type="submit" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                Sign-out
            </button>
        </form>
    </DropdownGroup>
</Dropdown>