<!-- <Modal bind:show={modal_show} /> -->
<script>
    import { fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let Question;
    export let show = false;
    let correct = 0;
    let Incorrect = 0;
    export let choosen_optn;
    export let reviewMode;
</script>

<style>
    nav {
        position: fixed;
        top: 6.3%;
        left: 0;
        height: 81.5%;
        padding: 2rem 1rem 0.6rem;
        border-left: 1px solid #aaa;
        background: #fff;
        overflow-y: auto;
        width: 14rem;
        border-radius: 5px;
        vertical-align: middle;
    }

    .inblock {
        display: inline-block;
    }
    .index_data {
        background-color: darkgrey;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        margin-bottom: 5px;
    }

    .snippet_data,
    .snippet_data_review_mode {
        width: 85%;
        margin-bottom: -6px;
        margin-left: 2px;
        cursor: pointer;
        height: 25px;
        overflow: hidden;
        border-radius: 5px;
        line-height: 25px;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
    }

    .snippet_data {
        background-color: darkgrey;
    }

    .snippet_data_review_mode:hover {
    font-size:x-large;
    }

    .snippet {
        width: 100%;
        margin: 0;
        padding: 0;
        border-radius: 3px;
        background: lightgray;
        color: black;
        text-align: center;
        height: 30px;
    }

    .Correct {
        /* background-color:  rgb(29, 158, 68); */
        color: rgb(29, 158, 68);
    }
    .InCorrect {
        /* background-color:  rgb(240, 96, 96); */
        color: rgb(240, 96, 96);
    }

    .Unattempted {
        /* background-color: orange; */
        color: orange;
    }

    .badge {
        font-size:medium;
        margin-left:1px;
        color: #fff;
        border-radius: 3px;
        padding: 2px;
    }

    .badgeCorrect {
        background-color:  rgb(29, 158, 68);
        
    }
    .badgeInCorrect {
        background-color:  rgb(240, 96, 96);
        margin-left: 3px;
        
    }
    .badgeUnattempted {
        background-color: orange;
        margin-left: 3px;
        
    }

    .badgeContainer {
        margin-top: 5px;
    }
    

</style>

{#if show}
    <nav transition:fade={{ x: 250, opacity: 1 }}>
        <!-- <button on:click={() => {modal_show = true; show = false;}}>About</button> -->
        <p class="snippet">Question Snippet</p>
        {#if reviewMode}
        <div class="badgeContainer">
        <span class="badge badgeCorrect">Correct</span><span class="badge badgeInCorrect">InCorrect</span><span class="badge badgeUnattempted">Unattempted</span>
        </div>
        {/if}
        <hr/>
       
        {#if !reviewMode}
            <div>
                {#each Question as que_data, i (que_data)}
                    <div style = "padding-top:10px">
                        <div class="inblock index_data">{i + 1}</div>
                        <div
                            class="inblock snippet_data"
                            on:click={dispatch('show_que', { id: i })}
                            on:click={() => {
                                show = false;
                            }}>
                            {que_data.snippet}
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            {#each Question as que_data, i (que_data)}
                <div style = "padding-top:10px">
                    <div class="inblock index_data">{i + 1}</div>
                    <div
                        class="{choosen_optn[i] == undefined ? 'Unattempted' : choosen_optn[i]['isCorrect'] ? (choosen_optn[i]['isCorrect'] == 'Unattempted' ? 'Unattempted' : 'Correct') : 'InCorrect'} inblock snippet_data_review_mode"
                        on:click={dispatch('show_que', { id: i })}
                        on:click={() => {
                            show = false;
                        }}>
                        {que_data.snippet}
                    </div>
                    <!-- <div class="inblock ans_label">
                <div
                    class={choosen_optn[i] == undefined ? 'Unattempted' : choosen_optn[i]['isCorrect'] ? (choosen_optn[i]['isCorrect'] == 'Unattempted' ? 'Unattempted' : 'Correct') : 'InCorrect'}>
                    {choosen_optn[i] == undefined ? 'Unattempted' : choosen_optn[i]['isCorrect'] ? (choosen_optn[i]['isCorrect'] == 'Unattempted' ? 'Unattempted' : 'Correct') : 'InCorrect'}
                </div>
            </div> -->
                </div>
            {/each}
        {/if}
    </nav>
{/if}
