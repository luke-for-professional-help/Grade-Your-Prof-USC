<script lang="ts">
    import { Card, Hr, Badge, Button } from "flowbite-svelte";
    import SafeRating from "$lib/components/SafeRating.svelte";
    let { data } = $props();

    // Derived values for safety and reactivity
    const professorBase = $derived(data.teacherRows?.[0]);
    const subjects = $derived(data.teacherRows || []);
    const reviews = $derived(data.reviews || []);
    const stats = $derived(data.stats || { avgRating: 0, totalReviews: 0 });
</script>

<div class="flex justify-center items-start mt-10 pb-20">
    <div class="w-full max-w-5xl px-4">
        
        {#if professorBase}
            <Card size="xl" class="shadow-sm border-t-4 border-orange-500 p-6">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div class="flex items-center gap-5">
                        {#if professorBase.Professor_img}
                            <img src={professorBase.Professor_img} alt={professorBase.Professor_Name} class="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-sm" />
                        {:else}
                             <div class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 border-4 border-gray-100">No Img</div>
                        {/if}
                        <div>
                            <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">
                                {professorBase.Professor_Name}
                            </h1>
                            <p class="text-lg text-gray-600 font-medium">University of San Carlos Faculty</p>
                        </div>
                    </div>
                    
                    <div class="bg-orange-50 border border-orange-100 p-4 rounded-2xl text-center min-w-[140px] shadow-sm">
                        <span class="block text-4xl font-black text-orange-600">
                            {stats.avgRating ? Number(stats.avgRating).toFixed(1) : '0.0'}
                        </span>
                        <div class="flex justify-center my-1">
                            <SafeRating total={5} rating={stats.avgRating} size={20} />
                        </div>
                        <span class="text-[10px] text-orange-400 font-bold uppercase tracking-widest">Global Rating</span>
                    </div>
                </div>
                
                <Hr class="my-8" />
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <span class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Courses Taught</span>
                        <div class="flex flex-wrap gap-2">
                            {#each subjects as s}
                                <Badge color="indigo" rounded border class="px-3 py-1 font-semibold">
                                    {s.Subject_Code}
                                </Badge>
                            {:else}
                                <p class="text-gray-500 text-sm italic">No subjects assigned.</p>
                            {/each}
                        </div>
                    </div>

                    <div class="flex flex-col justify-end items-start md:items-end">
                        <p class="text-xs text-gray-500 mb-3 italic">Taken a class with this professor?</p>
                        <Button color="orange" href="/createpage?prof_ID={data.profID}" class="shadow-md hover:shadow-lg transition-all font-bold">
                            Write a Review
                        </Button>
                    </div>
                </div>
            </Card>

            <div class="mt-12">
                <h2 class="text-2xl font-bold text-gray-800 mb-8 px-1">
                    Student Reviews <span class="text-gray-400 ml-1">({reviews.length})</span>
                </h2>

                <div class="space-y-6">
                    {#each reviews as review (review.Review_ID)}
                        <Card size="lg" class="max-w-full shadow-sm">
                            <div class="flex justify-between items-start mb-4">
                                <div class="flex items-center gap-3 p-3">
                                    <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                                        U
                                    </div>
                                    <div>
                                        <h4 class="text-sm font-bold text-gray-900">Verified Student</h4>
                                        <p class="text-xs text-gray-500 uppercase font-semibold">{review.Subject_Code || 'General'}</p>
                                    </div>
                                </div>
                                <div class="text-right p-3">
                                    <SafeRating total={5} rating={review.Rating} size={16} />
                                    <p class="text-[10px] text-gray-400 font-medium mt-1">
                                        {new Date(review.Date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <p class="text-gray-700 leading-relaxed italic text-sm bg-gray-50 p-4 rounded-lg border-l-4 border-orange-200">
                                "{review.Description}"
                            </p>
                        </Card>
                    {:else}
                        <div class="text-center p-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
                            <p class="text-gray-400 font-medium">No verified reviews yet. Be the first!</p>
                        </div>
                    {/each}
                </div>
            </div>
        {:else}
            <div class="text-center mt-20 p-10 bg-red-50 rounded-2xl">
                <h2 class="text-2xl font-bold text-red-600">Professor Not Found</h2>
                <Button color="light" href="/search" class="mt-6">Return to Search</Button>
            </div>
        {/if}
    </div>
</div>