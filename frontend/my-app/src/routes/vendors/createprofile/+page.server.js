import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const {user,supabase} = locals;

		// if (userError || !user) {
		// 	return fail(401, { error: 'Unauthorized' });
		// }

		const owner_name = formData.get('owner_name');
		const business_name = formData.get('business_name');
		const locality = formData.get('locality');
		const email = formData.get('email');
		const phone = formData.get('phone');
		const vendor_type = formData.get('vendor_type');

		console.log('Form Data Received:', {
			owner_name,
			business_name,
			locality,
			email,
			phone,
			vendor_type
		});

		const { data: vendor, error } = await supabase
			.from('vendors')
			.insert({
				user_id: user.id,
				owner_name,
				business_name,
				locality,
				email,
				phone_number: phone,
				vendor_type
			})
			.select()
			.single();

		if (error) {
			console.error('Error inserting the data:', error);
			return fail(500, {
				error: 'Error inserting the data',
				details: error.message
			});
		}

		console.log('Vendor created successfully:', vendor);

		return {
			success: true,
			message: 'Vendor created successfully!',
			vendor
		};
	}
};
