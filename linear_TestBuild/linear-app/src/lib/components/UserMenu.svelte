<script>
	import { Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownGroup, NavHamburger} from "flowbite-svelte";
	import { user, isLoggedIn, isModerator, isAdmin } from '$lib/stores/user.js';
    import userPic from '$lib/assets/images/user.png';
</script>

<!--USER PROFILE SETTINGS-->

<div class="flex items-center md:order-2">
    <Avatar id="avatar-menu" src={userPic} />
    <NavHamburger />
</div>

<!--USER DROPDOWN MENU-->
<Dropdown placement="bottom" triggeredBy="#avatar-menu">
    <DropdownHeader>
      <!--IMPORTANT: INITIALIZE TO CHANGE USER NAME ONCE LOGGED IN-->
          <span class="block text-sm">{$user.name}</span>
          <span class="block truncate text-sm font-medium">{$user.email}</span>
        </DropdownHeader>
        <DropdownGroup>
            <DropdownItem>
                <a href="/reviewmanage">Manage Your Reviews</a>
            </DropdownItem>
            {#if $isModerator}
                <DropdownItem>
                    <a href="/moderator">Moderator Panel</a>
                </DropdownItem>
            {/if}
            {#if $isAdmin}
                <DropdownItem>
                    <a href="/admin">Admin Panel</a>
                </DropdownItem>
            {/if}
            <DropdownItem on:click={() => isLoggedIn.set(false)}>
                Sign Out
            </DropdownItem>
        </DropdownGroup>
</Dropdown>
