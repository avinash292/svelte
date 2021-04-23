<script>
    export let type="";
    export let caption="";
    export let href="";
    //export let mode;
</script>

<style>
    /* button,
    a {
        font: inherit;
        border: none;
        padding: 0.5rem 1rem;
        color:  #cf0066;
        border-radius: 5px;
        box-shadow: 1px 1px 3px rgba(0,0,0,0.26);
        cursor: pointer;
        text-decoration: none;
        background-color: #93ee87;
    }

    button:focus {
        outline: none;
    }


    button:hover,
    button:active,
    a:hover,
    a:active {
        background: #93ee87;
        border-color :#93ee87;
        color:rgb(6, 51, 6);
    }

    button:disabled,
    button:disabled:hover,
    button:disabled:active {
        background: #ccc;
        border-color: #ccc;
        color: #959595;
        box-shadow: none;
        cursor: not-allowed;
    } */
</style>
{#if href}
    <a {href}>{caption}</a>
{:else}
<button {type} on:click>{caption}</button>
{/if}