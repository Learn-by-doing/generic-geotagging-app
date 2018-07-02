const config = {
	addItemModal: {
		title: "Add New Item",
		attributes: [
			{
				type: "text",
				label: "Description",
				name: "description"
			},
			{
				type: "dropdown",
				label: "Category",
				name: "category",
				options: [
					{
						value: 'orange',
						label: 'Orange'
					},
					{
						value: 'apple',
						label: 'Apple'
					}
				]
			}
		]
	}
}

export default config; 