<script>
    export let agreed = false;
    let attempted = 0;
    export let Question;
    export let choosen_optn;
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    for (let i = 0; i < choosen_optn.length; i++) {
        if (choosen_optn[i]["isCorrect"] == true) {
            attempted++;
        } else if (choosen_optn[i]["isCorrect"] == false) {
            attempted++;
        }
    }
</script>

<style>
    .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.75);
        z-index: 10;
    }

    .modal {
        padding: 1rem;
        position: fixed;
        top: 30vh;
        left: 30%;
        width: 40%;
        max-height: 50vh;
        background: white;
        border-radius: 5px;
        z-index: 100;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        overflow: auto;
    }
    header {
        border-bottom: 3px solid #ccc;
    }
</style>

<div class="backdrop" on:click={() => dispatch('cancel')} />
<div class="modal">
    <header>
        <h3 style="color:gray;">Confirm !</h3>
    </header>
    <div class="disclaimer">
        <p>Are You Want to Ent Test</p>
        <div>Attemped: {attempted}</div>
        <div>Unattempted: {Question.length - attempted} </div>
    </div>
    <footer>
        <slot name="footer">
            <div style="float:right">
                <button
                    on:click={() => (agreed = true)}
                    style="margin-right:10px">Agree</button>
                <!-- <button on:click={() => dispatch('close')} disabled = {!agreed} >End Test</button> -->
                <button
                    on:click={() => dispatch('cancel')}
                    style="margin-right:10px;">Cancel</button>
                <button
                    on:click={() => dispatch('close')}
                    disabled={!agreed}
                    style="margin-right:10px">End Test</button>
            </div>
        </slot>
    </footer>
</div>
