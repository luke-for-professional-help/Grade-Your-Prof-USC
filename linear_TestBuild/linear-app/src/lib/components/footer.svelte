<script lang="ts">
    import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from "flowbite-svelte";
</script>
  
<Footer class="bg-white text-white p-4">
    <div class="max-w-5xl mx-auto flex justify-between items-center w-full">
        <FooterCopyright href="/" by="GradeYourProf™" year={2025} />
        <FooterLinkGroup class="flex flex-wrap items-center text-sm text-gray-400">
            <FooterLink href="/">Contact</FooterLink>
        </FooterLinkGroup>
    </div>
</Footer>