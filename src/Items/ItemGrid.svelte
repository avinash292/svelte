<script>
    import Item from './Item.svelte';
    
    export let items;
</script>

<style>
    section {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }

    @media (min-width: 768px) {
        section{
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>

<section id="items" class="items">
    {#each items as item}
    <Item 
    id={item.id};
    title={item.title} 
    subtitle={item.subtitle} 
    description={item.description} 
    imageUrl={item.imageUrl} 
    email={item.contectEmail} 
    address={item.address}
    isFav={item.isFavourit}
    on:togglefavourit/>
{/each}
</section>