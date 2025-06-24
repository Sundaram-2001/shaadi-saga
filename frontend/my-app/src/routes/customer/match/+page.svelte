<script>
    import {supabase} from '$lib/supabaseClient';
    import { mount, onMount } from 'svelte';
    import { goto } from '$app/navigation';
    	let vendorType = '';
	    let area = '';
	    /**
     * @type {string | any[]}
     */
	    let matchingVendors = [];
onMount(async()=>{
    const urlParams=new URLSearchParams(window.location.search);
    vendorType = urlParams.get('vendor')?.trim() ?? '';
	area = urlParams.get('area')?.trim() ?? '';
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    if (!access_token || !refresh_token) {
        alert("Kindly Login to continue!");
        goto('/customer');
        return;
    }
    const { data, error: sessionError } = await supabase.auth.setSession({
        access_token: access_token,
        refresh_token: refresh_token
    });
    if(sessionError || !data.session){
        alert("Setup failed , kindly login to continue!")
        console.error(sessionError);
        goto('/customer');
        return;
    }
    const userId = data.session.user.id;
    console.log("Checking db for  vendors", vendorType, area);
    const { data: vendors, error: vendorErrors } = await supabase
        .from('vendors')
        .select('*')
        .ilike('vendor_type', vendorType)
        .ilike('locality', area)
        // console.log("Checking db for  vendors", vendorType, area);
    if(vendorErrors){
        alert("Error fetchin vendors at the moment, please try again later!");
        console.error(vendorErrors);
        return;
    }
    matchingVendors = vendors;
})
</script>
<main>
   <h3>Matching Vendors</h3>
   {#if matchingVendors.length > 0}
   <ul>
        {#each matchingVendors as vendor}
            <li>{vendor.name}-{vendor.email}</li>
        {/each}
   </ul>
   {:else}
        <p>No matching vendors found!</p>
    {/if}
</main>