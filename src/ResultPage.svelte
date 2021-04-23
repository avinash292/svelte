<script>
    let correct = 0;
    let Incorrect = 0;
    export let choosen_optn;
    export let Question;
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    //Count the total correct and tatal incurrect answers
    for (let i = 0; i < choosen_optn.length; i++) {
        if (choosen_optn[i]["isCorrect"] == true) {
            correct++;
        } else if (choosen_optn[i]["isCorrect"] == false) {
            Incorrect++;
        }
    }
</script>

<style>
    .inblock {
        display: inline-block;
    }
    .index_data {
        background-color: darkgrey;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin-bottom: 5px;
    }

    .Unattempted,
    .Correct,
    .InCorrect {
        height: 30px;
        line-height: 30px;
        width: 150px;
        text-align: center;
        margin-left: 5px;
        border-radius: 3px;
        color: #fff;
    }

    .Correct {
        /* background-color: green; */
        background-color: rgb(29, 158, 68);
    }
    .InCorrect {
        background-color: rgb(240, 96, 96);
    }

    .Unattempted {
        background-color: orange;
    }

    .snippet_data {
        width: 1000px;
        cursor: pointer;
    }
    .snippet_data:hover {
        color: rgb(241, 46, 72);
        /* background-color: lightgrey; */
        /* border-radius: 3px; */
        font-size:medium;
    }

    .result_section {
        top: 0;
    }
</style>

<div class="result_section">
    <h1>Result</h1>
    <button
        style="background:lightgray; color:black;box-shadow:none; margine-left: 5px; pointer-events: none;">All
        :{Question.length}</button>
    <button
        style="background:lightgray; color:black;box-shadow:none; margine-left: 5px; pointer-events: none;">Unattempted
        :
        {Question.length - (correct + Incorrect)}</button>
    <button
        style="background:lightgray; color:black;box-shadow:none; margine-left: 5px; pointer-events: none;">correct
        :{correct}</button>
    <button
        style="background:lightgray; color:black;box-shadow:none; margine-left: 5px; pointer-events: none;">Incorrect
        :{Incorrect}</button>
    <hr />
    <hr />
    <div>
        {#each Question as que_data, i (que_data)}
            <div>
                <div class="inblock index_data">{i + 1}</div>
                <div
                    class="inblock snippet_data"
                    on:click={dispatch('show_que', { id: i })}>
                    {que_data.snippet}
                </div>
                <div class="inblock ans_label">
                    <div
                        class={choosen_optn[i] == undefined ? 'Unattempted' : choosen_optn[i]['isCorrect'] ? (choosen_optn[i]['isCorrect'] == 'Unattempted' ? 'Unattempted' : 'Correct') : 'InCorrect'}>
                        {choosen_optn[i] == undefined ? 'Unattempted' : choosen_optn[i]['isCorrect'] ? (choosen_optn[i]['isCorrect'] == 'Unattempted' ? 'Unattempted' : 'Correct') : 'InCorrect'}
                    </div>
                </div>
            </div>
        {/each}
        <footer style="margin-bottom:15px;">
            <button style="float:right;" on:click={() => location.reload()}>Go
                Back</button>
        </footer>
    </div>
</div>
