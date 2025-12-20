<script lang="ts">
    import { AccordionItem, Accordion } from "flowbite-svelte";
</script>
  
<Accordion><p class="font-noto-sans">
    <AccordionItem>
      {#snippet header()}How do I get started?{/snippet}
      <p class="mb-2 text-gray-500 dark:text-gray-400">
        Simple, you can start as a guest just by searching the professor's name or a subject that you want to view.
      </p>
      <ul class="list-disc text-gray-500 dark:text-gray-400 pl-7">
        <li>Searching by prof allows you to see the reviews made by fellow students regarding the professor's teaching style, performance, grading system, etc.</li>
        <li>Searching by subject code allows you to see the professors that are teaching that subject.</li>
      </ul>
    </AccordionItem>

    <AccordionItem>
        {#snippet header()}I cant find the professor's name/subject code that I want to see. What can I do?{/snippet}
        <p class="mb-2 text-gray-500 dark:text-gray-400">If the professor or subject code you want to see isn't available, then that means the professor/subject hasn't been added yet. Please sign up in order to request certain professors and/or subjects to be added.</p>
    
    </AccordionItem>

    <AccordionItem>
      {#snippet header()}Where can I find the rules?{/snippet}
      <p class="mb-2 text-gray-500 dark:text-gray-400">Rules can be found <a href="/rules" class="text-blue-500 underline">here</a>. Make sure to read them so that your requests and reviews can be approved. </p>
    </AccordionItem>

    <AccordionItem>
      {#snippet header()}How do I add my own reviews/professors/subject code?{/snippet}
      <p class="mb-2 text-gray-500 dark:text-gray-400">Make sure you're signed up first. Then you can proceed to request to add a professor or subject, we will only require a screenshot or copy of your study load in order to verify you are under that professor or currently taking that subject for the term.
      </p>
    </AccordionItem>
    
    <AccordionItem>
        {#snippet header()}Why are my reviews aren't posted yet?{/snippet}
        <p class="mb-2 text-gray-500 dark:text-gray-400">Please be patient. Each review is individually moderated by staff to make sure it follows the rules.</p>
    
    </AccordionItem>
    </p>
</Accordion>