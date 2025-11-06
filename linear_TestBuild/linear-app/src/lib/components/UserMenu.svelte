<script>
	import { Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownGroup, NavHamburger} from "flowbite-svelte";
	import { user, isLoggedIn } from '$lib/stores/user.js';
</script>

<!--USER PROFILE SETTINGS-->

<div class="flex items-center md:order-2">
    <Avatar id="avatar-menu" src="$lib/assets/images/user.jpg" />
    <NavHamburger />
</div>

<!--USER DROPDOWN MENU-->
<Dropdown placement="bottom" triggeredBy="#avatar-menu">
    <DropdownHeader>
      <!--IMPORTANT: INITIALIZE TO CHANGE USER NAME ONCE LOGGED IN-->
          <span class="block text-sm">PLACEHOLDER</span>
          <span class="block truncate text-sm font-medium">name@placeholder.com</span>
        </DropdownHeader>
        <DropdownGroup>
            <DropdownItem>
                <a href="/reviewmanage">Manage Reviews</a>
            </DropdownItem>
            <DropdownItem on:click={() => isLoggedIn.set(false)}>
                Sign Out
            </DropdownItem>
        </DropdownGroup>
</Dropdown>
