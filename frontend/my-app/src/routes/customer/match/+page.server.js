import { redirect } from '@sveltejs/kit';

export async function load({ url, locals }) {
	const vendorType = url.searchParams.get('vendor')?.trim().toLowerCase();
	const area = url.searchParams.get('area')?.trim().toLowerCase();
    console.log('Query Params:', { vendorType, area });
	const user = locals.user;
	const supabase = locals.supabase;

	if (!user) {
		throw redirect(302, '/customer'); 
	}

	const { data: vendors, error: vendorError } = await supabase
		.from('vendors')
		.select('*')
		.ilike('vendor_type', vendorType)
		.ilike('locality', area);

	console.log('Vendors Data:', vendors);
    console.log('Vendor Error:', vendorError);
    if(vendorError){
        console.error('Error fetching vendors:', vendorError);

    }
    return {vendors}
}
