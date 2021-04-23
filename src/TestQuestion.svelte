<script>
  import QuestionStorage from "./QuestionStorage.js";
  import Modal from "./Modal.svelte";
  import Sidebar from "./Sidebar.svelte";
  import ResultPage from "./ResultPage.svelte";
  let attempted = 0;
  let sidebar_show = false;
  let showModal = false;
  let Question;
  let choosen_optn = [];
  let check_ans = "";
  let resultStatus = false;
  let reviewMode = false;
  let displayBtn = "inline";
  QuestionStorage.subscribe((allitemsData) => {
    Question = allitemsData; // Get all Question details
  });
  import { tweened } from "svelte/motion";
  let original = 10 * 60; // TYPE NUMBER OF SECONDS HERE
  let timer = tweened(original);
  let watch = setInterval(() => {
    if ($timer > 0) $timer--;
    if ($timer == 0) {
      //location.reload();
      showModal = true;
    }
  }, 1000);

  function toolbar() {
    clearInterval(watch);
    displayBtn = "none";
  }
  $: minutes = Math.floor($timer / 60);
  $: seconds = Math.floor($timer - minutes * 60);

  let que_no = 0;
  // For next Question
  function next() {
    if (!reviewMode) {
      que_no += 1;
      check_ans = "";
      sidebar_show = false;
    } else {
      que_no += 1;
      sidebar_show = false;
    }
  }

  // For previous Question

  function pre() {
    if (!reviewMode) {
      que_no -= 1;
      sidebar_show = false;
      check_ans = "";
    } else {
      que_no -= 1;
      sidebar_show = false;
    }
  }

  function CheckAns(indx_no, option_id, option_data) {
    choosen_optn[indx_no] = {
      id: option_id,
      isCorrect: option_data == 1 ? true : false,
    };
    attempted = 0;
    for (
      let index_data = 0;
      index_data < choosen_optn.length;
      index_data += 1
    ) {
      if (typeof choosen_optn[index_data] == "undefined") {
        choosen_optn[index_data] = { id: "", isCorrect: "Unattempted" };
        // unattempted = choosen_optn.length - attemped ;
      } else {
        attempted += 1;
      }
    }
    console.log({ choosen_optn: choosen_optn });
  }

  // For ans cecking of a question on submit and from result page
  function submitAns(ans, state) {
    //console.log(check_ans);
    if (state && state != undefined) {
      check_ans = "";
      que_no = ans;
    }
    if (check_ans) {
      check_ans = "";
    } else {
      if (
        choosen_optn[ans] != undefined &&
        choosen_optn[ans]["isCorrect"] == true
      ) {
        check_ans = "Correct";
      } else {
        check_ans = "Incorrect";
      }
    }
  }
</script>

<main>
  <div style="top:0px">
    {#if !resultStatus}
      {#each Question as que, i (que)}
        <div on:click={() => (sidebar_show = false)}>
          {#if i == que_no}
            <!--To ftech all question -->
            {#if check_ans}
              <center>
                <div
                  class={choosen_optn[i] == undefined
                    ? "Unattempted"
                    : choosen_optn[i]["isCorrect"]
                    ? choosen_optn[i]["isCorrect"] == "Unattempted"
                      ? "Unattempted"
                      : "Correct"
                    : "InCorrect"}
                >
                  <!-- {check_ans} -->
                  {choosen_optn[i] == undefined
                    ? "Unattempted"
                    : choosen_optn[i]["isCorrect"]
                    ? choosen_optn[i]["isCorrect"] == "Unattempted"
                      ? "Unattempted"
                      : "Correct"
                    : "InCorrect"}
                </div>
                <!--Check ans at choosen option -->
              </center>
            {/if}
            <h4>{JSON.parse(que.content_text).question}</h4>
            <hr>
            <div class={check_ans ? "disabled" : "notdisabled"}>
              <!-- all option of question-->
              {#each JSON.parse(que.content_text).answers as ans_opt}
                <label
                  ><input
                    type="radio"
                    name="options"
                    checked={choosen_optn[que_no] &&
                    choosen_optn[que_no].id == ans_opt.id
                      ? true
                      : false}
                    on:click={CheckAns.bind(
                      this,
                      que_no,
                      ans_opt.id,
                      ans_opt.is_correct
                    )}
                    value={ans_opt.is_correct}
                  />
                  {@html ans_opt.answer}</label
                >
              {/each}
            </div>
            {#if check_ans}
              <hr />
              <center>
                <div>
                  {@html JSON.parse(que.content_text).explanation}
                </div>
              </center>
            {/if}
          {/if}
        </div>
      {/each}

      <footer>
        <div>
          <!-- <slot name="footer"> -->
          <button
            style="margin-right: 5px;pointer-events: none;display:{displayBtn}"
            >{minutes}:
            {seconds}</button
          >
          <button
            on:click={() => (sidebar_show = !sidebar_show)}
            style="margin-right: 5px;">List Item</button
          >
          <Sidebar
            bind:show={sidebar_show}
            {attempted}
            {choosen_optn}
            {Question}
            {reviewMode}
            on:show_que={(que_seq) => (
              (showModal = false),
              (resultStatus = false),
              (que_no = que_seq.detail.id)
            )}
          />
          <button
            style="margin-right: 5px; width:92px; display:{displayBtn}"
            on:click={submitAns.bind(this, que_no, false)}
            >{check_ans ? "Retry" : "Submit"}</button
          >
          <button on:click={pre} disabled={que_no == 0 ? true : false}
            >Previous</button
          >
          <button
            style="background:none; color:white;box-shadow:none; width:95px"
            >{que_no + 1}
            of
            {Question.length}</button
          >
          <button on:click={next} disabled={que_no == 10 ? true : false}
            >Next</button
          >
          <!-- </slot> -->
          <button
            class="showModal"
            style="display:{displayBtn}"
            on:click={() => (showModal = true)}>End Test</button
          >
          <button
            style="margin-right: 5px; width:92px; display:{reviewMode
              ? 'inline'
              : 'none'}"
            on:click={() => (resultStatus = true)}>Result</button
          >
        </div>
        {#if showModal}
          <Modal
            {choosen_optn}
            {Question}
            on:cancel={() => (showModal = false)}
            on:close={() => (
              (resultStatus = true), (reviewMode = true), toolbar()
            )}
          />
        {/if}
      </footer>
    {:else}
      <ResultPage
        {choosen_optn}
        {Question}
        {reviewMode}
        on:show_que={(que_seq) => (
          (showModal = false),
          (resultStatus = false),
          
          (que_seq.detail.id, true)
        )}
      />
    {/if}
  </div>
</main>

<style>
  footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    height: 3rem;
    background-color: #424958;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-shadow: 0 2px 6px rgb(0, 0, 0, 0.26);
    padding-right: 60px;
  }

  footer div {
    margin-right: 8px;
    margin-top: 8px;
  }
  .showModal {
    margin-left: 5px;
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

  .disabled {
    pointer-events: none;
  }
  .notdisabled {
    pointer-events: auto;
  }
</style>
