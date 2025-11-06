<script lang="ts">
    import { ButtonGroup, Button, GradientButton } from "flowbite-svelte";
</script>
<!--NOTE TO BACKEND, THIS IS ONLY USED TO DISPLAY THE LOGIN BUTTON, GO TO LoginForm/SignUpForm FOR THE ACTUAL CODE-->
<ButtonGroup class="*:ring-primary-700!">
    <Button href="/auth">Login / Sign-up</Button>
</ButtonGroup>